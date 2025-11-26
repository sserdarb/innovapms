import React from 'react'
import ReactDOM from 'react-dom/client'
import { BookingWidget } from './BookingWidget'

// Widget initialization function
declare global {
    interface Window {
        ElektraBooking: {
            init: (config: {
                elementId: string
                hotelId: string
                apiUrl?: string
                primaryColor?: string
                language?: 'tr' | 'en'
            }) => void
        }
    }
}

window.ElektraBooking = {
    init: (config) => {
        const element = document.getElementById(config.elementId)
        if (!element) {
            console.error(`Element with id "${config.elementId}" not found`)
            return
        }

        const root = ReactDOM.createRoot(element)
        root.render(
            <React.StrictMode>
                <BookingWidget
                    hotelId={config.hotelId}
                    apiUrl={config.apiUrl}
                    primaryColor={config.primaryColor}
                    language={config.language}
                />
            </React.StrictMode>
        )
    },
}

// Auto-initialize if data attributes are present
document.addEventListener('DOMContentLoaded', () => {
    const widgets = document.querySelectorAll('[data-elektra-booking]')
    widgets.forEach((element) => {
        const hotelId = element.getAttribute('data-hotel-id')
        const apiUrl = element.getAttribute('data-api-url')
        const primaryColor = element.getAttribute('data-primary-color')
        const language = element.getAttribute('data-language') as 'tr' | 'en'

        if (hotelId && element.id) {
            window.ElektraBooking.init({
                elementId: element.id,
                hotelId,
                apiUrl: apiUrl || undefined,
                primaryColor: primaryColor || undefined,
                language: language || 'tr',
            })
        }
    })
})
