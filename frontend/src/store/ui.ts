import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'
type Language = 'tr' | 'en'

interface UIState {
    theme: Theme
    language: Language
    sidebarOpen: boolean
    setTheme: (theme: Theme) => void
    setLanguage: (language: Language) => void
    toggleSidebar: () => void
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: 'light',
            language: 'tr',
            sidebarOpen: true,

            setTheme: (theme) => {
                set({ theme })
                // Apply theme to document
                const root = window.document.documentElement
                root.classList.remove('light', 'dark')

                if (theme === 'system') {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light'
                    root.classList.add(systemTheme)
                } else {
                    root.classList.add(theme)
                }
            },

            setLanguage: (language) => set({ language }),

            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        }),
        {
            name: 'ui-storage',
        }
    )
)
