# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

# Make the startup script executable
RUN chmod +x startup.sh

# Make port available to the world outside this container
EXPOSE $PORT

# Run the startup script when the container launches
CMD ["./startup.sh"]
