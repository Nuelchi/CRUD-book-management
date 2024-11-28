# CRUD Hotel Management

A robust hotel management system built using **Node.js**, **Express**, **MongoDB**, and **React**, designed to handle essential CRUD (Create, Read, Update, Delete) operations for hotel-related data management.

---

## Features

- **Authentication**: Secure user authentication with JWT.
- **Role Management**: Implements role-based access control.
- **CRUD Operations**: Manage Bookss, lendings, and user information.
- **Database Integration**: Uses MongoDB for data persistence.
- **Middleware**: Token validation for protected routes.

---

## Prerequisites

To run this project, ensure you have the following installed:

1. [Node.js](https://nodejs.org/)
2. [MongoDB](https://www.mongodb.com/)
3. npm or yarn for dependency management

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone  https://github.com/Nuelchi/CRUD-book-management.git

2.	**Navigate to the project directory**:
    ```bash
    cd CRUD-book-management./Hotel-app

3. **Install dependencies:**    
    ```bash
    npm init --yes
    ```bash
    npm install express mongodb mongoose nodemon 

4. **Create a .env file in the root directory and configure the following variables**:
    SECRET_STRING=your_jwt_secret
    MONGO_URL=your_mongo_db_connection_string

5. **Start the development server**
    npx nodmon




## API Endpoints and Routes

**Route middleware**
. /api/books
. /api/lend
. /api/user

**User Authentication Endpoints**
•	POST /register - Register a new user
•	POST /login - Login a user
•	POST /reset-password - Send a reset password link or reset password


**Hotel Management Endpoints**

•	GET /books- Get all books (protected route)
•	GET /rooms/:id - Get details of a specific book
•	POST /books - Add a new Book (admin-only)
•	PUT /books/:id - Update hotel room details (admin-only)
•	

**Protected Routes**

•	Any route marked with protected route requires a valid JWT token for access. This is ensured by the protectPath middleware.


**Role-based Access Control**
•	Admin-only routes (like hotel creation, update, and deletion) are protected by the restriction middleware, which checks the user role.


## CONTRIBUTING
Contributions are welcome! Follow these steps:
1.	Fork the repository.
2.	Create a new branch:
    ```bash
    git checkout -b feature-name
3. Commit your changes
    ```bash
    git commit -m "Add feature-name"
4. Push the branch 
    ```bash
    git push origin feature-name
5. Open a pull request


## FOLDER STRUCTURE
CRUD-hotel-management./Hotel-app/
── controllers/         # Route handlers
── models/              # Mongoose schemas
── routes/              # API routes
── middleware/          # Middleware functions
── .env.example         # Environment variables template
── index.js            # Entry point
── README.md            # Project documentation


## CONTACT
For queries or support, feel free to reach out:
	•	Author: Nuelchi
    .   email: edubem80@gmail
	•	GitHub Repository: CRUD Book Management.