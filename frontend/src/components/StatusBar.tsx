import React from 'react'

interface StatusBarProps {
  wordCount: number
  currentPage: number
  totalPages: number
}

const StatusBar: React.FC<StatusBarProps> = ({ wordCount, currentPage, totalPages }) => {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-1.5">
      <div className="flex items-center justify-between max-w-7xl mx-auto text-xs text-gray-600">
        <div className="flex items-center space-x-4">
          <span>第 {currentPage} 页,共 {totalPages} 页</span>
          <span className="hidden sm:inline">字数: {wordCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="hidden md:inline">提示: 点击页面开始打字阅读</span>
        </div>
      </div>
    </div>
  )
}

export default StatusBar
