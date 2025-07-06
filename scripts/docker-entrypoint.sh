#!/bin/bash
set -e

echo "Starting application setup..."

# Wait for database to be ready
echo "Waiting for database to be ready..."
until npx prisma db push --accept-data-loss; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is ready!"

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run database migrations/push schema
echo "Pushing database schema..."
npx prisma db push --accept-data-loss

echo "Database setup complete!"

# Start the application
echo "Starting Next.js application..."
exec "$@"
