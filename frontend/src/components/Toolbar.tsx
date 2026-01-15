import React, { useState } from 'react'
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, ChevronDown, Sparkles, Type,
  Highlighter, PaintBucket
} from 'lucide-react'

interface ToolbarProps {
  onSaveClick: () => void
  onAIClick: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({ onSaveClick, onAIClick }) => {
  const [activeTab, setActiveTab] = useState('开始')

  const tabs = ['文件', '开始', '插入', '绘图', '设计', '布局', '引用', '邮件', '审阅', '视图', '帮助']

  return (
    <div className="bg-white border-b border-[#d1d1d1] select-none">
      {/* 选项卡栏 */}
      <div className="flex items-center h-[32px] border-b border-[#e1e1e1]">
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
            className={`px-3 h-full text-[12px] transition-colors relative ${
              activeTab === tab
                ? 'bg-[#f3f3f3] text-[#185abd] font-medium'
                : 'hover:bg-[#e5e5e5] text-[#444444]'
            }`}
            style={{
              borderBottom: activeTab === tab ? '2px solid #185abd' : '2px solid transparent'
            }}
          >
            {tab}
          </button>
        ))}

        {/* AI生成按钮 */}
        <div className="flex-1" />
        <button
          onClick={onAIClick}
          className="flex items-center space-x-1 px-3 h-[26px] my-auto mr-2 text-[12px] bg-[#185abd] text-white rounded hover:bg-[#1565c0] transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI生成</span>
        </button>
      </div>

      {/* 功能区 Ribbon */}
      <div className="flex items-stretch h-[94px] px-2 py-1 bg-[#f3f3f3]">
        {/* 剪贴板组 */}
        <div className="flex flex-col pr-2 mr-1 border-r border-[#d1d1d1]">
          <div className="flex-1 flex items-start pt-1">
            <button
              className="flex flex-col items-center px-2 py-1 hover:bg-[#e5e5e5] rounded"
              title="粘贴"
            >
              <svg className="w-8 h-8 text-[#444]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/>
              </svg>
              <div className="flex items-center text-[11px] text-[#444]">
                <span>粘贴</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </div>
            </button>
          </div>
          <div className="flex items-center space-x-0.5 pb-1">
            <button className="p-1.5 hover:bg-[#e5e5e5] rounded" title="剪切">
              <svg className="w-4 h-4 text-[#666]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5z"/>
              </svg>
            </button>
            <button className="p-1.5 hover:bg-[#e5e5e5] rounded" title="复制">
              <svg className="w-4 h-4 text-[#666]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"/>
                <path d="M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
              </svg>
            </button>
            <button className="p-1.5 hover:bg-[#e5e5e5] rounded" title="格式刷">
              <svg className="w-4 h-4 text-[#666]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879z"/>
              </svg>
            </button>
          </div>
          <span className="text-[10px] text-[#666] text-center pb-1">剪贴板</span>
        </div>

        {/* 字体组 */}
        <div className="flex flex-col pr-2 mr-1 border-r border-[#d1d1d1]">
          <div className="flex items-center space-x-1 pt-1">
            <select className="h-[22px] px-1 text-[11px] border border-[#c7c7c7] rounded bg-white w-[120px] text-[#444]">
              <option>等线</option>
              <option>宋体</option>
              <option>黑体</option>
              <option>微软雅黑</option>
              <option>楷体</option>
              <option>仿宋</option>
            </select>
            <select className="h-[22px] px-1 text-[11px] border border-[#c7c7c7] rounded bg-white w-[50px] text-[#444]">
              <option>五号</option>
              <option>小四</option>
              <option>四号</option>
              <option>小三</option>
              <option>三号</option>
            </select>
            <div className="flex border border-[#c7c7c7] rounded bg-white">
              <button className="w-[20px] h-[20px] flex items-center justify-center hover:bg-[#e5e5e5]" title="增大字号">
                <Type className="w-3 h-3 text-[#666]" />
              </button>
              <button className="w-[20px] h-[20px] flex items-center justify-center hover:bg-[#e5e5e5] border-l border-[#c7c7c7]" title="减小字号">
                <Type className="w-2.5 h-2.5 text-[#666]" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-0.5 mt-1">
            <button className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="加粗">
              <Bold className="w-4 h-4 text-[#444]" strokeWidth={3} />
            </button>
            <button className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="倾斜">
              <Italic className="w-4 h-4 text-[#444]" />
            </button>
            <button className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="下划线">
              <Underline className="w-4 h-4 text-[#444]" />
            </button>
            <button className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="删除线">
              <Strikethrough className="w-4 h-4 text-[#444]" />
            </button>
            <button className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="下标">
              <span className="text-[11px] text-[#444]">X<sub className="text-[8px]">2</sub></span>
            </button>
            <button className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="上标">
              <span className="text-[11px] text-[#444]">X<sup className="text-[8px]">2</sup></span>
            </button>
            <div className="w-px h-4 bg-[#d1d1d1] mx-0.5" />
            <button className="flex items-center hover:bg-[#e5e5e5] rounded px-1 h-[24px]" title="文本效果">
              <span className="text-[12px] font-bold text-[#444] relative">
                A
                <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-blue-500" />
              </span>
              <ChevronDown className="w-3 h-3 text-[#666]" />
            </button>
            <button className="flex items-center hover:bg-[#e5e5e5] rounded h-[24px]" title="突出显示">
              <div className="w-4 h-4 flex flex-col items-center justify-center">
                <Highlighter className="w-3 h-3 text-[#444]" />
                <div className="w-4 h-[3px] bg-yellow-300 -mt-0.5" />
              </div>
              <ChevronDown className="w-3 h-3 text-[#666]" />
            </button>
            <button className="flex items-center hover:bg-[#e5e5e5] rounded h-[24px]" title="字体颜色">
              <div className="w-4 h-4 flex flex-col items-center justify-center">
                <span className="text-[12px] font-bold text-[#444]">A</span>
                <div className="w-4 h-[3px] bg-red-500 -mt-1" />
              </div>
              <ChevronDown className="w-3 h-3 text-[#666]" />
            </button>
          </div>
          <span className="text-[10px] text-[#666] text-center mt-auto pb-1">字体</span>
        </div>

        {/* 段落组 */}
        <div className="flex flex-col pr-2 mr-1 border-r border-[#d1d1d1]">
          <div className="flex items-center space-x-0.5 pt-1">
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="项目符号">
              <List className="w-4 h-4 text-[#444]" />
            </button>
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="编号">
              <ListOrdered className="w-4 h-4 text-[#444]" />
            </button>
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="多级列表">
              <svg className="w-4 h-4 text-[#444]" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0z"/>
              </svg>
            </button>
            <div className="w-px h-4 bg-[#d1d1d1] mx-0.5" />
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="减少缩进">
              <svg className="w-4 h-4 text-[#444]" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="增加缩进">
              <svg className="w-4 h-4 text-[#444]" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="排序">
              <svg className="w-4 h-4 text-[#444]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-0.5 mt-1">
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded bg-[#e5e5e5] border border-[#c7c7c7]" title="左对齐">
              <AlignLeft className="w-4 h-4 text-[#444]" />
            </button>
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="居中">
              <AlignCenter className="w-4 h-4 text-[#444]" />
            </button>
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="右对齐">
              <AlignRight className="w-4 h-4 text-[#444]" />
            </button>
            <button className="w-[24px] h-[22px] flex items-center justify-center hover:bg-[#e5e5e5] rounded" title="两端对齐">
              <AlignJustify className="w-4 h-4 text-[#444]" />
            </button>
            <div className="w-px h-4 bg-[#d1d1d1] mx-0.5" />
            <button className="flex items-center hover:bg-[#e5e5e5] rounded px-1 h-[22px]" title="行距">
              <svg className="w-4 h-4 text-[#444]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <ChevronDown className="w-3 h-3 text-[#666]" />
            </button>
            <button className="flex items-center hover:bg-[#e5e5e5] rounded h-[22px]" title="底纹">
              <PaintBucket className="w-4 h-4 text-[#444]" />
              <ChevronDown className="w-3 h-3 text-[#666]" />
            </button>
            <button className="flex items-center hover:bg-[#e5e5e5] rounded h-[22px]" title="边框">
              <svg className="w-4 h-4 text-[#444]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 0h16v16H0V0zm1 1v14h14V1H1z"/>
              </svg>
              <ChevronDown className="w-3 h-3 text-[#666]" />
            </button>
          </div>
          <span className="text-[10px] text-[#666] text-center mt-auto pb-1">段落</span>
        </div>

        {/* 样式组 */}
        <div className="flex flex-col pr-2 mr-1 border-r border-[#d1d1d1]">
          <div className="flex items-center space-x-1 pt-1 flex-1">
            <div className="flex space-x-1">
              <button className="px-2 py-1 border border-transparent hover:border-[#c7c7c7] rounded text-[11px] text-[#444]">
                正文
              </button>
              <button className="px-2 py-1 border border-transparent hover:border-[#c7c7c7] rounded text-[11px] text-[#444]">
                无间隔
              </button>
              <button className="px-2 py-1 border border-[#c7c7c7] rounded text-[14px] text-[#2e74b5] font-bold">
                标题 1
              </button>
              <button className="px-2 py-1 border border-transparent hover:border-[#c7c7c7] rounded text-[13px] text-[#2e74b5]">
                标题 2
              </button>
            </div>
          </div>
          <span className="text-[10px] text-[#666] text-center pb-1">样式</span>
        </div>

        {/* 内容管理 - 自定义按钮 */}
        <div className="flex flex-col items-center justify-center px-3">
          <button
            onClick={onSaveClick}
            className="flex flex-col items-center p-2 hover:bg-[#e5e5e5] rounded"
            title="内容管理"
          >
            <svg className="w-7 h-7 text-[#185abd]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
            </svg>
            <span className="text-[10px] text-[#666] mt-1">管理内容</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
