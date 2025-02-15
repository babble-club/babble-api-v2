#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Set the target directory
TARGET_DIR="src"

# Function to create directories recursively
create_directories() {
  local dir="$1"
  mkdir -p "$TARGET_DIR/$dir"
}

# Create the directory structure
create_directories "application/bootstrap"
create_directories "application/commands/types"
create_directories "application/dtos"
create_directories "application/queries"
create_directories "application/services/system-health/implementations"
create_directories "application/services/system-health/interfaces"
create_directories "domain/entities/coupon"
create_directories "domain/interfaces"
create_directories "domain/value-objects"
create_directories "infrastructure/auth"
create_directories "infrastructure/config/cache/interface"
create_directories "infrastructure/config/constants"
create_directories "infrastructure/config/types"
create_directories "infrastructure/messaging"
create_directories "infrastructure/persistence/mappers"
create_directories "infrastructure/persistence/schemas"
create_directories "infrastructure/storage"
create_directories "interface/http/constants"
create_directories "interface/http/controllers/v1"
create_directories "interface/http/openapi"
create_directories "interface/http/response"
create_directories "interface/middleware"
create_directories "interface/openapi"
create_directories "interface/response"
create_directories "interface/schemas"
create_directories "shared/constants"
create_directories "shared/errors"
create_directories "shared/types"
create_directories "shared/utils"
create_directories "shared/validation"

echo "Directory structure created under $TARGET_DIR"

# Function to check if a directory exists
check_directory_exists() {
  local dir="$1"
  if [ -d "$TARGET_DIR/$dir" ]; then
    echo -e "${GREEN}✅ $dir"
  else
    echo -e "${RED}❌ $dir"
  fi
}

# Print the directory structure with green ticks or red crosses
echo "Checking directory structure:"
check_directory_exists "application/bootstrap"
check_directory_exists "application/commands/types"
check_directory_exists "application/dtos"
check_directory_exists "application/queries"
check_directory_exists "application/services/system-health/implementations"
check_directory_exists "application/services/system-health/interfaces"
check_directory_exists "domain/entities/coupon"
check_directory_exists "domain/interfaces"
check_directory_exists "domain/value-objects"
check_directory_exists "infrastructure/auth"
check_directory_exists "infrastructure/config/cache/interface"
check_directory_exists "infrastructure/config/constants"
check_directory_exists "infrastructure/config/types"
check_directory_exists "infrastructure/messaging"
check_directory_exists "infrastructure/persistence/mappers"
check_directory_exists "infrastructure/persistence/schemas"
check_directory_exists "infrastructure/storage"
check_directory_exists "interface/http/constants"
check_directory_exists "interface/http/controllers/v1"
check_directory_exists "interface/http/openapi"
check_directory_exists "interface/http/response"
check_directory_exists "interface/middleware"
check_directory_exists "interface/openapi"
check_directory_exists "interface/response"
check_directory_exists "interface/schemas"
check_directory_exists "shared/constants"
check_directory_exists "shared/errors"
check_directory_exists "shared/types"
check_directory_exists "shared/utils"
check_directory_exists "shared/validation"
