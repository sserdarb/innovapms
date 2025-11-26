-- Seed data for ElektraWEB PMS
-- Initial roles, permissions, and sample data

-- ============================================
-- CURRENCIES
-- ============================================

INSERT INTO
    currencies (code, name, symbol, is_active)
VALUES (
        'TRY',
        'Turkish Lira',
        '₺',
        true
    ),
    ('USD', 'US Dollar', '$', true),
    ('EUR', 'Euro', '€', true),
    (
        'GBP',
        'British Pound',
        '£',
        true
    );

-- ============================================
-- ROLES
-- ============================================

INSERT INTO
    roles (
        name,
        display_name,
        description,
        is_system
    )
VALUES (
        'system_admin',
        'Sistem Yöneticisi',
        'Tüm sisteme tam erişim',
        true
    ),
    (
        'hotel_admin',
        'Otel Yöneticisi',
        'Otel yönetimi ve tüm modüllere erişim',
        true
    ),
    (
        'front_office_manager',
        'Ön Büro Şefi',
        'Rezervasyon, check-in/out, folyo yönetimi',
        true
    ),
    (
        'receptionist',
        'Resepsiyonist',
        'Rezervasyon ve check-in/out işlemleri',
        true
    ),
    (
        'housekeeping',
        'Housekeeping',
        'Oda durumu ve temizlik yönetimi',
        true
    ),
    (
        'revenue_manager',
        'Gelir Yöneticisi',
        'Fiyat, stok ve kanal yönetimi',
        true
    ),
    (
        'restaurant_staff',
        'Restoran Personeli',
        'POS ve folyo işlemleri',
        true
    ),
    (
        'accountant',
        'Muhasebeci',
        'Finansal raporlar ve tahsilat',
        true
    );

-- ============================================
-- PERMISSIONS
-- ============================================

-- Auth Module
INSERT INTO
    permissions (
        name,
        display_name,
        description,
        module
    )
VALUES (
        'auth.users.view',
        'Kullanıcıları Görüntüle',
        'Kullanıcı listesini görüntüleme',
        'auth'
    ),
    (
        'auth.users.create',
        'Kullanıcı Oluştur',
        'Yeni kullanıcı oluşturma',
        'auth'
    ),
    (
        'auth.users.update',
        'Kullanıcı Güncelle',
        'Kullanıcı bilgilerini güncelleme',
        'auth'
    ),
    (
        'auth.users.delete',
        'Kullanıcı Sil',
        'Kullanıcı silme',
        'auth'
    ),
    (
        'auth.roles.manage',
        'Rol Yönetimi',
        'Rol ve yetki yönetimi',
        'auth'
    );

-- Hotel Module
INSERT INTO
    permissions (
        name,
        display_name,
        description,
        module
    )
VALUES (
        'hotel.view',
        'Otel Bilgilerini Görüntüle',
        'Otel bilgilerini görüntüleme',
        'hotel'
    ),
    (
        'hotel.update',
        'Otel Bilgilerini Güncelle',
        'Otel bilgilerini güncelleme',
        'hotel'
    ),
    (
        'hotel.rooms.view',
        'Odaları Görüntüle',
        'Oda listesini görüntüleme',
        'hotel'
    ),
    (
        'hotel.rooms.manage',
        'Oda Yönetimi',
        'Oda ekleme, düzenleme, silme',
        'hotel'
    ),
    (
        'hotel.rates.view',
        'Fiyatları Görüntüle',
        'Fiyat planlarını görüntüleme',
        'hotel'
    ),
    (
        'hotel.rates.manage',
        'Fiyat Yönetimi',
        'Fiyat planlarını yönetme',
        'hotel'
    );

-- Reservation Module
INSERT INTO
    permissions (
        name,
        display_name,
        description,
        module
    )
VALUES (
        'reservation.view',
        'Rezervasyonları Görüntüle',
        'Rezervasyon listesini görüntüleme',
        'reservation'
    ),
    (
        'reservation.create',
        'Rezervasyon Oluştur',
        'Yeni rezervasyon oluşturma',
        'reservation'
    ),
    (
        'reservation.update',
        'Rezervasyon Güncelle',
        'Rezervasyon bilgilerini güncelleme',
        'reservation'
    ),
    (
        'reservation.cancel',
        'Rezervasyon İptal',
        'Rezervasyon iptal etme',
        'reservation'
    ),
    (
        'reservation.checkin',
        'Check-in',
        'Misafir check-in işlemi',
        'reservation'
    ),
    (
        'reservation.checkout',
        'Check-out',
        'Misafir check-out işlemi',
        'reservation'
    ),
    (
        'reservation.roomrack.view',
        'Roomrack Görüntüle',
        'Oda durumunu görüntüleme',
        'reservation'
    ),
    (
        'reservation.block.manage',
        'Blokaj Yönetimi',
        'Oda bloklama ve açma',
        'reservation'
    );

