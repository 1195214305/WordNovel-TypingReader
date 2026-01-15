import React, { useState } from 'react'
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, ChevronDown, Sparkles, FolderOpen
} from 'lucide-react'

interface ToolbarProps {
  onSaveClick: () => void
  onAIClick: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({ onSaveClick, onAIClick }) => {
  const [activeTab, setActiveTab] = useState('开始')

  const tabs = ['文件', '开始', '插入', '设计', '布局', '引用', '审阅', '视图']

  return (
    <div className="bg-[#f3f3f3] border-b border-gray-300 select-none">
      {/* 选项卡栏 */}
      <div className="flex items-center border-b border-gray-200 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              if (tab === '文件') {
                onSaveClick()
              } else {
                setActiveTab(tab)
              }
            }}
            className={`px-4 py-1.5 text-sm transition-colors ${
              activeTab === tab
                ? 'bg-[#f3f3f3] border-t-2 border-t-[#185abd] text-[#185abd]'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}

        {/* AI生成按钮 - 放在选项卡最右边 */}
        <div className="flex-1" />
        <button
          onClick={onAIClick}
          className="flex items-center space-x-1 px-3 py-1.5 mr-2 text-sm bg-[#185abd] text-white rounded hover:bg-[#1565c0] transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI生成</span>
        </button>
      </div>

      {/* 功能区 Ribbon */}
      <div className="flex items-stretch h-24 px-2 py-1 bg-[#f3f3f3]">
        {/* 剪贴板组 */}
        <div className="flex flex-col items-center border-r border-gray-300 pr-3 mr-3">
          <div className="flex items-center space-x-1 mb-1">
            <button className="p-1.5 hover:bg-gray-200 rounded" title="粘贴">
              <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
            </button>
          </div>
          <div className="flex space-x-0.5">
            <button className="p-1 hover:bg-gray-200 rounded text-xs" title="剪切">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5z"/>
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded text-xs" title="复制">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"/>
                <path d="M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
              </svg>
            </button>
          </div>
          <span className="text-[10px] text-gray-500 mt-1">剪贴板</span>
        </div>

        {/* 字体组 */}
        <div className="flex flex-col border-r border-gray-300 pr-3 mr-3">
          <div className="flex items-center space-x-1 mb-1">
            <select className="h-6 px-1 text-xs border border-gray-300 rounded bg-white w-28">
              <option>宋体</option>
              <option>黑体</option>
              <option>微软雅黑</option>
              <option>楷体</option>
            </select>
            <select className="h-6 px-1 text-xs border border-gray-300 rounded bg-white w-14">
              <option>11</option>
              <option>12</option>
              <option>14</option>
              <option>16</option>
            </select>
          </div>
          <div className="flex items-center space-x-0.5">
            <button className="p-1 hover:bg-gray-200 rounded" title="加粗">
              <Bold className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="斜体">
              <Italic className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="下划线">
              <Underline className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="删除线">
              <Strikethrough className="w-4 h-4 text-gray-600" />
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <button className="p-1 hover:bg-gray-200 rounded flex items-center" title="字体颜色">
              <div className="w-4 h-4 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-gray-600">A</span>
                <div className="w-4 h-1 bg-red-500 -mt-0.5" />
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded flex items-center" title="突出显示">
              <div className="w-4 h-4 bg-yellow-300 rounded-sm" />
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </div>
          <span className="text-[10px] text-gray-500 mt-1 text-center">字体</span>
        </div>

        {/* 段落组 */}
        <div className="flex flex-col border-r border-gray-300 pr-3 mr-3">
          <div className="flex items-center space-x-0.5 mb-1">
            <button className="p-1 hover:bg-gray-200 rounded" title="项目符号">
              <List className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="编号">
              <ListOrdered className="w-4 h-4 text-gray-600" />
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <button className="p-1 hover:bg-gray-200 rounded" title="减少缩进">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
                <path d="M12.354 7.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L11.293 7.5 9.646 5.854a.5.5 0 1 1 .708-.708l2 2z"/>
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="增加缩进">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                <path d="M14.854 7.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L13.793 7.5l-1.647-1.646a.5.5 0 1 1 .708-.708l2 2z"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-0.5">
            <button className="p-1 hover:bg-gray-200 rounded bg-gray-200" title="左对齐">
              <AlignLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="居中">
              <AlignCenter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="右对齐">
              <AlignRight className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="两端对齐">
              <AlignJustify className="w-4 h-4 text-gray-600" />
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <button className="p-1 hover:bg-gray-200 rounded flex items-center" title="行间距">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </div>
          <span className="text-[10px] text-gray-500 mt-1 text-center">段落</span>
        </div>

        {/* 内容管理按钮 */}
        <div className="flex flex-col items-center justify-center px-3">
          <button
            onClick={onSaveClick}
            className="flex flex-col items-center p-2 hover:bg-gray-200 rounded"
            title="内容管理"
          >
            <FolderOpen className="w-6 h-6 text-[#185abd]" />
            <span className="text-[10px] text-gray-600 mt-1">管理内容</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
