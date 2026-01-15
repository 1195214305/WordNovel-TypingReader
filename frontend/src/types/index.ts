export interface NovelContent {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface AppSettings {
  documentName: string
  userName: string
  currentNovelId: string | null
  typingSpeed: number
  qianwenApiKey?: string
}

export interface AINovelRequest {
  genre: string
  theme: string
  length: 'short' | 'medium' | 'long'
}

export interface AINovelResponse {
  title: string
  content: string
}