-- Folio Module
INSERT INTO
    permissions (
        name,
        display_name,
        description,
        module
    )
VALUES (
        'folio.view',
        'Folyoları Görüntüle',
        'Folyo listesini görüntüleme',
        'folio'
    ),
    (
        'folio.create',
        'Folyo Oluştur',
        'Yeni folyo oluşturma',
        'folio'
    ),
    (
        'folio.charge',
        'İşlem Ekle',
        'Folyoya işlem ekleme',
        'folio'
    ),
    (
        'folio.payment',
        'Tahsilat',
        'Ödeme alma',
        'folio'
    ),
    (
        'folio.close',
        'Folyo Kapat',
        'Folyo kapatma',
        'folio'
    ),
    (
        'folio.transfer',
        'Folyo Transfer',
        'Folyo transfer işlemi',
        'folio'
    );

-- Integration Module
INSERT INTO
    permissions (
        name,
        display_name,
        description,
        module
    )
VALUES (
        'integration.view',
        'Entegrasyonları Görüntüle',
        'Entegrasyon listesini görüntüleme',
        'integration'
    ),
    (
        'integration.manage',
        'Entegrasyon Yönetimi',
        'Entegrasyon ayarlarını yönetme',
        'integration'
    ),
    (
        'integration.api_keys.manage',
        'API Anahtarı Yönetimi',
        'API anahtarlarını yönetme',
        'integration'
    ),
    (
        'integration.webhooks.manage',
        'Webhook Yönetimi',
        'Webhook ayarlarını yönetme',
        'integration'
    );

-- Reporting Module
INSERT INTO
    permissions (
        name,
        display_name,
        description,
        module
    )
VALUES (
        'reports.daily',
        'Günlük Raporlar',
        'Günlük yönetim raporlarını görüntüleme',
        'reports'
    ),
    (
        'reports.financial',
        'Finansal Raporlar',
        'Finansal raporları görüntüleme',
        'reports'
    ),
    (
        'reports.occupancy',
        'Doluluk Raporları',
        'Doluluk raporlarını görüntüleme',
        'reports'
    ),
    (
        'reports.export',
        'Rapor Dışa Aktar',
        'Raporları dışa aktarma',
        'reports'
    );

-- ============================================
-- ROLE PERMISSIONS MAPPING
-- ============================================

-- System Admin - All permissions
INSERT INTO
    role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
    CROSS JOIN permissions p
WHERE
    r.name = 'system_admin';

-- Hotel Admin - All permissions except system admin
INSERT INTO
    role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
    CROSS JOIN permissions p
WHERE
    r.name = 'hotel_admin';

-- Front Office Manager
INSERT INTO
    role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
    CROSS JOIN permissions p
WHERE
    r.name = 'front_office_manager'
    AND p.name IN (
        'hotel.view',
        'hotel.rooms.view',
        'reservation.view',
        'reservation.create',
        'reservation.update',
        'reservation.cancel',
        'reservation.checkin',
        'reservation.checkout',
        'reservation.roomrack.view',
        'reservation.block.manage',
        'folio.view',
        'folio.create',
        'folio.charge',
        'folio.payment',
        'folio.close',
        'folio.transfer',
        'reports.daily',
        'reports.occupancy'
    );

-- Receptionist
INSERT INTO
    role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
    CROSS JOIN permissions p
WHERE
    r.name = 'receptionist'
    AND p.name IN (
        'hotel.view',
        'hotel.rooms.view',
        'reservation.view',
        'reservation.create',
        'reservation.update',
        'reservation.checkin',
        'reservation.checkout',
        'reservation.roomrack.view',
        'folio.view',
        'folio.create',
        'folio.charge',
        'folio.payment'
    );

-- Housekeeping
INSERT INTO
    role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
    CROSS JOIN permissions p
WHERE
    r.name = 'housekeeping'
    AND p.name IN (
        'hotel.rooms.view',
        'reservation.roomrack.view'
    );

-- Revenue Manager
INSERT INTO
    role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
    CROSS JOIN permissions p
WHERE
    r.name = 'revenue_manager'
    AND p.name IN (
        'hotel.view',
        'hotel.rooms.view',
        'hotel.rates.view',
        'hotel.rates.manage',
        'reservation.view',
        'reservation.roomrack.view',
        'reports.daily',
        'reports.financial',
        'reports.occupancy',
        'reports.export'
    );

-- Restaurant Staff
INSERT INTO
    role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
    CROSS JOIN permissions p
WHERE
    r.name = 'restaurant_staff'
    AND p.name IN ('folio.view', 'folio.charge');

-- Accountant
INSERT INTO
    role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
    CROSS JOIN permissions p
WHERE
    r.name = 'accountant'
    AND p.name IN (
        'folio.view',
        'folio.payment',
        'folio.close',
        'reports.daily',
        'reports.financial',
        'reports.export'
    );