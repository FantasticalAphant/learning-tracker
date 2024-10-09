# Frontend Dockerfile
FROM node:18
WORKDIR /app

# Copy and build the frontend
COPY package*.json ./
COPY ../old-frontend ./
RUN npm install
RUN npm run build

# Serve with a simple static server
RUN npm install -g serve
CMD ["serve", "-s", "dist"]

EXPOSE 3000