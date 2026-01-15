import React, { useRef, useEffect, useState, useCallback } from 'react'
import InputMethod from './InputMethod'

interface EditorProps {
  novelContent: string
  typingSpeed: number
}

// 预设的工作文案
const WORK_DOCUMENTS = [
  {
    title: '2024年度工作总结报告',
    content: `2024年度工作总结报告

一、工作概述

本年度在公司领导的正确指导下，在各部门同事的大力支持下，本人认真履行岗位职责，较好地完成了各项工作任务。现将全年工作情况总结如下：

二、主要工作内容

1. 项目管理工作
本年度共参与项目管理工作12个，其中主导项目5个，协助项目7个。通过规范化的项目管理流程，确保了项目按时交付，客户满意度达到95%以上。

2. 团队协作与沟通
积极参与团队日常沟通，定期组织项目周会，及时反馈工作进度，协调解决项目中遇到的问题。全年共组织召开项目会议48次，形成会议纪要48份。

3. 业务能力提升
利用业余时间学习新技术、新方法，不断提升自身业务能力。参加公司组织的各类培训6次，获得相关资质认证2项。

三、工作成果

1. 完成年度KPI指标，业绩同比增长15%
2. 获得优秀员工提名1次
3. 成功推动流程优化方案3项

四、存在的不足

1. 在时间管理方面还需进一步加强
2. 跨部门沟通协调能力有待提升
3. 创新意识需要进一步增强

五、下一步工作计划

1. 继续深入学习业务知识，提升专业能力
2. 加强时间管理，提高工作效率
3. 积极参与公司各项活动，增强团队凝聚力

以上是本年度工作总结，不足之处请领导批评指正。`
  },
  {
    title: '项目需求分析文档',
    content: `项目需求分析文档

项目名称：企业管理系统升级
文档版本：V1.0
编写日期：2024年12月
编写人：张三

一、项目背景

随着公司业务的快速发展，现有的企业管理系统已无法满足日益增长的业务需求。为提升工作效率、优化业务流程，公司决定对现有系统进行全面升级。

二、项目目标

1. 提升系统性能，响应时间缩短50%
2. 优化用户界面，提升用户体验
3. 增加移动端支持，实现随时随地办公
4. 加强数据安全，符合等保2.0要求

三、功能需求

3.1 用户管理模块
- 支持多角色权限管理
- 支持组织架构管理
- 支持单点登录（SSO）

3.2 审批流程模块
- 支持自定义审批流程
- 支持移动端审批
- 支持审批记录查询

3.3 报表统计模块
- 支持自定义报表
- 支持数据导出
- 支持可视化展示

四、非功能需求

4.1 性能需求
- 系统响应时间不超过2秒
- 支持500用户并发访问

4.2 安全需求
- 数据传输加密
- 操作日志记录
- 定期数据备份

五、项目计划

第一阶段（1-2月）：需求调研与分析
第二阶段（3-5月）：系统设计与开发
第三阶段（6月）：测试与优化
第四阶段（7月）：上线与培训`
  },
  {
    title: '会议纪要',
    content: `会议纪要

会议主题：2024年第四季度工作部署会议
会议时间：2024年12月15日 14:00-16:00
会议地点：公司三楼会议室
参会人员：各部门负责人及相关人员
主持人：王总
记录人：李四

一、会议内容

1. 王总通报了公司第三季度经营情况，整体业绩完成率达到112%，超额完成季度目标。

2. 各部门汇报了第三季度工作完成情况及第四季度工作计划：

（1）市场部：
- 第三季度新增客户35家，完成率118%
- 第四季度计划：重点开拓华东市场，目标新增客户40家

（2）研发部：
- 完成产品V2.0版本开发，已进入测试阶段
- 第四季度计划：完成V2.0上线，启动V3.0需求调研

（3）运营部：
- 客户满意度调查结果：92分
- 第四季度计划：优化服务流程，目标满意度达到95分

3. 王总对第四季度工作提出以下要求：
- 各部门要紧盯年度目标，确保圆满完成
- 加强部门间协作，形成工作合力
- 注重风险防控，确保安全生产

二、会议决议

1. 同意市场部提出的华东市场开拓方案
2. 同意研发部V3.0版本立项申请
3. 各部门于本周五前提交详细工作计划

三、待办事项

1. 市场部：制定华东市场开拓详细方案（负责人：张经理，完成时间：12月20日）
2. 研发部：完成V2.0测试报告（负责人：刘工，完成时间：12月25日）
3. 运营部：制定服务流程优化方案（负责人：陈经理，完成时间：12月22日）

会议结束时间：16:00`
  }
]

