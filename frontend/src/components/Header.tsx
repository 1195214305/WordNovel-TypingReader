import React from 'react'
import { AppSettings } from '@/types'

interface HeaderProps {
  settings: AppSettings
}

const Header: React.FC<HeaderProps> = ({ settings }) => {
  return (
    <div className="bg-[#185abd] text-white select-none">
      {/* 标题栏 */}
      <div className="flex items-center h-8 px-2">
        {/* 左侧快速访问工具栏 */}
        <div className="flex items-center space-x-1">
          <button className="w-6 h-6 hover:bg-white/10 rounded flex items-center justify-center">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
            </svg>
          </button>
          <button className="w-6 h-6 hover:bg-white/10 rounded flex items-center justify-center">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
            </svg>
          </button>
          <button className="w-6 h-6 hover:bg-white/10 rounded flex items-center justify-center">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div>

        {/* 中间文档名称 */}
        <div className="flex-1 text-center">
          <span className="text-sm font-normal">{settings.documentName} - Word</span>
        </div>

        {/* 右侧窗口控制按钮 */}
        <div className="flex items-center">
          <button className="w-11 h-8 hover:bg-white/10 flex items-center justify-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1H2V3z"/>
            </svg>
          </button>
          <button className="w-11 h-8 hover:bg-white/10 flex items-center justify-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
            </svg>
          </button>
          <button className="w-11 h-8 hover:bg-[#c42b1c] flex items-center justify-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
