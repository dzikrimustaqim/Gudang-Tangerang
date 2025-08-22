# Premium Warehouse Management System

A comprehensive warehouse management system built with modern technologies, featuring a Go backend with PostgreSQL and a premium React frontend with TypeScript and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Inventory Management**: Complete item tracking with serial numbers, categories, brands, and models
- **Location Tracking**: Real-time location management between warehouse and organizational units (OPD)
- **Transaction System**: Comprehensive movement tracking (Warehouse ↔ OPD, OPD ↔ OPD)
- **Master Data Management**: Manage OPDs and item categories
- **Dashboard Analytics**: Real-time insights and reporting
- **Quick Search**: Instant item lookup by serial number

### Premium UI/UX
- **Modern Design**: Premium interface with Shadcn-UI components
- **Dark/Light Mode**: Full theme support
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live data synchronization
- **Professional Layout**: Clean, intuitive dashboard interface

### Technical Excellence
- **Type Safety**: Full TypeScript implementation
- **RESTful API**: Clean, well-documented endpoints
- **Database Optimization**: Proper indexing and relationships
- **Error Handling**: Comprehensive error management
- **Security**: Input validation and sanitization

## 🏗️ Architecture

### Backend (Go + PostgreSQL)
```
backend/
├── main.go                     # Application entry point
├── internal/
│   ├── config/                 # Configuration management
│   ├── handlers/              # HTTP request handlers
│   ├── models/                # Data models and DTOs
│   ├── repositories/          # Data access layer
│   └── services/              # Business logic layer
└── pkg/
    └── database/              # Database connection and migrations
```

### Frontend (React + TypeScript)
```
src/
├── components/
│   ├── dashboard/             # Dashboard components
│   └── ui/                    # Shadcn-UI components
├── lib/                       # Utilities and API client
├── pages/                     # Page components
└── types/                     # TypeScript definitions
```

## 🛠️ Tech Stack

### Backend
- **Go 1.21+**: High-performance backend language
- **Gin**: Fast HTTP web framework
- **GORM**: Powerful ORM with auto-migrations
- **PostgreSQL**: Robust relational database
- **UUID**: Unique identifier generation
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn-UI**: Premium component library
- **TanStack Query**: Data synchronization
- **React Router**: Client-side routing

## 🚦 Quick Start

### Prerequisites
- Go 1.21+
- Node.js 18+
- PostgreSQL 12+
- pnpm (recommended) or npm

### Backend Setup
```bash
cd backend

# Install dependencies
go mod download

# Create database
createdb warehouse_db

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run the server
go run main.go
```

### Frontend Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Database Configuration
Update your `.env` file in the backend directory:
```env
DATABASE_URL=postgres://username:password@localhost/warehouse_db?sslmode=disable
PORT=8080
GIN_MODE=debug
JWT_SECRET=your-secret-key
```

## 📊 Database Schema

### Core Entities
- **Items**: Inventory items with detailed tracking information
- **Transactions**: Movement records with full audit trail
- **OPDs**: Organizational units with location management
- **Categories**: Item classification system

### Key Features
- UUID primary keys for all entities
- Soft deletes for data integrity
- Comprehensive indexing for performance
- Row-level security ready
- Audit timestamps on all records

## 🎯 Usage

### Dashboard Overview
- Real-time inventory statistics
- Condition analysis (Good/Partial/Broken)
- Category and OPD distribution
- Recent transaction history

### Stock Management
- Filter by category, location, and condition
- Quick serial number lookup
- Comprehensive item details
- Transaction history per item

### Inventory Operations
- Add new items with detailed information
- Update item conditions and locations
- Bulk operations support
- Advanced search capabilities

### Transaction Management
- Create movement records
- Support for all transfer types
- Edit and delete capabilities
- Comprehensive audit trail

### Master Data
- Manage organizational units (OPDs)
- Category management
- Active/inactive status tracking
- Item count per entity

## 🔧 Development

### Backend Development
```bash
# Install air for hot reload
go install github.com/cosmtrek/air@latest

# Run with hot reload
air

# Run tests
go test ./...

# Build for production
go build -o warehouse-system main.go
```

### Frontend Development
```bash
# Start development server
pnpm run dev

# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Build for production
pnpm run build
```

## 🚀 Production Deployment

### Backend
```bash
# Set production environment
export GIN_MODE=release
export DATABASE_URL=your-production-db-url

# Build and run
go build -o warehouse-system main.go
./warehouse-system
```

### Frontend
```bash
# Build for production
pnpm run build

# Serve static files (dist folder)
# Deploy to your preferred hosting service
```

## 📈 Performance

- **Backend**: Sub-millisecond response times
- **Database**: Optimized queries with proper indexing
- **Frontend**: Lazy loading and code splitting
- **Caching**: Efficient data caching strategies
- **Bundling**: Optimized production builds

## 🔒 Security

- Input validation and sanitization
- SQL injection prevention via ORM
- CORS configuration
- Environment-based configuration
- Secure UUID generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern best practices
- Inspired by enterprise warehouse management needs
- Premium UI/UX design principles
- Community-driven development approach

---

**Built with ❤️ using Go, React, and modern web technologies**