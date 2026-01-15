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

    // Ctrl+Space 切换中英文
    if (e.ctrlKey && e.code === 'Space') {
      setIsEnglishMode((prev) => !prev)
      return
    }

    // 退格键
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

    // ESC 键取消输入法
    if (e.key === 'Escape') {
      setShowInputMethod(false)
      setCurrentInput('')
      return
    }

    // 空格键确认输入
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

    // 数字键选择候选词
    if (showInputMethod && /^[1-9]$/.test(e.key)) {
      handleWordSelection(currentInput)
      return
    }

    // 字母输入
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

    // 其他字符直接输入
    if (e.key.length === 1) {
      handleWordSelection(e.key)
    }
  }

  const updateInputMethodPosition = useCallback(() => {
    if (editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect()
      const lines = Math.floor(currentIndex / 50)
      const x = rect.left + 16 + ((currentIndex % 50) * 12)
      const y = rect.top + 16 + lines * 24 + 24

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
    <div className="flex-1 bg-gray-100 p-4 md:p-8 overflow-auto">
      <div className="max-w-4xl mx-auto bg-white word-shadow min-h-[600px] md:min-h-[800px] p-8 md:p-16 relative word-editor">
        <div
          ref={editorRef}
          className="outline-none min-h-full cursor-text relative"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
        >
          <div className="whitespace-pre-wrap leading-7 text-base md:text-lg font-serif">
            {displayedText}
            {isActive && <span className="inline-block w-0.5 h-6 bg-black cursor-blink ml-0.5" />}
          </div>

          {isActive && (
            <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-2 py-1 rounded text-xs z-40">
              {isEnglishMode ? 'EN' : '中'}
            </div>
          )}

          {!novelContent && (
            <div className="absolute top-0 left-0 text-gray-400 pointer-events-none">
              <p className="text-lg mb-2">点击工具栏"管理"按钮添加小说内容</p>
              <p className="text-lg mb-2">或点击"AI生成"让AI为你创作小说</p>
              <p className="text-sm text-gray-500 mt-4">
                提示: 点击页面任意位置开始打字,Ctrl+Space 切换中英文
              </p>
            </div>
          )}

          {novelContent && currentIndex >= novelContent.length && (
            <div className="mt-8 text-center text-gray-400">
              <p className="text-lg">小说已阅读完毕</p>
              <p className="text-sm mt-2">点击页面重新开始阅读</p>
            </div>
          )}

          {novelContent && !isActive && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-center">
              <div className="text-lg mb-2">点击页面任意位置开始打字阅读</div>
              <div className="text-sm">
                当前进度: {currentIndex} / {novelContent.length} 字 (
                {((currentIndex / novelContent.length) * 100).toFixed(1)}%)
              </div>
            </div>
          )}
        </div>

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
  )
}

export default Editor
