import React from 'react'
import { Save, Sparkles, Settings } from 'lucide-react'

interface ToolbarProps {
  onSaveClick: () => void
  onAIClick: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({ onSaveClick, onAIClick }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center space-x-2 max-w-7xl mx-auto">
        <button
          onClick={onSaveClick}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title="内容管理"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">管理</span>
        </button>
        <button
          onClick={onAIClick}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 rounded transition-colors"
          title="AI生成小说"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">AI生成</span>
        </button>
        <div className="flex-1" />
        <button
          onClick={onSaveClick}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title="设置"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">设置</span>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
