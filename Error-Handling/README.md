# Module Summary

## Types of Errors & Handling Errors

- You can differentiate between different types of errors, technical errors (wich are thrown) and "expected errors" (e.g. invalid user input)
- Error handling can be done with custom if-checks, try-catch, then()-cathc() etc
- You can user the Express error handling middleware to handle all unhandled errors

## Errors & Status Code

- When returning responses, it cam make sens to also set an appropriate HTTP status code, this lets the browser know what went wrong
- You got success (2xx), redirect (3xx), client-side errors (4xx) and server-side errors (5xx) codes to choose from:
  - 2(xx) (Success):
    - 200: Operation succeeded
    - 201: Success, resource created
  - 3xx (Redirect):
    - 301: Moved permanently
  - 4xx (Client-side error):
    - 401: Not authenticated
    - 403: Not authorized
    - 422: Invalid input
  - 5xx (Server-side error):
    - 500: Server-side error
- Setting status codes does NOT mean that the response is incomplete or the app crashed!

## Useful Resources & Links

- [Error Handling in Express.js - Official Docs](https://expressjs.com/en/guide/error-handling.html)
- [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [HTTP Status Codes Glossary](https://www.webfx.com/web-development/glossary/http-status-codes/)
