# 🚗 Smart Parking Management System

A Full Stack Smart Parking Management System developed using React.js, Spring Boot, and MySQL. The system allows users to park and exit vehicles, calculates parking fees automatically, and provides an Admin Dashboard for monitoring parking slots and revenue.

---

## 📌 Features

### User Features
- View available parking slots
- Park vehicles into available slots
- Exit vehicles from occupied slots
- Automatic parking fee calculation
- Real-time slot availability tracking

### Admin Features
- Secure Admin Login
- View total parking revenue
- Monitor occupied and available slots
- View parking slot details
- Reset parking slots

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Java
- Spring Boot
- REST APIs

### Database
- MySQL

### Tools
- Git
- GitHub
- Maven

---

## 🏗️ Architecture

Frontend (React.js)
↓
REST APIs
↓
Spring Boot Backend
↓
MySQL Database

---

## 📂 Project Structure

```text
smart-parking-management-system
│
├── frontend
│   ├── public
│   ├── src
│   └── package.json
│
├── backend
│   ├── controller
│   ├── model
│   ├── repository
│   ├── service
│   ├── resources
│   └── pom.xml
│
└── README.md
```

---

## 🚀 How to Run

### Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on:

```text
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on:

```text
http://localhost:3000
```

---

## 🔗 API Endpoints

### User APIs

```http
GET /api/slots
```

Get all parking slots.

```http
POST /api/park/{id}
```

Park vehicle in selected slot.

```http
POST /api/exit/{id}
```

Exit vehicle and calculate parking fee.

### Admin APIs

```http
GET /api/admin/revenue
```

Get total revenue.

```http
POST /api/admin/reset
```

Reset all parking slots.

---

## 🎯 OOP Concepts Used

### Encapsulation
- Data members are encapsulated inside model classes.

### Abstraction
- Business logic is handled inside service classes.

### Inheritance
- Spring Boot framework classes utilize inheritance internally.

### Polymorphism
- Method overriding and dependency injection are used throughout the project.

### Dependency Injection
- Implemented using Spring's constructor injection.

---

## 📊 Key Functionalities

- Real-time parking slot management
- Dynamic occupancy tracking
- Parking fee calculation based on vehicle type
- Revenue monitoring through Admin Dashboard
- RESTful API architecture
- Persistent data storage using MySQL

---

## 🔮 Future Enhancements

- Docker Deployment
- Kafka Integration
- Elasticsearch Integration
- Vehicle Number Tracking
- QR Code Based Entry/Exit
- Email Notifications
- AWS Cloud Deployment
- Parking Analytics Dashboard

---

## 👨‍💻 Author

**Harshith V N**

B.Tech – Computer Science & Engineering  
University Visvesvaraya College of Engineering (UVCE)

---

## ⭐ Project Highlights

- Full Stack Web Application
- OOP-Based Design
- REST API Architecture
- Admin Dashboard
- Revenue Tracking System
- MySQL Database Integration
- Placement-Oriented Project
