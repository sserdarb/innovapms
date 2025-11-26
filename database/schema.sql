-- ElektraWEB PMS Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE TABLES
-- ============================================

-- Hotels Table
CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    tax_number VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    currency_code VARCHAR(3) DEFAULT 'TRY',
    timezone VARCHAR(50) DEFAULT 'Europe/Istanbul',
    is_active BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles Table
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Permissions Table
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    module VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Role Permissions (Many-to-Many)
CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles (id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions (id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- User Roles (Many-to-Many)
CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- ============================================
-- HOTEL MANAGEMENT TABLES
-- ============================================

-- Room Types
CREATE TABLE room_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    max_adults INTEGER DEFAULT 2,
    max_children INTEGER DEFAULT 0,
    max_occupancy INTEGER DEFAULT 2,
    base_price DECIMAL(10, 2),
    extra_bed_price DECIMAL(10, 2),
    amenities JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (hotel_id, code)
);

-- Rooms
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    room_type_id UUID NOT NULL REFERENCES room_types (id),
    room_number VARCHAR(50) NOT NULL,
    floor INTEGER,
    status VARCHAR(50) DEFAULT 'clean', -- clean, dirty, maintenance, out_of_order
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (hotel_id, room_number)
);

-- Rate Codes
CREATE TABLE rate_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (hotel_id, code)
);

