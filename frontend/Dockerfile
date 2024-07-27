# # Use the official Node.js image
# FROM node:18

# # Set the working directory
# WORKDIR /app

# # Install dependencies
# COPY package.json package-lock.json /app/
# RUN npm install

# # Copy the project files into the container
# COPY . /app/

# # Build the React app
# RUN npm run build

# # Serve the app using a lightweight server
# RUN npm install -g serve
# CMD ["serve", "-s", "build"]

# # Expose the port the app runs on
# EXPOSE 5000

# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy the project files into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]