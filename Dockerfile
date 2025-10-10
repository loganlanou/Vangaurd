# Build stage
FROM golang:1.23-bullseye AS builder

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Set working directory
WORKDIR /build

# Copy entire vanguard-live directory
COPY vanguard-live/ ./

# Install Go dependencies
RUN go mod download

# Install Node dependencies
RUN npm install

# Install Go tools
RUN go install github.com/a-h/templ/cmd/templ@latest
RUN go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest

# Generate code and build (use full path to installed tools)
RUN /go/bin/sqlc generate
RUN /go/bin/templ generate
RUN npm run build:css
RUN mkdir -p bin
RUN go build -o bin/server cmd/server/main.go

# Runtime stage
FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y ca-certificates sqlite3 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy binary and required files from builder
COPY --from=builder /build/bin/server .
COPY --from=builder /build/web ./web
COPY --from=builder /build/migrations ./migrations

# Set environment
ENV PORT=8080
ENV DATABASE_URL=/app/data/vanguard.db

# Create data directory
RUN mkdir -p /app/data

EXPOSE 8080

CMD ["./server"]
