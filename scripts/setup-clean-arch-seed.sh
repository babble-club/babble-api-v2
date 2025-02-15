#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Set the target directory
TARGET_DIR="src"

# Array of directory paths to create
DIRECTORIES=(
  "application/bootstrap"
  "application/commands/types"
  "application/dtos"
  "application/queries"
  "application/services/system-health/implementations"
  "application/services/system-health/interfaces"
  "domain/entities/coupon"
  "domain/interfaces"
  "domain/value-objects"
  "infrastructure/auth"
  "infrastructure/config/cache/interface"
  "infrastructure/config/constants"
  "infrastructure/config/types"
  "infrastructure/messaging"
  "infrastructure/persistence/mappers"
  "infrastructure/persistence/schemas"
  "infrastructure/storage"
  "interface/http/constants"
  "interface/http/controllers/v1"
  "interface/http/openapi"
  "interface/http/response"
  "interface/middleware"
  "interface/openapi"
  "interface/response"
  "interface/schemas"
  "shared/constants"
  "shared/errors"
  "shared/types"
  "shared/utils"
  "shared/validation"
)

# Function to create directories recursively
create_directories() {
  local dir="$1"
  mkdir -p "$TARGET_DIR/$dir"
}

# Function to check if a directory exists
check_directory_exists() {
  local dir="$1"
  if [ -d "$TARGET_DIR/$dir" ]; then
    echo -e "${GREEN}✅ $dir" # Green tick for existing directory
  else
    echo -e "${RED}❌ $dir" # Red cross for non-existing directory
  fi
}

# Create directories and check their existence
echo "Creating directory structure under $TARGET_DIR..."
for dir in "${DIRECTORIES[@]}"; do
  create_directories "$dir"   # Create each directory
done

echo -e "\nChecking directory structure:"
for dir in "${DIRECTORIES[@]}"; do
  check_directory_exists "$dir" # Check each directory's existence
done

echo -e "\nDirectory structure creation and verification complete."

