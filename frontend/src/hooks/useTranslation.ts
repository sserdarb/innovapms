import { useUIStore } from '@/store/ui'
import { translations } from './i18n'

export function useTranslation() {
    const language = useUIStore((state) => state.language)

    const t = (key: string): string => {
        const keys = key.split('.')
        let value: any = translations[language]

        for (const k of keys) {
            value = value?.[k]
        }

        return value || key
    }

    return { t, language }
}
