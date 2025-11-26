export const translations = {
    tr: {
        // Common
        common: {
            save: 'Kaydet',
            cancel: 'İptal',
            delete: 'Sil',
            edit: 'Düzenle',
            add: 'Ekle',
            search: 'Ara',
            filter: 'Filtrele',
            loading: 'Yükleniyor...',
            noData: 'Veri bulunamadı',
            error: 'Bir hata oluştu',
            success: 'Başarılı',
        },

        // Navigation
        nav: {
            dashboard: 'Dashboard',
            roomrack: 'Roomrack',
            reservations: 'Rezervasyonlar',
            folios: 'Folyolar',
            settings: 'Ayarlar',
        },

        // Auth
        auth: {
            login: 'Giriş Yap',
            logout: 'Çıkış Yap',
            username: 'Kullanıcı Adı',
            password: 'Şifre',
            loginTitle: 'ElektraWEB PMS',
            loginSubtitle: 'Otel yönetim sisteminize giriş yapın',
        },

        // Dashboard
        dashboard: {
            title: 'Dashboard',
            subtitle: 'Otel yönetim sisteminize hoş geldiniz',
            totalRooms: 'Toplam Oda',
            occupiedRooms: 'Dolu Oda',
            todayCheckIn: 'Bugün Check-in',
            dailyRevenue: 'Günlük Gelir',
            welcome: 'Hoş Geldiniz!',
            welcomeMessage: 'ElektraWEB PMS admin paneline hoş geldiniz. Sol menüden istediğiniz modüle erişebilirsiniz.',
        },

        // Roomrack
        roomrack: {
            title: 'Roomrack',
            subtitle: 'Oda durumu ve müsaitlik takibi',
            all: 'Tümü',
            clean: 'Temiz',
            dirty: 'Kirli',
            inspected: 'Kontrol Edildi',
            outOfService: 'Hizmet Dışı',
            outOfOrder: 'Arızalı',
            ready: 'Hazır',
            noRooms: 'Oda bulunamadı',
            noRoomsMessage: 'Bu filtreye uygun oda bulunmamaktadır.',
        },

        // Reservations
        reservations: {
            title: 'Rezervasyonlar',
            subtitle: 'Rezervasyon yönetimi ve takibi',
            new: 'Yeni Rezervasyon',
            confirmed: 'Onaylandı',
            cancelled: 'İptal',
            checkedIn: 'Check-in',
            checkedOut: 'Check-out',
            noShow: 'Gelmedi',
            adults: 'Yetişkin',
            children: 'Çocuk',
            detail: 'Detay',
            checkIn: 'Check-in',
            noReservations: 'Rezervasyon bulunamadı',
            noReservationsMessage: 'Henüz rezervasyon bulunmamaktadır.',
        },

        // Folios
        folios: {
            title: 'Folyolar',
            subtitle: 'Folyo ve tahsilat yönetimi',
            new: 'Yeni Folyo',
            open: 'Açık',
            closed: 'Kapalı',
            transferred: 'Transfer Edildi',
            totalCharges: 'Toplam İşlem',
            totalPayments: 'Ödenen',
            balance: 'Bakiye',
            detail: 'Detay',
            payment: 'Ödeme',
            created: 'Oluşturulma',
            noFolios: 'Folyo bulunamadı',
            noFoliosMessage: 'Bu durumda folyo bulunmamaktadır.',
        },
    },

    en: {
        // Common
        common: {
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            add: 'Add',
            search: 'Search',
            filter: 'Filter',
            loading: 'Loading...',
            noData: 'No data found',
            error: 'An error occurred',
            success: 'Success',
        },

        // Navigation
        nav: {
            dashboard: 'Dashboard',
            roomrack: 'Roomrack',
            reservations: 'Reservations',
            folios: 'Folios',
            settings: 'Settings',
        },

        // Auth
        auth: {
            login: 'Login',
            logout: 'Logout',
            username: 'Username',
            password: 'Password',
            loginTitle: 'ElektraWEB PMS',
            loginSubtitle: 'Login to your hotel management system',
        },

        // Dashboard
        dashboard: {
            title: 'Dashboard',
            subtitle: 'Welcome to your hotel management system',
            totalRooms: 'Total Rooms',
            occupiedRooms: 'Occupied Rooms',
            todayCheckIn: 'Today Check-in',
            dailyRevenue: 'Daily Revenue',
            welcome: 'Welcome!',
            welcomeMessage: 'Welcome to ElektraWEB PMS admin panel. You can access any module from the left menu.',
        },

        // Roomrack
        roomrack: {
            title: 'Roomrack',
            subtitle: 'Room status and availability tracking',
            all: 'All',
            clean: 'Clean',
            dirty: 'Dirty',
            inspected: 'Inspected',
            outOfService: 'Out of Service',
            outOfOrder: 'Out of Order',
            ready: 'Ready',
            noRooms: 'No rooms found',
            noRoomsMessage: 'No rooms match this filter.',
        },

        // Reservations
        reservations: {
            title: 'Reservations',
            subtitle: 'Reservation management and tracking',
            new: 'New Reservation',
            confirmed: 'Confirmed',
            cancelled: 'Cancelled',
            checkedIn: 'Checked In',
            checkedOut: 'Checked Out',
            noShow: 'No Show',
            adults: 'Adults',
            children: 'Children',
            detail: 'Detail',
            checkIn: 'Check-in',
            noReservations: 'No reservations found',
            noReservationsMessage: 'There are no reservations yet.',
        },

        // Folios
        folios: {
            title: 'Folios',
            subtitle: 'Folio and payment management',
            new: 'New Folio',
            open: 'Open',
            closed: 'Closed',
            transferred: 'Transferred',
            totalCharges: 'Total Charges',
            totalPayments: 'Total Payments',
            balance: 'Balance',
            detail: 'Detail',
            payment: 'Payment',
            created: 'Created',
            noFolios: 'No folios found',
            noFoliosMessage: 'No folios in this status.',
        },
    },
}

export type TranslationKey = keyof typeof translations.tr
