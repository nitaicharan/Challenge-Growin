#!/usr/bin/env sh
set -e

# 1) Copy .env.example→.env if it doesn't already exist
if [ ! -f /opt/application/.env ]; then
  echo "⚙️  Creating .env from .env.example"
  cp /opt/application/.env.example /opt/application/.env
fi

# 2) Run migrations
echo "🚀 Running migrations"
npm run migration:run

# 3) Start the app
echo "🎉 Starting app"
exec npm run start:"$NODE_ENV"
