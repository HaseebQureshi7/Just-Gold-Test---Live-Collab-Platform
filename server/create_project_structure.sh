#!/bin/bash

# Define all directories
folders=(
  "src/application/use-cases"
  "src/application/services"
  "src/application/dtos"
  "src/domain/entities"
  "src/domain/repositories"
  "src/domain/interfaces"
  "src/domain/value-objects"
  "src/infrastructure/config"
  "src/infrastructure/database/prisma"
  "src/infrastructure/repositories"
  "src/infrastructure/web-sockets"
  "src/presentation/controllers"
  "src/presentation/routes"
  "src/presentation/middlewares"
  "src/shared"
)

# Create directories
for folder in "${folders[@]}"; do
  mkdir -p "$folder"
  echo "Created: $folder"
done

echo "✅ All folders have been created successfully!"

files=(
  ["src/server.ts"]=""
  ["src/app.ts"]=""
)

# Create files
for file in "${!files[@]}"; do
  if [ ! -f "$file" ]; then
    touch "$file"
    echo "Created: $file"
  fi
done

echo "✅ All files have been created successfully!"