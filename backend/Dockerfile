FROM node:22.2.0

WORKDIR /usr/src/app

# Copy the rest of the application files
COPY . .

RUN npm install
# Build the NestJS application
RUN npm run build
RUN chmod +x /usr/src/app/docker-entrypoint.sh
# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["/usr/src/app/docker-entrypoint.sh"]