# Use Ubuntu as base image
FROM ubuntu:latest

# Install required packages
RUN apt-get update && \
    apt-get install -y curl gnupg lsb-release && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js and npm using Nodesource
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Install MongoDB
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
    gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg && \
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/8.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /opt/app

# Clone your repository
ADD https://github.com/muhammadtalha766/MERN-Product-Store.git .

# Install npm packages
RUN npm install 

# Install npm packages in frontend
WORKDIR /opt/app/frontend
RUN npm install

# Build the frontend
RUN npm run build

# Set back to main working directory
WORKDIR /opt/app

# Expose MongoDB and Node.js ports
EXPOSE 27017
EXPOSE 5000

# Create data directories for MongoDB
RUN mkdir -p /data/db && chown -R mongodb:mongodb /data/db

CMD ["sh", "-c", "mongod --bind_ip_all --dbpath /data/db --logpath /var/log/mongodb.log --fork && npm run start"]