# Module Summary

## REST Concepts & Ideas

- REST APIs are all about data, no UI logic is exchanged
- REST APIs are normal Node servers which expose different endpoints (HTTP method + path) for clients to send requests to
- JSON is the common data format that is used both for requests and responses
- REST APIs are decoupled from the clients that use them

## REST APIs - The Core Principles

- **Uniform Interface**: Clearly defined API endpoints (method + path) with clearly defined request + response data structure.
- **Stateless Interactions**: Server and client dont store any connection history, every request is handled seperately.
- **Cacheable**: Servers may sets caching headers to allow the client to cache responses.
- **Client - Server**: Server and client are seperated, client is not concerned with persistent data storage.
- **Layered System**: Server may forward requests to other APIs.
- **Code on Demand**: Executable code may be transferred from server to client.

## Requests & Responses

- Attach data in JSON format and let the other end know by setting the "Content-Type" header
- CORS errors occur when using an API that does not set CORS headers

## Useful Resources & Links

- [Example: Build a Complete RESTful API from Scratch](https://academind.com/learn/node-js/building-a-restful-api-with/)
