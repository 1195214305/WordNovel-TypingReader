import React, { useState } from 'react'
import { useAppStore } from '@/store'
import { X, Sparkles, Loader2 } from 'lucide-react'

interface AIGeneratorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const genres = [
  { value: 'fantasy', label: '奇幻冒险' },
  { value: 'mystery', label: '悬疑推理' },
  { value: 'romance', label: '浪漫爱情' },
  { value: 'scifi', label: '科幻未来' },
  { value: 'wuxia', label: '武侠江湖' },
  { value: 'horror', label: '惊悚恐怖' },
]

const lengths = [
  { value: 'short', label: '短篇 (1000字)' },
  { value: 'medium', label: '中篇 (3000字)' },
  { value: 'long', label: '长篇 (5000字)' },
]

const AIGenerator: React.FC<AIGeneratorProps> = ({ open, onOpenChange }) => {
  const { settings, addNovel } = useAppStore()
  const [genre, setGenre] = useState('fantasy')
  const [theme, setTheme] = useState('')
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!theme.trim()) {
      setError('请输入故事主题')
      return
    }

    if (!settings.qianwenApiKey) {
      setError('请先在设置中配置千问 API Key')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate-novel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genre,
          theme,
          length,
          apiKey: settings.qianwenApiKey,
        }),
      })

      if (!response.ok) {
        throw new Error('生成失败')
      }

      const data = await response.json()

      addNovel({
        title: data.title,
        content: data.content,
      })

      setTheme('')
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败,请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI 生成小说</h2>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择类型</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {genres.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGenre(g.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    genre === g.value
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">故事主题</label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例如: 一个程序员穿越到古代成为状元"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">篇幅长度</label>
            <div className="grid grid-cols-3 gap-2">
              {lengths.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLength(l.value as 'short' | 'medium' | 'long')}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    length === l.value
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!settings.qianwenApiKey && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
              提示: 请先在"管理"中配置千问 API Key 才能使用 AI 生成功能
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !settings.qianwenApiKey}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>生成中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>开始生成</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIGenerator
