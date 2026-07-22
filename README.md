# 🚗 Smart Parking Management System

A full-stack Smart Parking Management System developed using **React.js, Spring Boot, MySQL, and JWT Authentication**. The system enables secure vehicle parking and exit management, automatic parking fee calculation, PDF receipt generation, parking session tracking, and an Admin Dashboard for monitoring parking operations and revenue.

---

# 📌 Features

## User Features

- User Registration & Login using JWT Authentication
- Secure access to parking services
- View available and occupied parking slots
- Park vehicles by entering vehicle and owner details
- Automatic parking fee calculation during vehicle exit
- Generate downloadable PDF parking receipts
- Real-time parking slot availability updates

## Admin Features

- Secure Admin Login
- View parking slot status
- Monitor occupied and available slots
- View total parking revenue
- Reset parking slots
- Manage parking operations through Admin Dashboard

---

# 🛠 Tech Stack

## Frontend

- React.js
- Axios
- CSS
- jsPDF

## Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs

## Database

- MySQL

## Tools

- Git
- GitHub
- Maven

---

# 🏗 Architecture

```
React.js Frontend
        │
        ▼
 RESTful APIs
        │
        ▼
Spring Boot Backend
        │
        ▼
 JWT Authentication
        │
        ▼
 MySQL Database
```

---

# 📂 Project Structure

```text
smart-parking-management-system
│
├── frontend
│   ├── public
│   ├── src
│   └── package.json
│
├── backend
│   ├── config
│   ├── controller
│   ├── dto
│   ├── model
│   ├── repository
│   ├── security
│   ├── service
│   ├── resources
│   └── pom.xml
│
└── README.md
```

---

# 🚀 How to Run

## Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on

```
http://localhost:3000
```

---

# 🔗 REST API Endpoints

## Authentication

```http
POST /auth/register
```

Register a new user.

```http
POST /auth/login
```

Authenticate user and generate JWT token.

---

## Parking APIs

```http
GET /api/slots
```

Retrieve all parking slots.

```http
POST /api/park/{id}
```

Park a vehicle.

```http
POST /api/exit/{id}
```

Exit vehicle and generate parking bill.

---

## Admin APIs

```http
GET /api/admin/revenue
```

Retrieve total parking revenue.

```http
POST /api/admin/reset
```

Reset all parking slots.

---

# 🔐 Security

- JWT Authentication
- Spring Security
- Role-Based Access Control
- Protected REST APIs
- Secure Login & Registration

---

# 📊 Key Functionalities

- Parking Slot Management
- Vehicle Entry & Exit
- Parking Session Tracking
- Vehicle & Owner Information Management
- Automatic Parking Fee Calculation
- PDF Receipt Generation
- Revenue Monitoring
- Admin Dashboard
- Real-Time Slot Availability
- RESTful API Architecture
- Persistent MySQL Database Storage

---

# 🧩 OOP Concepts Used

### Encapsulation

Data is encapsulated inside entity/model classes.

### Abstraction

Business logic is separated into service classes.

### Inheritance

Spring Security and Spring Boot framework components leverage inheritance.

### Polymorphism

Method overriding and interface-based programming are used throughout the application.

### Dependency Injection

Implemented using Spring Boot's constructor-based dependency injection.

---

# 📈 Project Highlights

- Full Stack Web Application
- Object-Oriented Design
- JWT Authentication
- Spring Security Integration
- RESTful API Architecture
- Parking Session Management
- Automatic Parking Fee Calculation
- PDF Receipt Generation
- Admin Dashboard
- Revenue Tracking
- MySQL Database Integration
- Modular Layered Architecture

---

# 🚀 Future Enhancements

- QR Code Based Vehicle Entry & Exit
- Online Parking Slot Reservation
- UPI / Payment Gateway Integration
- Email & SMS Notifications
- Vehicle Search & Parking History
- Live Parking Analytics Dashboard
- Cloud Deployment (AWS)

---

# 👨‍💻 Author

**Harshith V N**

B.Tech – Computer Science & Engineering

University Visvesvaraya College of Engineering (UVCE)

---
