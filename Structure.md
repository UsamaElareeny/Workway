server/
├── prisma/
│ ├── schema.prisma # Single source of truth for your Postgres DB tables
│ ├── migrations/ # Generated SQL migration history
│ └── seed.ts # Optional: seed initial jobs/companies
│
├── src/
│ ├── server.ts # Entry point: DB connect, queues init, app.listen()
│ ├── app.ts # Express setup: middleware, routes, pino, error handlers
│ │
│ ├── config/
│ │ ├── env.ts # Validated environment variables (via Zod)
│ │ ├── prisma.ts # Exported singleton instance of PrismaClient
│ │ ├── elasticsearch.ts # Connected @elastic/elasticsearch client
│ │ ├── cloudinary.ts # Configured Cloudinary SDK instance
│ │ ├── resend.ts # Configured Resend instance
│ │ ├── redis.ts # Shared ioredis connection for BullMQ
│ │ ├── logger.ts # Pino logger setup
│ │ └── swagger.ts # Swagger-jsdoc definitions & configuration
│ │
│ ├── middleware/
│ │ ├── auth.ts # Clerk Express middleware wrapper (cookie auth)
│ │ ├── validate.ts # Zod validation middleware (req.body, req.query, req.params)
│ │ ├── upload.ts # Multer memory-storage configuration
│ │ └── error-handler.ts # Global error handler logging via Pino
│ │
│ ├── queues/ # BullMQ Queues & Workers
│ │ ├── email.queue.ts # Queue definition for email sending
│ │ ├── search.queue.ts # Queue definition for Elasticsearch reindexing
│ │ └── workers/
│ │ ├── email.worker.ts # Worker pulling jobs to call Resend
│ │ └── search.worker.ts # Worker indexing updated jobs into Elasticsearch
│ │
│ ├── modules/ # Feature-based API modules
│ │ ├── jobs/
│ │ │ ├── jobs.routes.ts # Express router (GET /api/jobs, POST /api/jobs)
│ │ │ ├── jobs.controller.ts # Route handlers
│ │ │ ├── jobs.service.ts # Reads from Prisma or Elasticsearch
│ │ │ ├── jobs.schema.ts # Zod schemas for query/body validation
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
├── docker-compose.yml # Postgres + Elasticsearch + Redis (for BullMQ)
├── tsconfig.json
└── package.json
