import React from 'react'

interface InputMethodProps {
  position: { x: number; y: number }
  currentInput: string
  onWordSelect: (word: string) => void
  onClose: () => void
}

const InputMethod: React.FC<InputMethodProps> = ({ position, currentInput, onWordSelect }) => {
  const candidates = currentInput ? [currentInput, currentInput, currentInput] : []

  return (
    <div
      className="fixed input-method-box p-2 z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="text-xs text-gray-600 mb-1">{currentInput}</div>
      <div className="flex space-x-2">
        {candidates.map((word, index) => (
          <button
            key={index}
            className="px-2 py-1 text-sm hover:bg-gray-100 rounded"
            onClick={() => onWordSelect(word)}
          >
            {index + 1}.{word}
          </button>
        ))}
      </div>
    </div>
  )
}

export default InputMethod
