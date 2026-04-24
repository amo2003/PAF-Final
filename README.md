# Smart Campus Operations Hub

A full-stack campus management system built with React (frontend) and Spring Boot (backend).
Manages facility bookings, incident tickets, resource catalogues, and user authentication across 4 modules.

---

## Modules

### Module 1 — Resource Catalogue
- Browse all campus facilities and equipment (lecture halls, labs, meeting rooms)
- Add, edit, and delete resources with full form validation
- Filter by type, capacity, location, and status
- Mark resources as Active, Out of Service, or Under Maintenance
- Real-time stats overview (total, active, capacity)
- Resource detail modal with full information

### Module 2 — Booking Management
- Book campus resources with date, time, purpose, and attendee count
- Auto-fills user ID and email from logged-in session
- Conflict detection — prevents double-booking same resource/time slot
- My Bookings page filtered by logged-in user automatically
- QR code check-in for approved bookings
- Admin panel to approve, reject, or cancel bookings
- Analytics dashboard — status breakdown, peak hours, top resources, daily trends
- Admin dashboard with live stats across all modules

### Module 3 — Incident Ticketing
- Create maintenance and incident tickets with category, priority, and location
- Resource/Location dropdown linked to live M1 resource catalogue
- Ticket list with status filters (Open, In Progress, Resolved, Closed, Rejected)
- Ticket detail page — assign technician, resolve, reject, add comments, upload attachments
- My Tickets page — personal ticket tracking with a pop-up detail modal
- Status and priority colour-coded cards

### Module 4 — Auth & Notifications
- Google OAuth 2.0 login for regular users
- Admin login via credentials (hardcoded, no backend required)
- Role-based access — USER, ADMIN, TECHNICIAN
- Protected routes — unauthenticated users see a styled block page
- Notifications page — merged backend + local activity events
- Activity tracking: login, logout, booking submitted, cancelled, deleted
- User management — admins can change user roles
- Profile page with user details and stats

---

## Tech Stack

**Frontend:** React 18, React Router v6, Recharts, Axios, QRCode.react  
**Backend:** Spring Boot, Spring Security, OAuth2, JPA/Hibernate  
**Database:** MySQL  
**Auth:** Google OAuth 2.0

---

## Getting Started

### Backend
```bash
cd backend/backend
./mvnw spring-boot:run
