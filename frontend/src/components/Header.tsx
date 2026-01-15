import React from 'react'
import { AppSettings } from '@/types'
import { Search, ChevronDown } from 'lucide-react'

interface HeaderProps {
  settings: AppSettings
}

const Header: React.FC<HeaderProps> = ({ settings }) => {
  return (
    <div className="bg-[#185abd] text-white select-none flex flex-col">
      {/* 标题栏 */}
      <div className="flex items-center h-[30px] px-1">
        {/* Word图标和快速访问工具栏 */}
        <div className="flex items-center">
          {/* Word图标 */}
          <div className="w-[46px] h-[30px] flex items-center justify-center hover:bg-white/10">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
              <path d="M14 2v6h6"/>
              <text x="7" y="17" fontSize="8" fontWeight="bold" fill="#185abd">W</text>
            </svg>
          </div>

          {/* 快速访问工具栏 */}
          <div className="flex items-center h-[30px] border-l border-white/20 ml-1 pl-1">
            <button className="w-[26px] h-[26px] hover:bg-white/10 rounded-sm flex items-center justify-center" title="自动保存">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="w-[26px] h-[26px] hover:bg-white/10 rounded-sm flex items-center justify-center" title="保存">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
              </svg>
            </button>
            <button className="w-[26px] h-[26px] hover:bg-white/10 rounded-sm flex items-center justify-center" title="撤销">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
              </svg>
            </button>
            <button className="w-[26px] h-[26px] hover:bg-white/10 rounded-sm flex items-center justify-center" title="恢复">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
            </button>
            <div className="w-px h-4 bg-white/30 mx-1" />
            <button className="h-[26px] px-1 hover:bg-white/10 rounded-sm flex items-center justify-center">
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 文档名称 - 居中 */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[13px] font-normal">{settings.documentName}</span>
          <span className="text-[13px] text-white/60 ml-1">- 已保存</span>
        </div>

        {/* 右侧：搜索和用户 */}
        <div className="flex items-center">
          {/* 搜索框 */}
          <div className="flex items-center bg-white/10 rounded-sm h-[26px] px-2 mr-2 w-[200px]">
            <Search className="w-4 h-4 text-white/70" />
            <input
              type="text"
              placeholder="搜索"
              className="bg-transparent border-none outline-none text-[13px] text-white placeholder-white/50 ml-2 w-full"
            />
          </div>

          {/* 分享按钮 */}
          <button className="h-[26px] px-3 bg-[#106ebe] hover:bg-[#0f5ea8] rounded-sm text-[13px] mr-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
            </svg>
            共享
          </button>

          {/* 用户头像 */}
          <button className="w-[32px] h-[32px] rounded-full bg-[#0078d4] flex items-center justify-center text-[13px] font-medium mr-1">
            {settings.userName.charAt(0)}
          </button>
        </div>

        {/* 窗口控制按钮 */}
        <div className="flex items-center">
          <button className="w-[46px] h-[30px] hover:bg-white/10 flex items-center justify-center" title="最小化">
            <svg className="w-[10px] h-[10px]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8z"/>
            </svg>
          </button>
          <button className="w-[46px] h-[30px] hover:bg-white/10 flex items-center justify-center" title="最大化">
            <svg className="w-[10px] h-[10px]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 10 10">
              <rect x="0.5" y="0.5" width="9" height="9" />
            </svg>
          </button>
          <button className="w-[46px] h-[30px] hover:bg-[#c42b1c] flex items-center justify-center" title="关闭">
            <svg className="w-[10px] h-[10px]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
