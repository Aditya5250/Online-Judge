# Use the official Node.js 22 Alpine image
FROM node:22-alpine

# Install Docker CLI so the backend can spawn judge containers
RUN apk add --no-cache docker-cli

# Application directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Backend port
EXPOSE 5000

# Start server
CMD ["npm", "start"]