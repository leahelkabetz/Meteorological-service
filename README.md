# Meteorological Station System

## Project Overview
This project is a full-stack application designed to manage and display weather data collected by meteorological stations. It includes:

1. **C# Backend (ASP.NET Core)** – Connects to a SQL database, handles business logic, and serves data via API.
2. **React Frontend** – Sends API requests and displays stations and measurements in a clear, styled UI.
3. **JSON Files Handling** – Daily measurement files are parsed and processed for display.

The system is useful for environmental monitoring, data analysis, or as a base for IoT data dashboards.

---

## Technologies Used
- **Backend Language**: C#
- **Frontend Library**: React
- **Database**: SQL Server
- **Styling**: Material UI
- **Libraries**: `Entity Framework Core`, `Axios`, `System.IO`, `System.Text.Json`
- **Design Patterns**: Layered architecture (DAL, BL, API), REST API, file parsing

---

## System Structure
- Stations are stored in the database with: Station ID, Address, City, and Supervisor Name.
- Each station saves a **daily JSON file** named using the format `StationID__dd.MM.yyyy.json`.
- Each file contains multiple records with: Measurement Time, Temperature, Rainfall (mm), Wind Speed (km/h).

---

## How to Run
1. Make sure the SQL Server is running and the connection string is configured.
2. Place measurement JSON files inside the configured data directory.
3. Run the backend (`dotnet run`) – it loads the DB and parses the files.
4. Start the frontend (`npm start`) – React sends requests and renders the data.
5. Use the interface to view station info and summaries (by station/date).
6. Easily extend to include new filters, upload functionality, or persist daily data into the DB.

---

## Highlights
- **Clean Separation of Concerns** – DAL handles SQL, BL processes logic, API communicates with the frontend.
- **Interactive UI** – Responsive React interface using Material UI and chart/table components.
- **Modular Design** – Easily add more features like date filtering, user roles, authentication, etc.



