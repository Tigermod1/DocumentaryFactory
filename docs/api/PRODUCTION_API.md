# Production API

## Base URL

/api/production

---

# Endpoints

## Start Production

POST

/api/production/start

Body

```json
{
  "projectId": "demo-project",
  "projectName": "My Documentary",
  "topic": "Roman Empire",
  "market": "US",
  "style": "Documentary",
  "language": "English",
  "provider": "OpenAI",
  "script": "...",
  "options": {
    "generateImages": true,
    "generateVideos": true,
    "renderVideo": true,
    "generateThumbnail": true,
    "generateSEO": true,
    "publish": false
  }
}
```

---

## Get Job

GET

/api/production/:id

---

## Queue

GET

/api/production/queue

---

## Cancel

DELETE

/api/production/:id

---

# Responses

## Success

```json
{
  "success": true,
  "job": {}
}
```

## Error

```json
{
  "success": false,
  "message": "..."
}
```

---

# Status

Production API V2

Stable