import React from 'react'
import { AppSettings } from '@/types'

interface HeaderProps {
  settings: AppSettings
}

const Header: React.FC<HeaderProps> = ({ settings }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center text-white font-bold">
              W
            </div>
            <span className="font-semibold text-lg text-gray-900">WordNovel</span>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
            <span>{settings.documentName}</span>
            <span className="text-gray-400">|</span>
            <span>{settings.userName}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span className="hidden sm:inline">打字看小说</span>
        </div>
      </div>
    </div>
  )
}

export default Header
