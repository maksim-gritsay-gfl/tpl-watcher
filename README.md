# TPL-Watcher

**TPL-Watcher** is a NestJS standalone application that automatically monitors the Toronto Public Library (TPL) ePASS system for new offers. It uses Puppeteer to automate browser interactions, checks for available tickets/offers (specifically for the aquarium attraction), and sends email notifications when new offers are detected.

## Description

The application:
1. Automates browser interactions using Puppeteer to log into the TPL ePASS portal
2. Monitors API responses to detect when new offers become available
3. Checks specifically for aquarium offers (attractionID: 18)
4. Sends email notifications via Nodemailer when offers are found
5. Runs continuously, checking every 10 minutes

### Key Components

- **App Service**: Main orchestrator that runs the watcher loop
- **TPL Checker Service**: Handles browser automation and offer detection using Puppeteer
- **Mailer Service**: Manages email notifications using Nodemailer with Handlebars templates
- **Configuration**: Uses `@nestjs/config` for environment-based configuration

### Technology Stack

- **NestJS** (v11.1.9) - Framework
- **Puppeteer** (v24.31.0) - Browser automation
- **Nodemailer** - Email sending
- **Handlebars** - Email template rendering
- **TypeScript** - Type safety

## Online demo

Demo: -

Frontend (React, Next.js): -

## Features

- [x] Nest Standalone app
- [x] Watch for available tickets/offers for TPL users
- [x] Send email on new offer
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config))
- [x] Docker
- [x] CLI
- [x] Automated browser automation with Puppeteer
- [x] Continuous monitoring (checks every 10 minutes)
- [x] Email notifications with Handlebars templates

## Configuration

The application requires the following environment variables:

### TPL Credentials
- `TPL_USER` - Your TPL library card number
- `TPL_PIN` - Your TPL PIN

### Email Configuration
- `MAIL_HOST` - SMTP server host
- `MAIL_PORT` - SMTP server port
- `MAIL_USER` - SMTP username
- `MAIL_PASSWORD` - SMTP password
- `MAIL_DEFAULT_EMAIL` - Default sender email
- `MAIL_DEFAULT_NAME` - Default sender name
- `MAIL_IGNORE_TLS` - Ignore TLS (boolean)
- `MAIL_SECURE` - Use secure connection (boolean)
- `MAIL_REQUIRE_TLS` - Require TLS (boolean)

### Mail Main Configuration
- `MAIL_MAIN_HOST` - Main SMTP server host
- `MAIL_MAIN_PORT` - Main SMTP server port
- `MAIL_MAIN_USER` - Main SMTP username
- `MAIL_MAIN_PASSWORD` - Main SMTP password

### App Configuration
- `APP_NAME` - Application name (optional, defaults to 'app')
- `NODE_ENV` - Environment (development/production/test, defaults to 'development')

## Init

1. Install dependencies: `npm i`
2. Copy `.env.example` to `.env` and set all required parameters
3. Run watcher: `npm run start`

### Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:prod` - Start production build
- `npm run build` - Build the application
- `npm run lint` - Run ESLint

## Docker install

1. Build the Docker image:
   ```bash
   docker build -t tpl-watcher .
   ```

2. Run the container:
   ```bash
   docker run --env-file .env tpl-watcher
   ```

**Note**: The Dockerfile includes Chromium and all necessary dependencies for Puppeteer to run in a headless environment.

## Usage

The application runs as a CLI tool that continuously monitors for offers. When an offer is detected, it automatically sends an email notification to the configured recipient address. The application checks for offers every 10 minutes and will continue running until manually stopped.

---

**Note**: This is a monitoring tool that requires valid TPL credentials and email configuration to function properly.


