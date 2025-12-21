FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose service port
EXPOSE 3001

# Start the service
CMD ["npm", "run", "dev"]
