# Mini App

> A full-stack web application to search and display GitHub repositories. Built with React (Vite) for the frontend and Node.js/Express for the backend.

## Live Demo

- **Frontend:** [mini-app-kohl-five.vercel.app](https://mini-app-kohl-five.vercel.app/)
- **Backend:** [mini-app-0jok.onrender.com](https://mini-app-0jok.onrender.com)

---

## Features

- Search GitHub repositories by username
- View repository details (name, description, stars, forks, language, etc.)
- Responsive UI built with React and Vite
- RESTful API backend with Express
- MongoDB integration for data persistence

---

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express, MongoDB
- **API:** GitHub REST API

---

## Folder Structure


```
mini-app/
├── client/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── public/
│   │   └── vite.svg
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── api/
│       │   └── api.js
│       ├── assets/
│       │   └── react.svg
│       └── components/
│           ├── RepoItem.jsx
│           ├── RepoList.jsx
│           └── SearchForm.jsx
├── server/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── repos.controller.js
│       ├── models/
│       │   └── repo.model.js
│       ├── routes/
│       │   └── repos.routes.js
│       └── services/
│           └── github.service.js
```

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)

### Clone the Repository

```bash
git clone https://github.com/RSarvjyoti/mini-app.git
cd mini-app
```

---

### 1. Backend Setup

```bash
cd server
npm install
```

- Create a `.env` file (see `.env.example`) and set your MongoDB URI and GitHub token.
- Start the server:

```bash
npm start
```

The backend runs on `http://localhost:5000` by default.

---

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

---

## Backend API Endpoints

Base URL: `/api/repos`

### `GET /api/repos/fetch?username=<github_username>`
Fetch repositories from GitHub for a given username and store/update them in the database.
- **Query Params:** `username` (required)
- **Response:** `{ message, repos: [...] }`

### `GET /api/repos`
List repositories stored in the database.
- **Query Params:**
	- `page` (default: 1)
	- `limit` (default: 10, max: 50)
	- `owner_login` (optional, filter by owner)
- **Response:** `{ page, limit, total, totalPages, items: [...] }`

### `GET /api/repos/:id`
Get a single repository by its database ID.
- **Response:** Repository object or 404 if not found

### `POST /api/repos`
Add a new repository to the database.
- **Body:** Repository object (must include `githubId`)
- **Response:** Created repository object

### `PUT /api/repos/:id`
Update an existing repository by its database ID.
- **Body:** Fields to update
- **Response:** Updated repository object

### `DELETE /api/repos/:id`
Delete a repository by its database ID.
- **Response:** `{ message: 'Deleted' }`

---

## Environment Variables

See `server/.env.example` for required variables:
- `MONGO_URL` - MongoDB connection string
- `GITHUB_TOKEN` - (optional) GitHub API token for higher rate limits

---

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---