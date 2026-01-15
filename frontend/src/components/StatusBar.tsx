import React from 'react'
import { Minus, Plus } from 'lucide-react'

interface StatusBarProps {
  wordCount: number
  currentPage: number
  totalPages: number
}

const StatusBar: React.FC<StatusBarProps> = ({ wordCount, currentPage, totalPages }) => {
  const [zoom, setZoom] = React.useState(100)

  return (
    <div className="bg-[#f3f3f3] border-t border-gray-300 h-6 flex items-center justify-between px-2 text-xs text-gray-600 select-none">
      {/* 左侧信息 */}
      <div className="flex items-center space-x-4">
        <span>第 {currentPage} 页，共 {totalPages} 页</span>
        <span className="text-gray-400">|</span>
        <span>{wordCount.toLocaleString()} 字</span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-500">简体中文</span>
      </div>

      {/* 右侧视图控制 */}
      <div className="flex items-center space-x-2">
        {/* 视图模式按钮 */}
        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <button className="p-1 hover:bg-gray-200 rounded" title="阅读模式">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded bg-gray-200" title="页面视图">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded" title="Web版式">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
            </svg>
          </button>
        </div>

        {/* 缩放控制 */}
        <div className="flex items-center space-x-1">
          <button
            className="p-0.5 hover:bg-gray-200 rounded"
            onClick={() => setZoom(Math.max(10, zoom - 10))}
            title="缩小"
          >
            <Minus className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {/* 缩放滑块 */}
          <div className="w-24 h-1 bg-gray-300 rounded relative mx-1">
            <input
              type="range"
              min="10"
              max="200"
              value={zoom}
              onChange={(e) => setZoom(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 rounded-full"
              style={{ left: `${((zoom - 10) / 190) * 100}%` }}
            />
          </div>

          <button
            className="p-0.5 hover:bg-gray-200 rounded"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
            title="放大"
          >
            <Plus className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <span className="w-10 text-right">{zoom}%</span>
        </div>
      </div>
    </div>
  )
}

export default StatusBar
