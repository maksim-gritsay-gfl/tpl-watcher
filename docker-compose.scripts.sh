#!/bin/bash

# Docker Compose helper script for TPL Watcher

case "$1" in
  build)
    echo "Building Docker image..."
    docker-compose build
    ;;
  up)
    echo "Starting container..."
    docker-compose up -d
    ;;
  down)
    echo "Stopping container..."
    docker-compose down
    ;;
  restart)
    echo "Restarting container..."
    docker-compose restart
    ;;
  logs)
    echo "Showing logs..."
    docker-compose logs -f
    ;;
  rebuild)
    echo "Rebuilding and restarting container..."
    docker-compose up -d --build
    ;;
  stop)
    echo "Stopping container..."
    docker-compose stop
    ;;
  ps)
    echo "Container status:"
    docker-compose ps
    ;;
  *)
    echo "Usage: $0 {build|up|down|restart|logs|rebuild|stop|ps}"
    echo ""
    echo "Commands:"
    echo "  build    - Build the Docker image"
    echo "  up       - Start the container"
    echo "  down     - Stop and remove the container"
    echo "  restart  - Restart the container"
    echo "  logs     - Show container logs (follow mode)"
    echo "  rebuild  - Rebuild image and restart container"
    echo "  stop     - Stop the container"
    echo "  ps       - Show container status"
    exit 1
    ;;
esac

exit 0