const Editor: React.FC<EditorProps> = ({ novelContent, typingSpeed: _typingSpeed }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showInputMethod, setShowInputMethod] = useState(false)
  const [inputMethodPosition, setInputMethodPosition] = useState({ x: 0, y: 0 })
  const [currentInput, setCurrentInput] = useState('')
  const [isEnglishMode, setIsEnglishMode] = useState(false)

  // 老板键相关状态
  const [isBossMode, setIsBossMode] = useState(false)
  const [currentWorkDoc, setCurrentWorkDoc] = useState(0)
  const [showBossHint, setShowBossHint] = useState(false)

  // 切换老板模式
  const toggleBossMode = useCallback(() => {
    setIsBossMode(prev => !prev)
    setShowBossHint(true)
    setTimeout(() => setShowBossHint(false), 1500)
  }, [])

  // 切换工作文档
  const switchWorkDoc = useCallback(() => {
    setCurrentWorkDoc(prev => (prev + 1) % WORK_DOCUMENTS.length)
  }, [])

  // 全局快捷键监听
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // ` 键（波浪线键）或 F1 切换老板模式
      if (e.key === '`' || e.key === 'F1') {
        e.preventDefault()
        toggleBossMode()
      }
      // 老板模式下，Tab 键切换文档
      if (isBossMode && e.key === 'Tab') {
        e.preventDefault()
        switchWorkDoc()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isBossMode, toggleBossMode, switchWorkDoc])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 老板模式下不处理打字
    if (isBossMode) return

    e.preventDefault()

    if (!novelContent) return

    if (e.ctrlKey && e.code === 'Space') {
      setIsEnglishMode((prev) => !prev)
      return
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (showInputMethod && currentInput.length > 0) {
        setCurrentInput((prev) => prev.slice(0, -1))
      } else if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
        setShowInputMethod(false)
        setCurrentInput('')
      }
      return
    }

    if (e.key === 'Escape') {
      setShowInputMethod(false)
      setCurrentInput('')
      return
    }

    if (e.key === ' ') {
      if (showInputMethod && currentInput.length > 0) {
        handleWordSelection(currentInput)
      } else if (!showInputMethod && !isEnglishMode) {
        setShowInputMethod(true)
        setCurrentInput('')
        updateInputMethodPosition()
      } else {
        handleWordSelection(' ')
      }
      return
    }

    if (showInputMethod && /^[1-9]$/.test(e.key)) {
      handleWordSelection(currentInput)
      return
    }

    if (/^[a-zA-Z]$/.test(e.key)) {
      if (isEnglishMode) {
        handleWordSelection(e.key)
      } else {
        setCurrentInput((prev) => prev + e.key.toLowerCase())
        if (!showInputMethod) {
          setShowInputMethod(true)
          updateInputMethodPosition()
        }
      }
      return
    }

    if (e.key.length === 1) {
      handleWordSelection(e.key)
    }
  }

  const updateInputMethodPosition = useCallback(() => {
    if (editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect()
      const lines = Math.floor(currentIndex / 50)
      const x = rect.left + 96 + ((currentIndex % 50) * 14)
      const y = rect.top + 96 + lines * 28 + 28

      setInputMethodPosition({ x, y })
    }
  }, [currentIndex])

  const handleWordSelection = (selectedText: string) => {
    if (!novelContent) return

    const textLength = selectedText.length
    const newIndex = Math.min(currentIndex + textLength, novelContent.length)
    setCurrentIndex(newIndex)
    setShowInputMethod(false)
    setCurrentInput('')
  }

  const handleFocus = () => {
    setIsActive(true)
  }

  const handleBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement
    if (relatedTarget && relatedTarget.closest('.input-method-simulator')) {
      return
    }

    setIsActive(false)
    setShowInputMethod(false)
    setCurrentInput('')
  }

  const handleClick = () => {
    if (editorRef.current) {
      editorRef.current.focus()
      updateInputMethodPosition()

      if (novelContent || isBossMode) {
        setIsActive(true)
      }
    }
  }

  const handlePageClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.closest('.word-editor') || target.closest('.input-method-simulator')) {
        return
      }

      if ((novelContent || isBossMode) && !isActive && editorRef.current) {
        editorRef.current.focus()
        setIsActive(true)
      }
    },
    [novelContent, isActive, isBossMode]
  )

  useEffect(() => {
    document.addEventListener('click', handlePageClick)
    return () => {
      document.removeEventListener('click', handlePageClick)
    }
  }, [handlePageClick])

  useEffect(() => {
    if (editorRef.current && novelContent) {
      editorRef.current.focus()
    }
  }, [novelContent])

  useEffect(() => {
    if (novelContent) {
      const textToShow = novelContent.substring(0, currentIndex)
      setDisplayedText(textToShow)
    } else {
      setDisplayedText('')
      setCurrentIndex(0)
    }
  }, [currentIndex, novelContent])

  useEffect(() => {
    setCurrentIndex(0)
    setDisplayedText('')
    setShowInputMethod(false)
    setCurrentInput('')
  }, [novelContent])

  useEffect(() => {
    updateInputMethodPosition()
  }, [currentIndex, updateInputMethodPosition])

  // 获取当前显示的内容
  const currentContent = isBossMode
    ? WORK_DOCUMENTS[currentWorkDoc].content
    : displayedText

  return (
    <div className="flex-1 bg-[#e8e8e8] overflow-auto relative">
      {/* 老板模式切换提示 */}
      {showBossHint && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-lg z-50 text-lg font-medium">
          {isBossMode ? '已切换到工作模式' : '已切换到阅读模式'}
        </div>
      )}

      {/* 水平标尺 */}
      <div className="sticky top-0 z-10 bg-[#e8e8e8] h-6 flex justify-center">
        <div className="w-[816px] h-5 bg-white border-b border-gray-300 flex items-end relative mt-1">
          <div className="absolute inset-x-0 bottom-0 h-4 flex items-end justify-between px-1">
            {Array.from({ length: 17 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[8px] text-gray-500 mb-0.5">{i}</span>
                <div className="w-px h-2 bg-gray-400" />
              </div>
            ))}
          </div>
          {/* 缩进标记 */}
          <div className="absolute left-[96px] -top-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-500" />
          <div className="absolute right-[96px] -top-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-500" />
        </div>
      </div>

      {/* 文档区域 */}
      <div className="flex justify-center py-4 px-4">
        <div className="relative">
          {/* A4纸张 */}
          <div
            className="bg-white shadow-lg word-editor"
            style={{
              width: '816px',
              minHeight: '1056px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {/* 页面内容区域 - 模拟Word的页边距 */}
            <div
              ref={editorRef}
              className="outline-none cursor-text"
              style={{
                padding: '96px',
                minHeight: '1056px'
              }}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onClick={handleClick}
            >
              <div
                className="whitespace-pre-wrap leading-7 text-base font-serif relative"
                style={{ fontFamily: '宋体, SimSun, serif', fontSize: '14px', lineHeight: '28px' }}
              >
                {currentContent}
                {isActive && !isBossMode && (
                  <span
                    className="inline-block bg-black cursor-blink"
                    style={{ width: '1px', height: '18px', marginLeft: '1px' }}
                  />
                )}
              </div>

              {/* 快捷键提示 */}
              <div className="fixed bottom-16 right-4 flex flex-col gap-1 z-40">
                {isActive && !isBossMode && (
                  <div className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs shadow">
                    {isEnglishMode ? '英' : '中'}
                  </div>
                )}
                <button
                  onClick={toggleBossMode}
                  className={`px-2 py-1 rounded text-xs shadow transition-colors ${
                    isBossMode
                      ? 'bg-green-500 text-white border border-green-600'
                      : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                  }`}
                  title="按 ` 键或 F1 切换"
                >
                  {isBossMode ? '工作中' : '老板键'}
                </button>
              </div>

              {/* 老板模式下的文档切换提示 */}
              {isBossMode && (
                <div className="fixed bottom-16 left-4 bg-gray-100 border border-gray-300 px-3 py-2 rounded text-xs shadow z-40">
                  <div className="font-medium text-gray-700 mb-1">当前文档：{WORK_DOCUMENTS[currentWorkDoc].title}</div>
                  <div className="text-gray-500">按 Tab 切换文档 | 按 ` 返回阅读</div>
                </div>
              )}

              {/* 空白提示 - 仅非老板模式下显示 */}
              {!novelContent && !isBossMode && (
                <div className="text-gray-400 pointer-events-none">
                  <p className="mb-4" style={{ fontFamily: '微软雅黑, sans-serif' }}>
                    点击工具栏 <span className="text-[#185abd] font-medium">"管理内容"</span> 按钮添加小说
                  </p>
                  <p className="mb-4" style={{ fontFamily: '微软雅黑, sans-serif' }}>
                    或点击 <span className="text-[#185abd] font-medium">"AI生成"</span> 让AI为你创作小说
                  </p>
                  <p className="text-sm text-gray-400 mt-8" style={{ fontFamily: '微软雅黑, sans-serif' }}>
                    提示: 按 ` 键或 F1 可快速切换到工作文档（老板键）
                  </p>
                </div>
              )}

              {/* 阅读完成提示 */}
              {novelContent && !isBossMode && currentIndex >= novelContent.length && (
                <div className="mt-16 text-center text-gray-400" style={{ fontFamily: '微软雅黑, sans-serif' }}>
                  <p className="text-lg">- 全文完 -</p>
                  <p className="text-sm mt-2">共 {novelContent.length} 字</p>
                </div>
              )}

              {/* 阅读进度提示 */}
              {novelContent && !isBossMode && !isActive && currentIndex < novelContent.length && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-white/80 pointer-events-none"
                  style={{ fontFamily: '微软雅黑, sans-serif' }}
                >
                  <div className="text-center">
                    <div className="text-gray-500 mb-2">点击任意位置继续阅读</div>
                    <div className="text-sm text-gray-400">
                      进度: {currentIndex} / {novelContent.length} 字
                      ({((currentIndex / novelContent.length) * 100).toFixed(1)}%)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 输入法模拟器 */}
          {showInputMethod && !isBossMode && (
            <div className="input-method-simulator">
              <InputMethod
                position={inputMethodPosition}
                currentInput={currentInput}
                onWordSelect={handleWordSelection}
                onClose={() => {
                  setShowInputMethod(false)
                  setCurrentInput('')
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Editor
