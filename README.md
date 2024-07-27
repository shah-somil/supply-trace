# Company Location Tracker

## Overview

This application consists of a backend API built with Django and a frontend user interface developed using React. The goal is to provide a platform for tracking and managing company locations. The frontend displays a list of companies, allows users to view detailed information, and includes map integration using Leaflet.

## Tech Stack

### Backend
- **Framework**: Django
- **Database**: PostgreSQL
- **API**: Django REST Framework
- **Deployment**: Gunicorn

### Frontend
- **Library**: React
- **State Management**: React hooks
- **Map Integration**: Leaflet
Note: tried using Maps but due to there being less support for react and issues with displaying multiple markers, I had to move to Leaflet.

## Models

### Company Model
- `company_id`: Integer, unique identifier for the company
- `name`: String, name of the company
- `address`: String, address of the company
- `latitude`: Float, latitude coordinate
- `longitude`: Float, longitude coordinate

### Location Model
- `location_id`: Integer, unique identifier for the location
- `company`: ForeignKey to Company, link to the related company
- `name`: String, name of the location
- `address`: String, address of the location
- `latitude`: Float, latitude coordinate
- `longitude`: Float, longitude coordinate

## API Endpoints

### Companies
- **GET** `/api/companies/`: Fetch a list of companies
- **GET** `/api/companies/<id>/`: Fetch details of a specific company

## Frontend Pages

### Company List Page
Displays a list of companies with a search bar and filter options. Users can view the details of each company by clicking on it.

### Company Details Page
Provides detailed information about a selected company, including a map view with the company's location(s). You can click on the company location to change the location in the map dynamically.  

## Error Handling and Edge Cases

### Backend (Django)

1. **API Error Handling**
   - **Validation Errors**: Utilized Django REST Framework’s built-in validation mechanisms. When invalid data is sent to the API, Django returns a 400 Bad Request status code along with a detailed error message specifying what went wrong. Example: If required fields are missing in a POST request, the API responds with validation error messages.
   - **Not Found**: Non-existent endpoints or resources return a 404 Not Found status code. Django’s `Http404` exception is used in views to handle cases where a resource is not found. Example: Accessing `/api/companies/999/` where `999` is an invalid company ID will return a 404 error.
   - **Server Errors**: Unhandled exceptions are caught by custom error handling middleware, returning a 500 Internal Server Error with a user-friendly message. Example: Unexpected server errors during data processing are logged and a generic error message is sent to the client.

2. **Database Errors**
   - **Integrity Errors**: Handled by catching `IntegrityError` exceptions. When trying to insert duplicate entries or violate constraints, the API returns a 400 Bad Request status with a descriptive error message. Example: Attempting to create a company with a duplicate unique field results in an error response.
   - **Connection Issues**: Database connection issues are managed with retry logic or fallback mechanisms to ensure the application remains operational. Example: The application will retry connecting to the database if an initial connection attempt fails.

3. **Logging and Monitoring**
   - **Logging**: Configured Django’s logging framework to capture errors and important events. Logs are stored in a file and can be monitored through a logging service for real-time insights. Example: Errors during data fetching are logged with details for debugging.
   - **Monitoring**: Integrated monitoring tools to track application health and detect issues in real-time. Example: Alerts are configured for critical errors or performance issues.

### Frontend (React)

1. **Data Fetching Errors**
   - **Network Errors**: Implemented error handling in Axios requests to catch network errors and display user-friendly error messages. Example: If the server is unreachable, an error message is shown informing the user of the issue.
   - **Invalid Responses**: Added error handling for cases where API responses are not in the expected format. A generic error message is displayed, and details are logged to the console for debugging. Example: If the API response is malformed, an error message is shown on the Company List page.

2. **User Input Errors**
   - **Form Validation**: Included client-side validation for forms to provide immediate feedback on invalid inputs. Example: In the search bar, invalid or empty search queries prompt validation messages before submission.

3. **State Management Errors**
   - **State Synchronization**: Implemented error handling to manage inconsistencies in state updates. For example, error boundaries are used to catch JavaScript errors in components and display fallback UI.

4. **UI/UX Issues**
   - **Loading States**: Added loading indicators during data fetching to inform users that data is being processed. Example: A spinner or progress bar is shown while fetching company data.
   - **Empty States**: Handled scenarios where no data is available by showing informative messages or placeholders. Example: If no companies are found, a message indicating "No companies available" is displayed.

### Edge Cases

1. **Data Availability**
   - **Empty Data**: Implemented handling for cases where no companies or locations are available. Example: Displayed a message or placeholder when the company list is empty.

2. **Large Data Sets**
   - **Performance**: Optimized performance for large data sets using pagination and lazy loading. Example: The Company List page loads data in chunks rather than all at once to improve performance.

3. **Incorrect URLs**
   - **Handling Invalid URLs**: Implemented routing and error handling to manage incorrect or non-existent URLs within the application. Example: Navigating to a non-existent company detail page shows a 404 page or error message.

4. **Browser Compatibility**
   - **Cross-Browser Issues**: Tested the application across different browsers to ensure compatibility and consistent behavior. Example: Verified that the application works correctly on Chrome, Firefox, and Safari.

## Running the Application with Docker

1. **Ensure Docker and Docker Compose are installed** on your machine. You can download and install Docker from [Docker's official website](https://www.docker.com/products/docker-desktop).

2. **Navigate to the project directory** where the `docker-compose.yml` file is located.

3. **Build and start the Docker containers** by running:
   docker-compose up --build

## API Documentation
The project uses Swagger UI for API documentation. To view the interactive documentation for the API:
http://localhost:8000/api/swagger/

For ease of testing, I have also attached the Postman Collection :)


Developers Details:
Somil Shah
shah.som@northeastern.edu 
nuid: 002807855