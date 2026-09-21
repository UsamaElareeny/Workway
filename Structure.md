backend/
├── prisma/
│ ├── schema.prisma # Single source of truth for Postgres tables & FTS indexes (GIN/tsvector)
│ ├── migrations/ # Generated SQL migration history
│ └── seed.ts # Optional: seed initial jobs/companies
│
├── src/
│ ├── server.ts # Entry point: DB connect, BullMQ queues init, app.listen()
│ ├── app.ts # Express setup: middleware, routes, pino, error handlers, /api-docs mount
│ │
│ ├── config/
│ │ ├── env.ts # Validated environment variables (via Zod)
│ │ ├── prisma.ts # Exported singleton instance of PrismaClient
│ │ ├── cloudinary.ts # Configured Cloudinary SDK instance
│ │ ├── resend.ts # Configured Resend instance
│ │ ├── redis.ts # Shared ioredis connection for BullMQ
│ │ ├── logger.ts # Pino logger setup
│ │ └── swagger.ts # Swagger / OpenAPI specification setup & Swagger UI middleware
│ │
│ ├── docs/ # Shared Swagger/OpenAPI schemas & definitions
│ │ ├── openapi.ts # OpenAPI registry, info, tags, and security definitions (Clerk bearer/cookie)
│ │ └── schemas/ # Reusable API schemas (ErrorResponse, PaginationMeta, etc.)
│ │
│ ├── middleware/
│ │ ├── auth.ts # Clerk Express middleware wrapper (cookie/bearer auth)
│ │ ├── validate.ts # Zod validation middleware (req.body, req.query, req.params)
│ │ ├── upload.ts # Multer memory-storage configuration
│ │ └── error-handler.ts # Global error handler logging via Pino
│ │
│ ├── queues/ # BullMQ Queues & Workers
│ │ ├── email.queue.ts # Queue definition for email sending
│ │ └── workers/
│ │ └── email.worker.ts # Worker pulling jobs to call Resend
│ │
│ ├── modules/ # Feature-based API modules
│ │ ├── jobs/
│ │ │ ├── jobs.routes.ts # Express router (GET /api/jobs, POST /api/jobs)
│ │ │ ├── jobs.controller.ts # Route handlers
│ │ │ ├── jobs.service.ts # Business logic & Postgres Full-Text Search (tsvector/GIN or pg_trgm)
│ │ │ ├── jobs.schema.ts # Zod + OpenAPI schemas for query, params, body & response
│ │ │ ├── jobs.swagger.ts # Route documentation/specs (if not in schema or routes)
│ │ │ └── jobs.test.ts # Vitest tests
│ │ │
│ │ ├── profile/
│ │ │ ├── profile.routes.ts
│ │ │ ├── profile.controller.ts
│ │ │ ├── profile.service.ts # Prisma queries for experiences, education, skills
│ │ │ └── profile.schema.ts
│ │ │
│ │ ├── uploads/
│ │ │ ├── uploads.routes.ts # Endpoints for resume & profile avatar uploads
│ │ │ ├── uploads.controller.ts
│ │ │ └── uploads.service.ts # Streams file buffers to Cloudinary
│ │ │
│ │ ├── companies/
│ │ ├── reviews/
│ │ ├── employer/
│ │ └── saved-jobs/
│ │
│ └── shared/
│ ├── types/ # Express req augmentation, shared interfaces
│ └── utils/ # Pagination, custom AppError classes
│
├── .env
├── .env.example
├── docker-compose.yml # Postgres + Redis (for BullMQ)
├── tsconfig.json
└── package.json
