#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

START_SERVER=true
while [[ $# -gt 0 ]]; do
    case $1 in
        --no-server)
            START_SERVER=false
            shift
            ;;
        *)
            shift
            ;;
    esac
done

echo "🔍 Checking prerequisites..."

# Detect OS at the start of the script
if [[ "$OSTYPE" == "darwin"* ]]; then
    DISTRO="macOS"
elif [[ -f "/etc/os-release" ]]; then
    DISTRO=$(awk -F= '/^NAME/{print $2}' /etc/os-release | tr -d '"')
    echo -e "Debug - Detected distribution: ${YELLOW}${DISTRO}${NC}"
else
    DISTRO="Unknown"
fi

echo "📌 Detected system: ${DISTRO}"

# Function to check version
version_check() {
    local version1=$1
    local version2=$2
    if [ "$(printf '%s\n' "$version1" "$version2" | sort -V | head -n1)" = "$version1" ]; then
        return 0
    else
        return 1
    fi
}

# Function to suggest package installation based on OS
suggest_install() {
    local package=$1
    case "${DISTRO}" in
        "Ubuntu"*|"Debian"*)
            echo -e "Try: ${YELLOW}sudo apt-get install $package${NC}"
            ;;
        "Fedora"*)
            echo -e "Try: ${YELLOW}sudo dnf install $package${NC}"
            ;;
        "CentOS"*|"Red Hat"*)
            echo -e "Try: ${YELLOW}sudo yum install $package${NC}"
            ;;
        "Arch"*)
            echo -e "Try: ${YELLOW}sudo pacman -S $package${NC}"
            ;;
        "macOS")
            echo -e "Try: ${YELLOW}brew install $package${NC}"
            ;;
        *)
            echo "Please check your distribution's package manager for installation instructions."
            ;;
    esac
}

# Check Node.js
echo -n "Checking Node.js... "
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Not found${NC}"
    echo "Please install Node.js v20 or later from https://nodejs.org"
    case "${DISTRO}" in
        "macOS")
            echo -e "Or install via Homebrew: ${YELLOW}brew install node@20${NC}"
            ;;
        *)
            echo "Or use nvm (Node Version Manager): https://github.com/nvm-sh/nvm"
            ;;
    esac
    exit 1
else
    NODE_VERSION=$(node -v | cut -d'v' -f2)
    if version_check "20.0.0" "$NODE_VERSION"; then
        echo -e "${GREEN}✅ v$NODE_VERSION${NC}"
    else
        echo -e "${RED}❌ v$NODE_VERSION found, but v20 or later is required${NC}"
        echo "Please upgrade Node.js from https://nodejs.org"
        exit 1
    fi
fi

# Check Bun
echo -n "Checking Bun... "
if ! command -v bun &> /dev/null; then
    echo -e "${RED}❌ Not found${NC}"
    echo "Would you like to install Bun now? (y/n)"
    read -r answer
    if [ "$answer" = "y" ]; then
        curl -fsSL https://bun.sh/install | bash
        # Source the updated profile to make bun available
        if [ -f "$HOME/.bashrc" ]; then
            source "$HOME/.bashrc"
        elif [ -f "$HOME/.zshrc" ]; then
            source "$HOME/.zshrc"
        fi
    else
        echo "Please install Bun manually from https://bun.sh"
        exit 1
    fi
else
    echo -e "${GREEN}✅ $(bun --version)${NC}"
fi

# Check Docker
echo -n "Checking Docker... "
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Not found${NC}"
    echo "Please install Docker from https://docs.docker.com/get-docker/"
    case "${DISTRO}" in
        "macOS")
            echo -e "You can install Docker Desktop from: ${YELLOW}https://www.docker.com/products/docker-desktop${NC}"
            ;;
        *)
            suggest_install "docker"
            ;;
    esac
    exit 1
else
    echo -e "${GREEN}✅ $(docker --version)${NC}"
fi

# Check Docker Compose
echo -n "Checking Docker Compose... "
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Not found${NC}"
    echo "Would you like to install Docker Compose now? (y/n)"
    read -r answer
    if [ "$answer" = "y" ]; then
        case "${DISTRO}" in
            "macOS")
                if command -v brew &> /dev/null; then
                    brew install docker-compose
                else
                    echo "Please install Docker Desktop from: ${YELLOW}https://www.docker.com/products/docker-desktop${NC}"
                    exit 1
                fi
                ;;
            "Ubuntu"*|"Debian"*)
                sudo apt-get update
                sudo apt-get install -y docker-compose
                ;;
            "Fedora"*)
                sudo dnf install -y docker-compose
                ;;
            "Manjaro"*|"Manjaro Linux"|"Arch Linux"|"Arch")
                echo "Installing Docker Compose for Manjaro/Arch..."
                sudo pacman -S --noconfirm docker-compose
                ;;
            *)
                echo "Unrecognized distribution: ${DISTRO}"
                echo "Please install Docker Compose manually from: ${YELLOW}https://docs.docker.com/compose/install/${NC}"
                exit 1
                ;;
        esac
        
        # Verify installation
        if command -v docker-compose &> /dev/null; then
            echo -e "${GREEN}✅ Docker Compose installed successfully${NC}"
        else
            echo -e "${RED}Failed to install Docker Compose${NC}"
            exit 1
        fi
    else
        echo "Docker Compose is required to continue. Please install it manually."
        exit 1
    fi
