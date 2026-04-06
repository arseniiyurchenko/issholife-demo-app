# Fetch Backend API Docs

Fetch Swagger/OpenAPI documentation from the backend and provide it as context.

## Instructions

1. Make a GET request to `http://localhost:3007/docs/json`
2. Parse the JSON response — this is an OpenAPI/Swagger specification
3. Present a structured summary of the API:
   - List all available endpoints grouped by tags/controllers
   - For each endpoint show: HTTP method, path, summary, request body schema, response schema
   - Highlight required parameters and fields
4. Keep the full spec available as context for follow-up questions about the API
