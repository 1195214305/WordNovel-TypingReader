import { create } from 'zustand'
import { NovelContent, AppSettings } from '@/types'

interface AppStore {
  novels: NovelContent[]
  settings: AppSettings
  addNovel: (novel: Omit<NovelContent, 'id' | 'createdAt' | 'updatedAt'>) => void
  deleteNovel: (id: string) => void
  selectNovel: (id: string) => void
  updateSettings: (settings: Partial<AppSettings>) => void
  loadFromStorage: () => void
  saveToStorage: () => void
}

const defaultSettings: AppSettings = {
  documentName: 'novel.docx',
  userName: '读者',
  currentNovelId: null,
  typingSpeed: 50,
  qianwenApiKey: '',
}

export const useAppStore = create<AppStore>((set, get) => ({
  novels: [],
  settings: defaultSettings,

  addNovel: (novelData) => {
    const newNovel: NovelContent = {
      ...novelData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    set((state) => {
      const novels = [...state.novels, newNovel]
      const settings = state.settings.currentNovelId
        ? state.settings
        : { ...state.settings, currentNovelId: newNovel.id }

      localStorage.setItem('novels', JSON.stringify(novels))
      localStorage.setItem('settings', JSON.stringify(settings))

      return { novels, settings }
    })
  },

  deleteNovel: (id) => {
    set((state) => {
      const novels = state.novels.filter((novel) => novel.id !== id)
      const settings = state.settings.currentNovelId === id
        ? { ...state.settings, currentNovelId: novels.length > 0 ? novels[0].id : null }
        : state.settings

      localStorage.setItem('novels', JSON.stringify(novels))
      localStorage.setItem('settings', JSON.stringify(settings))

      return { novels, settings }
    })
  },

  selectNovel: (id) => {
    set((state) => {
      const settings = { ...state.settings, currentNovelId: id }
      localStorage.setItem('settings', JSON.stringify(settings))
      return { settings }
    })
  },

  updateSettings: (newSettings) => {
    set((state) => {
      const settings = { ...state.settings, ...newSettings }
      localStorage.setItem('settings', JSON.stringify(settings))
      return { settings }
    })
  },

  loadFromStorage: () => {
    try {
      const novelsStr = localStorage.getItem('novels')
      const settingsStr = localStorage.getItem('settings')

      const novels = novelsStr ? JSON.parse(novelsStr) : []
      const settings = settingsStr ? JSON.parse(settingsStr) : defaultSettings

      set({ novels, settings })
    } catch (error) {
      console.error('加载数据失败:', error)
    }
  },

  saveToStorage: () => {
    const { novels, settings } = get()
    localStorage.setItem('novels', JSON.stringify(novels))
    localStorage.setItem('settings', JSON.stringify(settings))
  },
}))
