# Redis User Manual

This manual explains how to view Redis data used by the microservices application.

## 1. Redis Information

Redis is running locally with these settings:

```text
Host: localhost
Port: 6379
URL: redis://localhost:6379
```

The Windows Redis installation is located at:

```text
C:\Program Files\Redis
```

The Redis command-line tool is:

```text
C:\Program Files\Redis\redis-cli.exe
```

## 2. Check Whether Redis Is Running

Open PowerShell and run:

```powershell
Get-Service -Name Redis
```

Expected result:

```text
Status  : Running
```

You can also check the Redis port:

```powershell
Get-NetTCPConnection -State Listen -LocalPort 6379
```

## 3. Open Redis CLI

Run:

```powershell
& "C:\Program Files\Redis\redis-cli.exe"
```

You will see a Redis prompt:

```text
127.0.0.1:6379>
```

All commands in the next sections are entered at this prompt.

## 4. Test the Connection

Command:

```redis
PING
```

Expected result:

```text
PONG
```

## 5. List Redis Keys

Use `SCAN` to list keys safely:

```redis
SCAN 0
```

Example result:

```text
1) "0"
2) 1) "cases:list"
   2) "evidence:list"
```

The first value is the next scan cursor. If it is not `0`, run `SCAN` again with
that cursor until the cursor becomes `0`.

PowerShell shortcut:

```powershell
& "C:\Program Files\Redis\redis-cli.exe" SCAN 0
```

Avoid using `KEYS *` on a large production Redis database because it can block
Redis while scanning every key.

## 6. View the Case Cache

The Case service stores the case list with this key:

```redis
GET cases:list
```

The result is JSON data containing the cached cases.

Check how long the key will remain:

```redis
TTL cases:list
```

The value is in seconds. A new cache entry has a one-hour TTL, which is about
`3600` seconds.

Possible TTL results:

```text
3600 or another positive number = key exists and will expire automatically
-1 = key exists without an expiration time
-2 = key does not exist
```

## 7. View the Evidence Cache

View all cached evidence:

```redis
GET evidence:list
```

View evidence cached for one case:

```redis
GET evidence:list:1
```

Replace `1` with the required case ID.

Check expiration:

```redis
TTL evidence:list
TTL evidence:list:1
```

## 8. Create Cache Data

The application creates cache data automatically when these endpoints are
requested:

```http
GET http://localhost:4000/api/cases
GET http://localhost:4000/api/evidence
```

After requesting those URLs, list the keys again:

```redis
SCAN 0
```

Then inspect the values:

```redis
GET cases:list
GET evidence:list
```

## 9. Understand Cache Behavior

For `GET /api/cases` and `GET /api/evidence`:

1. The service checks Redis first.
2. If the key exists, Redis returns the cached response.
3. If the key does not exist, the service queries PostgreSQL.
4. The service stores the database result in Redis for one hour.
5. The response is returned to the client.

When data changes:

- Creating a case clears `cases:list`.
- Uploading evidence clears `evidence:list`.
- Uploading evidence also clears `cases:list` so case-related data stays fresh.

## 10. View User Session Keys

The User service creates a Redis session only when a request writes data to
`req.session`. Create a demonstration session by opening this URL:

```http
GET http://localhost:3000/api/session
```

The response contains a `sessionId` and the session cookie. Keep the same
cookie if you want to access the same session from Postman.

The User service uses keys with this prefix:

```redis
SCAN 0 MATCH "user-session:*"
```
```key
GET user-session:iv5QbmFVgbcb9aOSadHnPwRWL_hP4uQU         
````

To inspect one session, use its complete key:

```redis
GET user-session:<session-id>
```

To delete the current session:

```http
DELETE http://localhost:3000/api/session
```

Session IDs are created by the application. Do not manually change session
values unless you are only testing locally.

## 11. Clear One Cache Key

To remove only the case cache:

```redis
DEL cases:list
```

To remove only the evidence cache:

```redis
DEL evidence:list
```

To remove filtered evidence for case 1:

```redis
DEL evidence:list:1
```

The application will recreate the cache the next time the related endpoint is
called.

## 12. Clear All Local Redis Data

Warning: this removes all keys from the currently selected Redis database.
Use this only for local development:

```redis
FLUSHDB
```

Confirm that the database is empty:

```redis
DBSIZE
```

Expected result after `FLUSHDB`:

```text
(integer) 0
```

## 13. Useful Redis Commands

```redis
DBSIZE
INFO server
INFO memory
INFO stats
QUIT
```

Descriptions:

- `DBSIZE` shows the number of keys.
- `INFO server` shows Redis server information.
- `INFO memory` shows memory usage.
- `INFO stats` shows Redis operation statistics.
- `QUIT` closes the Redis CLI.

## 14. Troubleshooting

### Redis connection refused

Check the Windows service:

```powershell
Get-Service -Name Redis
```

Start it if necessary:

```powershell
Start-Service -Name Redis
```

Test it again:

```powershell
& "C:\Program Files\Redis\redis-cli.exe" ping
```

### No cache keys appear

Restart the Case and Evidence services after the Redis code has been added.
Then request:

```http
GET http://localhost:4000/api/cases
GET http://localhost:4000/api/evidence
```

Finally run:

```redis
SCAN 0
```

### The TTL is `-2`

The key does not exist. Call the corresponding API endpoint to create the
cache again.

### The TTL is `-1`

The key exists but has no expiration. For local testing, delete it and let the
application create it again:

```redis
DEL cases:list
DEL evidence:list
```

## 15. Quick Daily Checklist

```powershell
Get-Service -Name Redis
& "C:\Program Files\Redis\redis-cli.exe" ping
& "C:\Program Files\Redis\redis-cli.exe" SCAN 0
& "C:\Program Files\Redis\redis-cli.exe" TTL cases:list
& "C:\Program Files\Redis\redis-cli.exe" TTL evidence:list
```

Expected connection response:

```text
PONG
```
