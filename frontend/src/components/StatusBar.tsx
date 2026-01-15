import React from 'react'
import { Minus, Plus, MessageSquare } from 'lucide-react'

interface StatusBarProps {
  wordCount: number
  currentPage: number
  totalPages: number
}

const StatusBar: React.FC<StatusBarProps> = ({ wordCount, currentPage, totalPages }) => {
  const [zoom, setZoom] = React.useState(100)

  return (
    <div className="bg-[#f3f3f3] border-t border-[#d1d1d1] h-[22px] flex items-center justify-between px-1 text-[11px] text-[#444] select-none">
      {/* 左侧信息 */}
      <div className="flex items-center h-full">
        <button className="h-full px-2 hover:bg-[#e5e5e5] flex items-center">
          第 {currentPage} 页，共 {totalPages} 页
        </button>
        <div className="w-px h-3 bg-[#c7c7c7] mx-1" />
        <button className="h-full px-2 hover:bg-[#e5e5e5] flex items-center">
          {wordCount.toLocaleString()} 字
        </button>
        <div className="w-px h-3 bg-[#c7c7c7] mx-1" />
        <button className="h-full px-2 hover:bg-[#e5e5e5] flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
          简体中文
        </button>
      </div>

      {/* 右侧视图控制 */}
      <div className="flex items-center h-full">
        {/* 批注按钮 */}
        <button className="h-full px-2 hover:bg-[#e5e5e5] flex items-center" title="批注">
          <MessageSquare className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-3 bg-[#c7c7c7] mx-1" />

        {/* 视图模式按钮 */}
        <div className="flex items-center h-full">
          <button className="h-full px-1.5 hover:bg-[#e5e5e5] flex items-center" title="阅读视图">
            <svg className="w-4 h-4 text-[#666]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
            </svg>
          </button>
          <button className="h-full px-1.5 hover:bg-[#e5e5e5] bg-[#e5e5e5] flex items-center" title="页面视图">
            <svg className="w-4 h-4 text-[#444]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
            </svg>
          </button>
          <button className="h-full px-1.5 hover:bg-[#e5e5e5] flex items-center" title="Web版式视图">
            <svg className="w-4 h-4 text-[#666]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M7.5 12a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1zM3 12a.5.5 0 0 1-.5-.5v-4A.5.5 0 0 1 3 7h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H3zm8 0a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1z"/>
            </svg>
          </button>
        </div>

        <div className="w-px h-3 bg-[#c7c7c7] mx-2" />

        {/* 缩放控制 */}
        <div className="flex items-center h-full">
          <button
            className="h-full px-1 hover:bg-[#e5e5e5] flex items-center"
            onClick={() => setZoom(Math.max(10, zoom - 10))}
            title="缩小"
          >
            <Minus className="w-3 h-3 text-[#666]" />
          </button>

          {/* 缩放滑块 */}
          <div className="w-[100px] h-[4px] bg-[#c7c7c7] rounded relative mx-1">
            <input
              type="range"
              min="10"
              max="200"
              value={zoom}
              onChange={(e) => setZoom(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[8px] h-[8px] bg-[#888] rounded-sm border border-[#666]"
              style={{ left: `calc(${((zoom - 10) / 190) * 100}% - 4px)` }}
            />
            {/* 100%标记线 */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[1px] h-[8px] bg-[#888]"
              style={{ left: `calc(${((100 - 10) / 190) * 100}%)` }}
            />
          </div>

          <button
            className="h-full px-1 hover:bg-[#e5e5e5] flex items-center"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
            title="放大"
          >
            <Plus className="w-3 h-3 text-[#666]" />
          </button>

          <button className="h-full px-2 hover:bg-[#e5e5e5] flex items-center min-w-[40px] justify-center">
            {zoom}%
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatusBar
