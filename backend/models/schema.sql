-- Growaf Database Schema (PostgreSQL)

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'Buyer', -- Farmer, Buyer, Expert, Admin
    location VARCHAR(255),
    profile_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores Table (For Farmers/Vendors)
CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    verification_status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    images TEXT[], -- Array of URLs
    rating DECIMAL(2, 1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallets Table
CREATE TABLE IF NOT EXISTS wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'NGN',
    status VARCHAR(50) DEFAULT 'Active',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    wallet_id INTEGER REFERENCES wallets(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL, -- Credit, Debit
    amount DECIMAL(15, 2) NOT NULL,
    reference VARCHAR(100) UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Farms Table
CREATE TABLE IF NOT EXISTS farms (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location_lat DECIMAL(10, 8),
    location_long DECIMAL(11, 8),
    size_hectares DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- IoT Sensors Table
CREATE TABLE IF NOT EXISTS iot_sensors (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- Moisture, pH, Temperature
    device_id VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'Online',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- IoT Data Table (Time-series)
CREATE TABLE IF NOT EXISTS iot_data (
    id BIGSERIAL PRIMARY KEY,
    sensor_id INTEGER REFERENCES iot_sensors(id) ON DELETE CASCADE,
    value DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Diagnoses Table
CREATE TABLE IF NOT EXISTS ai_diagnoses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    diagnosis TEXT,
    treatment_plan TEXT,
    confidence_score DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- Pending, Paid, Shipped, Delivered, Cancelled
    escrow_status VARCHAR(50) DEFAULT 'Held', -- Held, Released, Disputed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL
);
