# BharatFD_Backend_Assignment
# FAQ Management System

## Overview
Multilingual FAQ management system that supports rich-text formatting (WYSIWYG). It stores questions and answers in multiple languages using MongoDB, automatically translating them upon creation. The system also implements Redis caching for optimized performance.

## Features
- **Multilingual Support** 
- **WYSIWYG Support** 
- **Admin Authentication - Restricts update and deletion actions to authorized admins**
- **Redis Caching** 
- **RESTful API**
- **Unit Testing** 

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Caching:** Redis
- **Testing:** Mocha, Chai
- **Translation API:** Google Translate API

---

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- MongoDB
- Redis

### Setup Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Vineet369/BharatFD_Backend_Assignment.git
   cd BharatFD_Backend_Assignment
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env`:
   ```sh
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/faq_db
   PROJECT_ID=your_google_cloud_projectId
   ```
4. Start MongoDB and Redis servers.
5. Run the application:
   ```sh
   npm start
   ```

---

## API Endpoints

### Public Endpoints
#### 1. Get FAQs (Cached with Redis)
```http
GET /api/faq/getFaqs?lang=<language_code>
```
- Retrieves all FAQs in the specified language.
- If `lang` is not provided, defaults to English (`en`).
- Implements Redis caching.

### Admin-Only Endpoints
#### 2. Add a New FAQ (Auto-Translates and Stores in DB)
```http
POST /api/addFaqs
```
**Request Body:**
```json
{
  "faqText": "What is a transaction?",
  "answerText": "A transaction is a unit of work that interacts with a database.",
  "token": "To authenticate the admin, token is necessary"
}
```
- Requires admin authentication.
- Auto-translates and stores translations in MongoDB.

#### 3. Update an FAQ
```http
POST /api/faq/update/:faqId
```
**Request Body:**
```json
{
  "newFaqText": "What is the full form of FD?",
  "newAnswerText": "Fixed Deposite.",
  "token": "To authenticate the admin, token is necessary"
}
```
- Requires admin authentication.
- Updates an existing FAQ.

#### 4. Delete an FAQ
```http
POST /api/faq/delete/:faqId
```
**Request Body:**
```json
{
  "token": "To authenticate the admin, token is necessary"
}
```
- Requires admin authentication.
- Removes an FAQ from the database.

---

## Caching with Redis
- FAQs are stored in Redis using the pattern `faqs_<language_code>`.
- If Redis cache is empty, data is fetched from MongoDB and stored in cache.
- Cached data expires after a set period to ensure freshness.

---

## Unit Testing
- **Framework:** Mocha, Chai
- **Test Coverage:**
  - Model pre-save hooks
  - API endpoints
  - Redis caching logic

### Running Tests
```sh
npm test
```

---
