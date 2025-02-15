#!/bin/bash

# Set the target directory
TARGET_DIR="src"

# Array of directory paths to check
DIRECTORIES=(
  "application/bootstrap"
  "application/commands/types"
  "application/dtos"
  "application/queries"
  "application/services/system-health/implementations"
  "application/services/system-health/interfaces"
  "application/services/system-health"
  "application/commands"
  "application/services"
  "application"
  "domain/entities/coupon"
  "domain/entities"
  "domain/interfaces"
  "domain/value-objects"
  "domain"
  "infrastructure/auth"
  "infrastructure/config/cache/interface"
  "infrastructure/config/constants"
  "infrastructure/config/types"
  "infrastructure/messaging"
  "infrastructure/persistence/mappers"
  "infrastructure/config/cache"
  "infrastructure/persistence/schemas"
  "infrastructure/persistence"
  "infrastructure/storage"
  "infrastructure/config"
  "infrastructure"
  "interface/http/constants"
  "interface/http/controllers/v1"
  "interface/http/openapi"
  "interface/http/response"
  "interface/middleware"
  "interface/openapi"
  "interface/response"
  "interface/schemas"
  "interface/http/controllers"
  "interface/http"
  "interface"
  "shared/constants"
  "shared/errors"
  "shared/types"
  "shared/utils"
  "shared/validation"
  "shared"
)

# Function to check if a directory is empty
is_directory_empty() {
  local dir="$1"
  [ -z "$(ls -A "$TARGET_DIR/$dir")" ] # Check if the directory is empty
}

# Function to remove empty directories
remove_empty_directories() {
  for dir in "${DIRECTORIES[@]}"; do
    if is_directory_empty "$dir"; then
      rmdir "$TARGET_DIR/$dir" && echo -e "${GREEN}✅ Removed: $dir" # Green for removed
    else
      echo -e "${RED}❌ Could Not remove (contains files): $dir" # Red for not removed
    fi
  done
}

# Execute the removal process
echo "Checking and removing empty directories under $TARGET_DIR..."
remove_empty_directories

echo -e "\nCleanup process complete."
