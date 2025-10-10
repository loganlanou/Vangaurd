# Build stage
FROM golang:1.22-alpine AS builder

# Install build dependencies
RUN apk add --no-cache git nodejs npm

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

# Generate code and build
RUN sqlc generate
RUN templ generate
RUN npm run build:css
RUN mkdir -p bin
RUN go build -o bin/server cmd/server/main.go

# Runtime stage
FROM alpine:latest

RUN apk add --no-cache sqlite ca-certificates

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
