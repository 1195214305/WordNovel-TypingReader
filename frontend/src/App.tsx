import React, { useEffect, useState } from 'react'
import { useAppStore } from '@/store'
import Header from '@/components/Header'
import Toolbar from '@/components/Toolbar'
import Editor from '@/components/Editor'
import StatusBar from '@/components/StatusBar'
import ContentManager from '@/components/ContentManager'
import AIGenerator from '@/components/AIGenerator'

const App: React.FC = () => {
  const { novels, settings, loadFromStorage } = useAppStore()
  const [showContentManager, setShowContentManager] = useState(false)
  const [showAIGenerator, setShowAIGenerator] = useState(false)

  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  useEffect(() => {
    document.title = `${settings.documentName} - WordNovel`
  }, [settings.documentName])

  const currentNovel = novels.find((novel) => novel.id === settings.currentNovelId)
  const currentWordCount = currentNovel?.content?.length || 0

  return (
    <div className="h-screen flex flex-col bg-[#e8e8e8] overflow-hidden">
      <Header settings={settings} />
      <Toolbar
        onSaveClick={() => setShowContentManager(true)}
        onAIClick={() => setShowAIGenerator(true)}
      />
      <Editor novelContent={currentNovel?.content || ''} typingSpeed={settings.typingSpeed} />
      <StatusBar wordCount={currentWordCount} currentPage={1} totalPages={1} />

      <ContentManager open={showContentManager} onOpenChange={setShowContentManager} />
      <AIGenerator open={showAIGenerator} onOpenChange={setShowAIGenerator} />
    </div>
  )
}

export default App
