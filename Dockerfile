# Production-only Dockerfile
# NOTE: Use docker-build.sh script which handles dependency installation
# and building before running docker build for best experience.
# 
# For fully self-contained builds, see Dockerfile.multi-stage 
# (currently has npm compatibility issues in some Docker environments)
FROM nginx:alpine

# Copy pre-built application to nginx
COPY dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]