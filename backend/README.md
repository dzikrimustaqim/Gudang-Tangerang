# Warehouse Management System - Backend

A premium warehouse management system built with Go, Gin, and PostgreSQL.

## Features

- **Item Management**: Track inventory items with detailed information
- **Transaction System**: Record all item movements and transfers
- **OPD Management**: Manage organizational units
- **Category Management**: Organize items by categories
- **Dashboard Analytics**: Real-time insights and reporting
- **RESTful API**: Clean and well-documented API endpoints

## Tech Stack

- **Go 1.21+**: Backend language
- **Gin**: HTTP web framework
- **GORM**: ORM library
- **PostgreSQL**: Database
- **UUID**: Unique identifiers
- **CORS**: Cross-origin resource sharing

## Prerequisites

- Go 1.21 or higher
- PostgreSQL 12 or higher
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd warehouse-system/backend
   ```

2. **Install dependencies**
   ```bash
   go mod download
   ```

3. **Setup database**
   ```bash
   # Create PostgreSQL database
   createdb warehouse_db
   
   # Or using PostgreSQL CLI
   psql -U postgres -c "CREATE DATABASE warehouse_db;"
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env file with your database credentials
   ```

5. **Run the application**
   ```bash
   go run main.go
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://username:password@localhost/warehouse_db?sslmode=disable` |
| `PORT` | Server port | `8080` |
| `GIN_MODE` | Gin mode (debug/release) | `debug` |
| `JWT_SECRET` | JWT signing secret | `your-jwt-secret-key` |

## API Endpoints

### Dashboard
- `GET /api/v1/dashboard/summary` - Get dashboard summary
- `GET /api/v1/dashboard/recent-transactions` - Get recent transactions

### Items
- `GET /api/v1/items` - List items with pagination and filters
- `POST /api/v1/items` - Create new item
- `GET /api/v1/items/:id` - Get item by ID
- `PUT /api/v1/items/:id` - Update item
- `DELETE /api/v1/items/:id` - Delete item
- `GET /api/v1/items/search` - Search items

### Transactions
- `GET /api/v1/transactions` - List transactions
- `POST /api/v1/transactions` - Create transaction
- `GET /api/v1/transactions/:id` - Get transaction by ID
- `PUT /api/v1/transactions/:id` - Update transaction
- `DELETE /api/v1/transactions/:id` - Delete transaction

### OPDs
- `GET /api/v1/opds` - List OPDs
- `POST /api/v1/opds` - Create OPD
- `PUT /api/v1/opds/:id` - Update OPD
- `DELETE /api/v1/opds/:id` - Delete OPD

### Categories
- `GET /api/v1/categories` - List categories
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

## Database Schema

The system uses the following main entities:

- **Items**: Inventory items with serial numbers, categories, and locations
- **Transactions**: Movement records between warehouse and OPDs
- **OPDs**: Organizational units that can hold items
- **Categories**: Item classification system

## Development

```bash
# Run with hot reload (install air first: go install github.com/cosmtrek/air@latest)
air

# Run tests
go test ./...

# Build for production
go build -o bin/warehouse-system main.go

# Run migrations manually (auto-runs on startup)
# Migrations are handled automatically by GORM AutoMigrate
```

## Production Deployment

1. Set environment variables:
   ```bash
   export GIN_MODE=release
   export DATABASE_URL=your-production-db-url
   ```

2. Build the application:
   ```bash
   go build -o warehouse-system main.go
   ```

3. Run:
   ```bash
   ./warehouse-system
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.