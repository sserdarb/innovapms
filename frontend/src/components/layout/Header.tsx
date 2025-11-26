import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'
import { useUIStore } from '@/store/ui'
import { Button } from '@/components/ui/button'
import { LogOut, User, Moon, Sun, Monitor, Languages } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export function Header() {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const navigate = useNavigate()

    const theme = useUIStore((state) => state.theme)
    const setTheme = useUIStore((state) => state.setTheme)
    const language = useUIStore((state) => state.language)
    const setLanguage = useUIStore((state) => state.setLanguage)
    const { t } = useTranslation()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const cycleTheme = () => {
        const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']
        const currentIndex = themes.indexOf(theme)
        const nextTheme = themes[(currentIndex + 1) % themes.length]
        setTheme(nextTheme)
    }

    const toggleLanguage = () => {
        setLanguage(language === 'tr' ? 'en' : 'tr')
    }

    const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex flex-1 items-center">
                    {/* Breadcrumb veya search buraya eklenebilir */}
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    {/* Language Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleLanguage}
                        title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}
                    >
                        <Languages className="h-5 w-5" />
                    </Button>

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={cycleTheme}
                        title="Toggle theme"
                    >
                        <ThemeIcon className="h-5 w-5" />
                    </Button>

                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" aria-hidden="true" />

                    <div className="flex items-center gap-x-4">
                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                <User className="w-4 h-4 text-primary" />
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.username}</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLogout}
                            title={t('auth.logout')}
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