-- Rate Plans
CREATE TABLE rate_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    room_type_id UUID NOT NULL REFERENCES room_types (id),
    rate_code_id UUID NOT NULL REFERENCES rate_codes (id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    min_stay INTEGER DEFAULT 1,
    max_stay INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- RESERVATION TABLES
-- ============================================

-- Guests
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    nationality VARCHAR(3),
    id_number VARCHAR(50),
    id_type VARCHAR(50),
    date_of_birth DATE,
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    vip_status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    reservation_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed', -- confirmed, cancelled, checked_in, checked_out, no_show
    source VARCHAR(50), -- direct, ota, phone, walk_in
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    adults INTEGER DEFAULT 1,
    children INTEGER DEFAULT 0,
    rate_code_id UUID REFERENCES rate_codes (id),
    total_amount DECIMAL(10, 2),
    deposit_amount DECIMAL(10, 2) DEFAULT 0,
    balance DECIMAL(10, 2),
    special_requests TEXT,
    notes TEXT,
    created_by UUID REFERENCES users (id),
    checked_in_at TIMESTAMP,
    checked_out_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservation Rooms (Many-to-Many)
CREATE TABLE reservation_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    reservation_id UUID NOT NULL REFERENCES reservations (id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms (id),
    room_type_id UUID NOT NULL REFERENCES room_types (id),
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    adults INTEGER DEFAULT 1,
    children INTEGER DEFAULT 0,
    rate DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'reserved', -- reserved, assigned, checked_in, checked_out
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservation Guests (Many-to-Many)
CREATE TABLE reservation_guests (
    reservation_id UUID NOT NULL REFERENCES reservations (id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES guests (id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    PRIMARY KEY (reservation_id, guest_id)
);

-- Room Blocks
CREATE TABLE room_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES rooms (id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason VARCHAR(255),
    notes TEXT,
    created_by UUID REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- FOLIO TABLES
-- ============================================

-- Folios
CREATE TABLE folios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    reservation_id UUID REFERENCES reservations (id),
    folio_number VARCHAR(50) UNIQUE NOT NULL,
    guest_id UUID REFERENCES guests (id),
    status VARCHAR(50) DEFAULT 'open', -- open, closed, transferred
    opening_balance DECIMAL(10, 2) DEFAULT 0,
    total_charges DECIMAL(10, 2) DEFAULT 0,
    total_payments DECIMAL(10, 2) DEFAULT 0,
    balance DECIMAL(10, 2) DEFAULT 0,
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Folio Transactions
CREATE TABLE folio_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    folio_id UUID NOT NULL REFERENCES folios (id) ON DELETE CASCADE,
    transaction_type VARCHAR(50) NOT NULL, -- charge, payment, adjustment, transfer
    department VARCHAR(100), -- room, restaurant, bar, spa, etc.
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    quantity DECIMAL(10, 2) DEFAULT 1,
    unit_price DECIMAL(10, 2),
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    tax_rate DECIMAL(5, 2) DEFAULT 0,
    currency_code VARCHAR(3) DEFAULT 'TRY',
    exchange_rate DECIMAL(10, 4) DEFAULT 1,
    reference_number VARCHAR(100),
    posted_by UUID REFERENCES users (id),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment Methods
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- cash, credit_card, debit_card, bank_transfer, voucher
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (hotel_id, code)
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    folio_id UUID NOT NULL REFERENCES folios (id) ON DELETE CASCADE,
    payment_method_id UUID NOT NULL REFERENCES payment_methods (id),
    amount DECIMAL(10, 2) NOT NULL,
    currency_code VARCHAR(3) DEFAULT 'TRY',
    exchange_rate DECIMAL(10, 4) DEFAULT 1,
    reference_number VARCHAR(100),
    card_number_masked VARCHAR(20),
    approval_code VARCHAR(50),
    notes TEXT,
    processed_by UUID REFERENCES users (id),
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Currencies
CREATE TABLE currencies (
    code VARCHAR(3) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10),
    is_active BOOLEAN DEFAULT true
);

-- Exchange Rates
CREATE TABLE exchange_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    from_currency VARCHAR(3) NOT NULL REFERENCES currencies (code),
    to_currency VARCHAR(3) NOT NULL REFERENCES currencies (code),
    rate DECIMAL(10, 4) NOT NULL,
    effective_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (
        hotel_id,
        from_currency,
        to_currency,
        effective_date
    )
);

-- ============================================
-- INTEGRATION TABLES
-- ============================================

-- External API Keys
CREATE TABLE external_api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    key_hash VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Webhooks
CREATE TABLE webhooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    events JSONB DEFAULT '[]',
    secret VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Integration Logs
CREATE TABLE integration_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    hotel_id UUID NOT NULL REFERENCES hotels (id) ON DELETE CASCADE,
    integration_type VARCHAR(100) NOT NULL,
    direction VARCHAR(20) NOT NULL, -- inbound, outbound
    endpoint VARCHAR(500),
    request_data JSONB,
    response_data JSONB,
    status_code INTEGER,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES
-- ============================================

-- Users
CREATE INDEX idx_users_hotel_id ON users (hotel_id);

CREATE INDEX idx_users_email ON users (email);

CREATE INDEX idx_users_username ON users (username);

-- Rooms
CREATE INDEX idx_rooms_hotel_id ON rooms (hotel_id);

CREATE INDEX idx_rooms_room_type_id ON rooms (room_type_id);

CREATE INDEX idx_rooms_status ON rooms (status);

-- Reservations
CREATE INDEX idx_reservations_hotel_id ON reservations (hotel_id);

CREATE INDEX idx_reservations_status ON reservations (status);

CREATE INDEX idx_reservations_arrival_date ON reservations (arrival_date);

CREATE INDEX idx_reservations_departure_date ON reservations (departure_date);

CREATE INDEX idx_reservations_dates ON reservations (arrival_date, departure_date);

-- Reservation Rooms
CREATE INDEX idx_reservation_rooms_reservation_id ON reservation_rooms (reservation_id);

CREATE INDEX idx_reservation_rooms_room_id ON reservation_rooms (room_id);

CREATE INDEX idx_reservation_rooms_dates ON reservation_rooms (arrival_date, departure_date);

-- Folios
CREATE INDEX idx_folios_hotel_id ON folios (hotel_id);

CREATE INDEX idx_folios_reservation_id ON folios (reservation_id);

CREATE INDEX idx_folios_status ON folios (status);

-- Folio Transactions
CREATE INDEX idx_folio_transactions_folio_id ON folio_transactions (folio_id);

CREATE INDEX idx_folio_transactions_posted_at ON folio_transactions (posted_at);

-- Integration Logs
CREATE INDEX idx_integration_logs_hotel_id ON integration_logs (hotel_id);

CREATE INDEX idx_integration_logs_created_at ON integration_logs (created_at);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON hotels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_room_types_updated_at BEFORE UPDATE ON room_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rate_codes_updated_at BEFORE UPDATE ON rate_codes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rate_plans_updated_at BEFORE UPDATE ON rate_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservation_rooms_updated_at BEFORE UPDATE ON reservation_rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_room_blocks_updated_at BEFORE UPDATE ON room_blocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_folios_updated_at BEFORE UPDATE ON folios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_external_api_keys_updated_at BEFORE UPDATE ON external_api_keys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhooks_updated_at BEFORE UPDATE ON webhooks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();