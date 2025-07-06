-- Initialize the database with basic setup
-- This script runs when the PostgreSQL container starts for the first time

-- Create the database if it doesn't exist (this is handled by POSTGRES_DB env var)
-- But we can add any additional setup here

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- You can add any initial data or additional setup here
-- For example, creating initial admin users, hospitals, etc.

-- Note: Prisma migrations will handle the actual table creation
