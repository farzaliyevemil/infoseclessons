---
id: http-methods-and-status-codes
title: HTTP Methods and Status Codes
description: A foundation guide to HTTP request methods, response status-code classes, common codes, and security testing meaning.
slug: /networking/http-methods-and-status-codes
sidebar_position: 12
status: reference
last_reviewed: 2026-09-20
keywords:
  - http
  - http methods
  - status codes
  - get
  - post
  - put
  - patch
  - web security
difficulty: foundation

tags:
  - networking
  - beginner
---

# HTTP Methods and Status Codes

HTTP is the application-layer protocol used by browsers, APIs, and web services. A client sends a **request**; the server returns a **response**. The request method describes the intended operation, while the response status code summarises what happened.

## Request structure

```http
GET /products/42 HTTP/1.1
Host: shop.example
Accept: application/json
```

An HTTP request normally contains a method, path, protocol version, headers, and sometimes a body. A response contains a status line, headers, and sometimes a body:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":42,"name":"Keyboard"}
```

HTTPS is HTTP protected by TLS. TLS protects the connection, but it does not make an insecure application or an over-privileged account safe.

## The main HTTP methods

| Method | Purpose | Safe or idempotent? | Typical security question |
|---|---|---|---|
| **GET** | Retrieve a resource | Safe and idempotent | Does it expose data without authorisation? |
| **POST** | Create a resource or trigger an action | Neither by default | Is CSRF protection and input validation present? |
| **PUT** | Replace a resource completely | Idempotent | Can a user replace another user's object? |
| **PATCH** | Modify part of a resource | Not necessarily idempotent | Are restricted fields protected from mass assignment? |
| **DELETE** | Remove a resource | Idempotent by definition, implementation varies | Is deletion authorised and recoverable? |
| **HEAD** | Return headers like GET without a response body | Safe and idempotent | Does it reveal useful metadata? |
| **OPTIONS** | Describe supported methods or capabilities | Safe and idempotent | Is CORS configured too broadly? |
| **CONNECT** | Establish a tunnel, commonly through a proxy | Not normally used by a basic API | Can the proxy be abused as an open tunnel? |
| **TRACE** | Echo a request for diagnostics | Safe, but commonly disabled | Could it assist cross-site tracing or leak headers? |

**Safe** means the method should not change server state. **Idempotent** means repeating the same request should have the same intended result as sending it once. These are protocol semantics, not a guarantee that an implementation is harmless.

## Status-code classes

| Class | Meaning | Example |
|---|---|---|
| **1xx** | Informational; the request is being processed | `100 Continue` |
| **2xx** | The request succeeded | `200 OK` |
| **3xx** | Redirection or cached representation | `301 Moved Permanently` |
| **4xx** | The client request is invalid or unauthorised | `404 Not Found` |
| **5xx** | The server or an upstream service failed | `500 Internal Server Error` |

## Codes worth memorising

| Code | Meaning | Practical interpretation |
|---|---|---|
| `200 OK` | Successful request | Resource returned or action completed |
| `201 Created` | Resource created | Common after a successful POST |
| `202 Accepted` | Accepted for later processing | Job may still be running |
| `204 No Content` | Success without a response body | Common after DELETE or an update |
| `301 Moved Permanently` | Permanent redirect | Update links and caches carefully |
| `302 Found` | Temporary redirect in practice | Check where the client is sent |
| `304 Not Modified` | Cached version is still valid | No new body was sent |
| `400 Bad Request` | Malformed or invalid request | Syntax, validation, or parsing problem |
| `401 Unauthorized` | Authentication is missing or invalid | The client must authenticate; it does not mean “authenticated but forbidden” |
| `403 Forbidden` | Server understood but refuses access | Authentication may be valid but permission is insufficient |
| `404 Not Found` | Resource not found or intentionally hidden | APIs may use it to avoid confirming object existence |
| `405 Method Not Allowed` | Method is not supported for that resource | The `Allow` header may list permitted methods |
| `409 Conflict` | Request conflicts with current state | Duplicate resource or version conflict |
| `429 Too Many Requests` | Rate limit exceeded | Retry after the interval specified by the server |
| `500 Internal Server Error` | Unexpected server failure | Do not expose stack traces to clients |
| `502 Bad Gateway` | Proxy received a bad upstream response | Check the reverse proxy and backend |
| `503 Service Unavailable` | Server temporarily cannot handle the request | Maintenance, overload, or dependency failure |
| `504 Gateway Timeout` | Upstream service did not respond in time | Investigate latency and dependency health |

## Security testing view

HTTP knowledge helps both attackers and defenders understand an application:

- Test authorisation on every object, not only whether the endpoint returns `200`.
- Treat `401`, `403`, and `404` as different signals; do not assume a status code alone proves a control works.
- Check whether sensitive data appears in URLs, logs, referrer headers, or error messages.
- Validate method restrictions: an endpoint that blocks `GET` may still mishandle `PUT`, `PATCH`, or `DELETE`.
- Ensure errors are useful to operators but do not reveal stack traces, secrets, framework versions, or internal paths.
- Configure CORS deliberately; `Access-Control-Allow-Origin: *` is not suitable for every authenticated application.
- Rate-limit authentication and expensive endpoints, and log unusual method or status-code patterns.

## Quick troubleshooting

When a request fails, check the method and path first, then authentication, authorisation, request headers, body validation, and the server or upstream logs. A `404` can mean a wrong path; a `405` usually means the path exists but the method is not accepted. A `502` or `504` usually points beyond the client to a proxy or backend dependency.

## Exam summary

- Method = intended operation; status code = result category.
- `401` means authentication is needed or failed; `403` means access is refused.
- `PUT` generally replaces a resource; `PATCH` partially modifies it.
- `GET`, `HEAD`, and `OPTIONS` are safe by design; implementations can still leak information.
- `2xx` success, `3xx` redirect/cache, `4xx` client-side problem, `5xx` server-side problem.
