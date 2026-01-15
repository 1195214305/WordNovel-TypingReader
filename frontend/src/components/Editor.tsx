import React, { useRef, useEffect, useState, useCallback } from 'react'
import InputMethod from './InputMethod'

interface EditorProps {
  novelContent: string
  typingSpeed: number
}

const Editor: React.FC<EditorProps> = ({ novelContent, typingSpeed: _typingSpeed }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showInputMethod, setShowInputMethod] = useState(false)
  const [inputMethodPosition, setInputMethodPosition] = useState({ x: 0, y: 0 })
  const [currentInput, setCurrentInput] = useState('')
  const [isEnglishMode, setIsEnglishMode] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

      if (novelContent) {
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

      if (novelContent && !isActive && editorRef.current) {
        editorRef.current.focus()
        setIsActive(true)
      }
    },
    [novelContent, isActive]
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

  return (
    <div className="flex-1 bg-[#e8e8e8] overflow-auto relative">
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
                {displayedText}
                {isActive && (
                  <span
                    className="inline-block bg-black cursor-blink"
                    style={{ width: '1px', height: '18px', marginLeft: '1px' }}
                  />
                )}
              </div>

              {/* 输入法状态指示器 */}
              {isActive && (
                <div className="fixed bottom-16 right-4 bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs z-40 shadow">
                  {isEnglishMode ? '英' : '中'}
                </div>
              )}

              {/* 空白提示 */}
              {!novelContent && (
                <div className="text-gray-400 pointer-events-none">
                  <p className="mb-4" style={{ fontFamily: '微软雅黑, sans-serif' }}>
                    点击工具栏 <span className="text-[#185abd] font-medium">"管理内容"</span> 按钮添加小说
                  </p>
                  <p className="mb-4" style={{ fontFamily: '微软雅黑, sans-serif' }}>
                    或点击 <span className="text-[#185abd] font-medium">"AI生成"</span> 让AI为你创作小说
                  </p>
                  <p className="text-sm text-gray-400 mt-8" style={{ fontFamily: '微软雅黑, sans-serif' }}>
                    提示: 点击页面任意位置开始打字，Ctrl+Space 切换中英文
                  </p>
                </div>
              )}

              {/* 阅读完成提示 */}
              {novelContent && currentIndex >= novelContent.length && (
                <div className="mt-16 text-center text-gray-400" style={{ fontFamily: '微软雅黑, sans-serif' }}>
                  <p className="text-lg">- 全文完 -</p>
                  <p className="text-sm mt-2">共 {novelContent.length} 字</p>
                </div>
              )}

              {/* 阅读进度提示 */}
              {novelContent && !isActive && currentIndex < novelContent.length && (
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
          {showInputMethod && (
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
