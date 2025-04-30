# Carental-Back

> Backend for Carental — a Bolttech Barcelona MVP demonstrating our car-rental booking motor.

---

## Description

This is the **Carental-Back** API for our greenfield car-rental booking MVP.\
It supports:

1. **Availability** look-up (given a time slot, returns all available cars, total booking price, and average daily rate).
2. **Booking** creation (one booking per user per period; driving license must remain valid throughout).

---

## Tech Stack & Dependencies

### Framework & Core

- [`@nestjs/common`](https://nestjs.com/)[, ](https://nestjs.com/)[`@nestjs/core`](https://nestjs.com/)[, ](https://nestjs.com/)[`@nestjs/platform-express`](https://nestjs.com/)[, ](https://nestjs.com/)[`@nestjs/config`](https://nestjs.com/) — NestJS v11
- `reflect-metadata`, `rxjs`

### Database & ORM

- [`typeorm`](https://typeorm.io/) v0.3
- `@nestjs/typeorm`
- [`pg`](https://www.npmjs.com/package/pg) (PostgreSQL driver)

### Validation & Date Handling

- [`zod`](https://github.com/colinhacks/zod) — schema validation
- [`luxon`](https://moment.github.io/luxon/) + `@types/luxon`

## Getting Started

### Installation

```bash
# Clone repo
git clone https://github.com/your-org/carental-back.git
cd carental-back

# Start services via Docker Compose
docker-compose up
```

---

## Database Migrations

All TypeORM CLI commands are wrapped in npm scripts:

```bash
# Run pending migrations
npm run migration:run
```

---

## API Endpoints

### Availability

```
GET /cars/availability?from=<ISO8601>&to=<ISO8601>
```

- **Query Parameters**
  - from – booking start datetime
  - to – booking end datetime
- **Response**
  ```json
  [
    {
      "brand": "Toyota",
      "model": "Yaris",
      "stock": 3,
      "dailyPrice": 152.34,
      "bookingPrice": 50.78
    },
    …
  ]
  ```

### Booking

```
POST /bookings
Content-Type: application/json
```

- **Body**
  ```json
  {
    "userId": "uuid",
    "carId": "uuid",
    "start": "2025-07-01T10:00:00Z",
    "end": "2025-07-05T10:00:00Z",
    "drivingLicenseExpiry": "2025-08-01"
  }
  ```

---

## Project Structure & Patterns

- **Hexagonal / DDD**: clear separation of domain, application, infrastructure layers.
- **SOLID** and dependency injection (via Nest).
- **Validation** with Zod schemas in controllers.
- **Date handling** centralized in Luxon-based utilities.

```
src/
├── application/
│   ├── ports/              # interface definitions for use cases
│   ├── usecases/           # business logic implementations
│   └── utils/              # shared application utilities
├── domain/
│   ├── models/             # domain entities and value objects
│   └── types/              # domain-specific types and enums
├── infrastructure/
│   ├── controllers/        # NestJS HTTP handlers
│   ├── database/
│   │   ├── datasource.ts   # TypeORM DataSource configuration
│   │   ├── entities/       # TypeORM entity definitions
│   │   └── migrations/     # migration scripts
│   ├── repositories/       # TypeORM repository implementations
│   └── utils/              # infra-level utilities (e.g., date utils)
├── app.module.ts           # root NestJS module
├── cars.module.ts          # feature module for cars
├── seasons.module.ts       # feature module for seasons
├── utils.module.ts         # shared NestJS module for utils
└── main.ts                 # bootstrap file
```

---

