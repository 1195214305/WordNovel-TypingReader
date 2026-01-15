interface Env {
  KV_NAMESPACE: KVNamespace
}

interface NovelRequest {
  genre: string
  theme: string
  length: 'short' | 'medium' | 'long'
  apiKey: string
}

const lengthMap = {
  short: 1000,
  medium: 3000,
  long: 5000,
}

const genrePrompts = {
  fantasy: '奇幻冒险',
  mystery: '悬疑推理',
  romance: '浪漫爱情',
  scifi: '科幻未来',
  wuxia: '武侠江湖',
  horror: '惊悚恐怖',
}

export async function onRequest(context: {
  request: Request
  env: Env
}): Promise<Response> {
  const { request, env } = context

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: '仅支持 POST 请求' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = (await request.json()) as NovelRequest
    const { genre, theme, length, apiKey } = body

    if (!genre || !theme || !length || !apiKey) {
      return new Response(JSON.stringify({ error: '参数不完整' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 生成缓存键
    const cacheKey = `novel:${genre}:${theme}:${length}`

    // 尝试从边缘缓存读取
    const cache = caches.default
    const cacheRequest = new Request(`https://cache/${cacheKey}`)
    let cached = await cache.match(cacheRequest)

    if (cached) {
      const cachedData = await cached.json()
      return new Response(JSON.stringify(cachedData), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-Cache': 'HIT',
        },
      })
    }

    // 尝试从 KV 读取
    const kvData = await env.KV_NAMESPACE.get(cacheKey, 'json')
    if (kvData) {
      // 写入边缘缓存
      const response = new Response(JSON.stringify(kvData), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
      })
      await cache.put(cacheRequest, response.clone())

      return new Response(JSON.stringify(kvData), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-Cache': 'KV-HIT',
        },
      })
    }

    // 调用千问 API 生成小说
    const wordCount = lengthMap[length]
    const genreText = genrePrompts[genre as keyof typeof genrePrompts] || '小说'

    const prompt = `请创作一篇${genreText}类型的小说,主题是"${theme}",字数约${wordCount}字。
要求:
1. 情节完整,有开头、发展、高潮和结尾
2. 人物形象鲜明,对话生动
3. 语言流畅,富有文学性
4. 适合打字阅读的节奏

请直接输出小说内容,不要有任何前缀说明。`

    const aiResponse = await fetch(
      'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: wordCount * 2,
        }),
      }
    )

    if (!aiResponse.ok) {
      throw new Error('AI 生成失败')
    }

    const aiData = await aiResponse.json()
    const content = aiData.choices[0].message.content

    // 生成标题
    const titlePrompt = `请为以下小说内容生成一个简短精炼的标题(不超过15个字):

${content.substring(0, 200)}...

只输出标题,不要有任何其他内容。`

    const titleResponse = await fetch(
      'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          messages: [
            {
              role: 'user',
              content: titlePrompt,
            },
          ],
          max_tokens: 50,
        }),
      }
    )

    let title = `${genreText}故事`
    if (titleResponse.ok) {
      const titleData = await titleResponse.json()
      title = titleData.choices[0].message.content.trim().replace(/["""]/g, '')
    }

    const result = {
      title,
      content,
      genre,
      theme,
      length,
      createdAt: new Date().toISOString(),
    }

    // 存储到 KV
    await env.KV_NAMESPACE.put(cacheKey, JSON.stringify(result), {
      expirationTtl: 86400, // 24小时过期
    })

    // 写入边缘缓存
    const response = new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600',
      },
    })
    await cache.put(cacheRequest, response.clone())

    return new Response(JSON.stringify(result), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'X-Cache': 'MISS',
      },
    })
  } catch (error) {
    console.error('生成小说失败:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : '生成失败',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
}

export default { onRequest }