else
    echo -e "${GREEN}✅ $(docker-compose --version)${NC}"
fi

# Check AWS CLI
echo -n "Checking AWS CLI... "
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ Not found${NC}"
    echo "Would you like to install AWS CLI now? (y/n)"
    read -r answer
    if [ "$answer" = "y" ]; then
        case "${DISTRO}" in
            "macOS")
                if command -v brew &> /dev/null; then
                    brew install awscli
                else
                    echo "Installing AWS CLI via official installer..."
                    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
                    sudo installer -pkg AWSCLIV2.pkg -target /
                    rm AWSCLIV2.pkg
                fi
                ;;
            "Ubuntu"*|"Debian"*)
                sudo apt-get update
                sudo apt-get install -y awscli
                ;;
            "Fedora"*)
                sudo dnf install -y awscli
                ;;
            "Manjaro"*|"Manjaro Linux"|"Arch Linux"|"Arch")
                echo "Installing AWS CLI for Manjaro/Arch..."
                sudo pacman -S --noconfirm aws-cli
                ;;
            *)
                echo "Installing AWS CLI via official installer..."
                curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
                unzip -q awscliv2.zip
                sudo ./aws/install
                rm -rf aws awscliv2.zip
                ;;
        esac
        
        # Verify installation and exit if failed
        if command -v aws &> /dev/null; then
            echo -e "${GREEN}✅ AWS CLI installed successfully${NC}"
        else
            echo -e "${RED}Failed to install AWS CLI${NC}"
            exit 1
        fi
    else
        echo -e "${RED}AWS CLI is required to continue. Exiting.${NC}"
        exit 1
    fi
else
    # Test AWS CLI functionality
    if ! aws --version &> /dev/null; then
        echo -e "${RED}❌ AWS CLI is installed but not functioning properly${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ $(aws --version)${NC}"
fi

# Add a flag to prevent recursive execution
if [ -n "$SETUP_RUNNING" ]; then
    echo -e "${RED}Setup script is already running. Exiting to prevent infinite loop.${NC}"
    exit 1
fi
export SETUP_RUNNING=1

# Add this check after prerequisites and before starting services
echo -n "Checking Docker daemon... "
if ! docker info >/dev/null 2>&1; then
    echo -e "${RED}❌ Docker daemon is not running${NC}"
    echo -e "${RED}Please start Docker daemon first and try again${NC}"
    exit 1
else
    echo -e "${GREEN}✅${NC}"
fi

# Ensure Husky hooks are executable
echo -n "Ensuring Husky hooks are executable... "
if [ -d ".husky" ]; then
    chmod -R a+x .husky/*
    echo -e "${GREEN}✅ Done${NC}"
else
    echo -e "${YELLOW}⚠️  .husky directory not found. Skipping...${NC}"
fi

echo -e "\n${GREEN}✨ All prerequisites are satisfied!${NC}"

# Check and create .env file
echo -e "\n${YELLOW}📝 Setting up environment...${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file already exists${NC}"
else
    echo -n "Creating .env file from .env.example... "
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Done${NC}"
        echo -e "${YELLOW}⚠️  Please review .env file and adjust values if needed${NC}"
    else
        echo -e "${RED}❌ .env.example not found${NC}"
        # Create basic .env file
        cat > .env << EOL
# Database
DATABASE_URL=postgres://dev:dev@localhost:5432/ics_coupon_dev

# AWS/LocalStack
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1
AWS_ENDPOINT=http://localhost:4566

# Redis
REDIS_URL=redis://localhost:6379

# Environment
NODE_ENV=development
ENV=local
EOL
        echo -e "${GREEN}✅ Created default .env file${NC}"
    fi
fi

# Check if script is being sourced
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    # Start development environment
    echo -e "\n${YELLOW}🚀 Starting development environment...${NC}"
    echo "Starting Docker services..."
    if ! docker-compose -f docker-compose.dev.yaml up -d; then
        echo -e "${RED}❌ Failed to start Docker services${NC}"
        echo -e "${RED}Please check Docker configuration and try again${NC}"
        exit 1
    fi

    # Wait for PostgreSQL
    echo -n "Waiting for PostgreSQL to be ready..."
    until docker-compose -f docker-compose.dev.yaml exec -T postgres pg_isready 2>/dev/null; do
        echo -n "."
        sleep 1
    done
    echo -e " ${GREEN}✅${NC}"

    # Run migrations
    echo "Running database migrations..."
    bun run scripts/db/migrate.ts

    if [ "$START_SERVER" = true ]; then
        echo -e "\n${YELLOW}🚀 Starting development server...${NC}"
        echo "You can stop the server with Ctrl+C"
        echo "Logs will appear below:"
        exec bun run dev
    fi
fi

# Start the development server directly
if [ "$START_SERVER" = true ]; then
    exec bun run dev
fi