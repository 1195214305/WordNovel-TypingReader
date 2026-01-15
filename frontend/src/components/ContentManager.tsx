import React, { useState } from 'react'
import { useAppStore } from '@/store'
import { X, FileText, Trash2, Upload, Plus } from 'lucide-react'

interface ContentManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ContentManager: React.FC<ContentManagerProps> = ({ open, onOpenChange }) => {
  const { novels, settings, addNovel, deleteNovel, selectNovel, updateSettings } = useAppStore()
  const [newNovel, setNewNovel] = useState({ title: '', content: '' })

  const handleSaveNew = () => {
    if (newNovel.title.trim() && newNovel.content.trim()) {
      addNovel(newNovel)
      setNewNovel({ title: '', content: '' })
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setNewNovel({
          title: file.name.replace('.txt', ''),
          content: content,
        })
      }
      reader.readAsText(file, 'UTF-8')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">内容管理</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 设置区域 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">应用设置</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">文档名称</label>
                <input
                  type="text"
                  value={settings.documentName}
                  onChange={(e) => updateSettings({ documentName: e.target.value })}
                  placeholder="novel.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input
                  type="text"
                  value={settings.userName}
                  onChange={(e) => updateSettings({ userName: e.target.value })}
                  placeholder="读者"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                打字速度 (毫秒)
              </label>
              <input
                type="number"
                value={settings.typingSpeed}
                onChange={(e) => updateSettings({ typingSpeed: parseInt(e.target.value) || 50 })}
                min="10"
                max="500"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                千问 API Key (可选)
              </label>
              <input
                type="password"
                value={settings.qianwenApiKey || ''}
                onChange={(e) => updateSettings({ qianwenApiKey: e.target.value })}
                placeholder="sk-xxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                配置后可使用AI生成功能,获取地址: https://dashscope.console.aliyun.com/
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* 小说列表 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">小说列表</h3>
            <div className="grid gap-2 max-h-60 overflow-auto">
              {novels.map((novel) => (
                <div
                  key={novel.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                    settings.currentNovelId === novel.id
                      ? 'bg-primary-50 border-primary-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectNovel(novel.id)}
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <FileText className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span className="font-medium truncate">{novel.title}</span>
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      ({novel.content.length} 字)
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNovel(novel.id)
                    }}
                    className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {novels.length === 0 && (
                <div className="text-center py-8 text-gray-400">暂无小说,请添加或导入</div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* 添加新小说 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">添加新小说</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-secondary-100 hover:bg-secondary-200 text-secondary-900 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>导入TXT</span>
                </button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="小说标题"
                value={newNovel.title}
                onChange={(e) => setNewNovel({ ...newNovel, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <textarea
                placeholder="小说内容"
                value={newNovel.content}
                onChange={(e) => setNewNovel({ ...newNovel, content: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <button
                onClick={handleSaveNew}
                disabled={!newNovel.title.trim() || !newNovel.content.trim()}
                className="w-full flex items-center justify-center space-x-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>保存小说</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentManager
