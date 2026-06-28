# FleetPulse Backend (Scaffold)

This is a starter backend for a Fleet Management frontend (FleetPulse). It uses:
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication

## Quickstart
1. copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. `npm install`
3. `npm run dev`

## Endpoints
- `POST /api/auth/register` - register user
- `POST /api/auth/login` - login
- `GET /api/vehicles` - list vehicles
- `POST /api/vehicles` - create vehicle
- `GET /api/trips` - list trips
- `POST /api/trips` - create trip
- `GET /api/maintenance` - list maintenance records
- `POST /api/maintenance` - create maintenance record

## Notes
- This scaffold aims to be a complete starting point; adapt models & routes to match your frontend payloads.
- If you want me to tailor the models exactly to your frontend files, upload the frontend directory and I'll adapt the fields & endpoints.
