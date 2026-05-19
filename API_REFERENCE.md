# API Reference Guide

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend-url/api
```

## Authentication

All protected endpoints require:
```
Authorization: Bearer {token}
```

### Response Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

---

## Authentication Endpoints

### POST /auth/signup
Create new user account

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://i.pravatar.cc/150?img=1"
  }
}
```

---

### POST /auth/login
User login

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://i.pravatar.cc/150?img=1"
  }
}
```

---

### GET /auth/profile
Get current user profile

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://i.pravatar.cc/150?img=1",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### GET /auth/logout
Logout user

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Complaint Endpoints

### POST /complaints
Create new complaint

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "title": "Water Leakage in Main Street",
  "description": "There is a major water leakage from the main pipe...",
  "category": "Water Supply",
  "location": "Main Street, Downtown"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "title": "Water Leakage in Main Street",
    "description": "There is a major water leakage...",
    "category": "Water Supply",
    "location": "Main Street, Downtown",
    "status": "Pending",
    "priority": "High",
    "aiAnalysis": {
      "summary": "Customer reports water leakage...",
      "department": "Water Department",
      "autoResponse": "Your complaint has been registered...",
      "sentiment": "Negative",
      "confidence": 92,
      "urgencyLevel": "High"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### GET /complaints
Get all complaints (with filtering)

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (default: 1): Page number
- `limit` (default: 10): Items per page
- `status`: Filter by status (Pending, Under Review, In Progress, Resolved, Closed)
- `category`: Filter by category
- `priority`: Filter by priority (Low, Medium, High, Critical)
- `search`: Search in title, description, location
- `sortBy` (default: -createdAt): Sort field

**Example:**
```
GET /complaints?status=Pending&category=Water%20Supply&priority=High&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 150,
  "page": 1,
  "pages": 15,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "title": "Water Leakage",
      "status": "Pending",
      "priority": "High",
      "category": "Water Supply",
      "location": "Main Street",
      "aiAnalysis": { ... },
      "createdAt": "2024-01-15T10:30:00Z"
    },
    // ... more complaints
  ]
}
```

---

### GET /complaints/:id
Get single complaint

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "name": "John Doe",
    "email": "john@example.com",
    "title": "Water Leakage in Main Street",
    "description": "There is a major water leakage...",
    "category": "Water Supply",
    "location": "Main Street, Downtown",
    "status": "In Progress",
    "priority": "High",
    "aiAnalysis": {
      "summary": "...",
      "department": "Water Department",
      "autoResponse": "...",
      "sentiment": "Negative",
      "confidence": 92,
      "urgencyLevel": "High"
    },
    "activityLog": [
      {
        "action": "Created",
        "timestamp": "2024-01-15T10:30:00Z",
        "details": "Complaint registered"
      },
      {
        "action": "Status Updated",
        "timestamp": "2024-01-15T11:00:00Z",
        "details": "Status changed to In Progress"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

---

### PUT /complaints/:id
Update complaint (Admin only for status)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "status": "In Progress"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "status": "In Progress",
    "activityLog": [
      // ... includes new activity
      {
        "action": "Status Updated",
        "timestamp": "2024-01-15T11:00:00Z",
        "details": "Status changed to In Progress"
      }
    ],
    // ... other fields
  }
}
```

---

### DELETE /complaints/:id
Delete complaint

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Complaint deleted successfully"
}
```

---

### GET /complaints/stats/overview
Get complaint statistics

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "pending": 45,
    "resolved": 70,
    "inProgress": 32,
    "categoryStats": [
      { "_id": "Water Supply", "count": 45 },
      { "_id": "Electricity", "count": 32 },
      { "_id": "Sanitation", "count": 28 },
      // ... more categories
    ],
    "priorityStats": [
      { "_id": "Low", "count": 30 },
      { "_id": "Medium", "count": 60 },
      { "_id": "High", "count": 40 },
      { "_id": "Critical", "count": 20 }
    ]
  }
}
```

---

## AI Endpoints

### POST /ai/analyze
Analyze complaint with AI

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Water Leakage in Main Street",
  "description": "There is a major water leakage from the main supply pipe...",
  "category": "Water Supply"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "urgencyLevel": "High",
    "department": "Water Department",
    "summary": "Customer reports significant water leakage from main supply pipe...",
    "autoResponse": "Thank you for your complaint. Your case has been assigned to the Water Department...",
    "sentiment": "Negative",
    "confidence": 92
  }
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Please provide an email",
      "param": "email"
    }
  ]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Complaint not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Rate Limiting

- 100 requests per hour per IP
- Resets at the top of each hour

---

## Best Practices

1. **Always include Authorization header** for protected routes
2. **Validate input** before sending
3. **Handle errors** gracefully
4. **Use pagination** for large datasets
5. **Cache responses** when possible
6. **Implement retry logic** for failed requests
7. **Log important actions**
8. **Monitor API usage**

---

## Testing with cURL

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "123456"
  }'

# Get Profile
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create Complaint
curl -X POST http://localhost:5000/api/complaints \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "title": "Water Leakage",
    "description": "There is water leakage...",
    "category": "Water Supply",
    "location": "Main Street"
  }'
```

---

## Testing with Postman

1. Import the API collection
2. Set `{{base_url}}` variable to `http://localhost:5000/api`
3. Set `{{token}}` after login
4. Use pre-defined requests

---

For more details, see [README.md](./README.md)
