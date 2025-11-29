# Use the official Node.js image as the base image
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Chromium and fonts for headless browser
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Let Puppeteer know where Chromium is and not to download its own
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

#Install chrome
RUN npx puppeteer install chrome
# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
# EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]