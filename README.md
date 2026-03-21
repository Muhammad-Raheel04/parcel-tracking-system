# Parcel Tracking System

A full-stack parcel tracking web application that lets users track shipments in real-time across multiple couriers worldwide, powered by the [TrackingMore API](https://www.trackingmore.com/).

**Live Demo:** [parceltrackersystem.netlify.app](https://parceltrackersystem.netlify.app)  
**Backend API:** [parcel-tracking-system-production.up.railway.app](https://parcel-tracking-system-production.up.railway.app)  
**Repository:** [github.com/Muhammad-Raheel04/parcel-tracking-system](https://github.com/Muhammad-Raheel04/parcel-tracking-system)

---

## Demo

[![Parcel Tracking System Demo](https://res.cloudinary.com/dxdywv9xl/video/upload/v1774096726/parcel_tracking_system_omylga.mp4)]

---

## Features

- **Real-time parcel tracking** — enter any tracking number and get live status updates
- **Multi-courier support** — hundreds of couriers worldwide (Pakistan Post, DHL, FedEx, UPS, and more)
- **Full tracking history** — visual timeline of every checkpoint your parcel has passed through
- **Location & event details** — see location, timestamp, and status for each event
- **Fast & responsive** — works seamlessly on mobile, tablet, and desktop
- **Secure** — API key is kept server-side only; the frontend never exposes credentials

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| TrackingMore API | Shipment data provider |
| dotenv | Environment variable management |
| CORS | Cross-origin request handling |

### Deployment
| Service | Purpose |
|---|---|
| Netlify | Frontend hosting |
| Railway | Backend hosting |

---

## Project Structure

```
parcel-tracking-system/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── trackingApi.js        # Thin HTTP client (no API keys)
│   │   ├── hooks/
│   │   │   ├── useTracking.js        # Tracking state — owned by App
│   │   │   └── useCouriers.js        # Couriers state — owned by TrackingForm
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── TrackingForm.jsx      # Form + courier select
│   │   │   ├── TrackingResult.jsx    # Summary card
│   │   │   └── TrackingHistory.jsx   # Timeline of events
│   │   ├── App.jsx                   # Minimal — layout + wiring only
│   │   └── main.jsx
│   └── .env                          # VITE_API_BASE_URL
│
└── backend/
    ├── controllers/
    │   ├── couriersController.js     # GET /api/v1/couriers
    │   └── trackingController.js    # POST /api/v1/trackings
    ├── routes/
    │   ├── couriersRoute.js
    │   └── trackingRoute.js
    ├── server.js
    └── .env                          # TRACKING_API_KEY, PORT, FRONTEND_URL
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- A free [TrackingMore API key](https://www.trackingmore.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Muhammad-Raheel04/parcel-tracking-system.git
cd parcel-tracking-system
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
TRACKING_API_KEY=your_trackingmore_api_key_here
FRONTEND_URL=http://localhost:5173
```

Start the server:

```bash
node server.js
```

Backend runs at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

App runs at `http://localhost:5173`.

---

## 🔌 API Endpoints

Base URL: `https://parcel-tracking-system-production.up.railway.app`

### Get All Couriers

```
GET /api/v1/couriers
```

**Response:**
```json
{
  "success": true,
  "message": "successfully fetched list of couriers",
  "data": [
    { "courier_code": "pakistan-post", "courier_name": "Pakistan Post" },
    { "courier_code": "dhl", "courier_name": "DHL" }
  ]
}
```

---

### Track a Parcel

```
POST /api/v1/trackings
```

**Request Body:**
```json
{
  "tracking_number": "EA123456789PK",
  "courier_code": "pakistan-post"
}
```

**Response:**
```json
{
  "trackingNumber": "EA123456789PK",
  "courierCode": "pakistan-post",
  "status": "in transit",
  "estimateDeliveryTime": "2026-03-25",
  "originCountry": "Pakistan",
  "destinationCountry": "Pakistan",
  "lastEvent": "Parcel received at sorting center",
  "events": [
    {
      "statusDescription": "Parcel received at sorting center",
      "eventTime": "2026-03-21 10:30:00",
      "address": "Karachi GPO",
      "details": "in_transit"
    }
  ]
}
```

---

## Architecture & Design Decisions

### Data Ownership Convention

The app follows a strict **"fetch where first needed, pass down only if required"** pattern:

- **`useCouriers`** — lives inside `TrackingForm` only. Couriers are never needed anywhere else, so the hook stays local and is never hoisted.
- **`useTracking`** — lives in `App`, because both `TrackingResult` and `TrackingHistory` consume the same tracking data. State is hoisted to the lowest common ancestor and passed as props.

### API Key Security

The TrackingMore API key is **never exposed to the browser**. All requests to TrackingMore go through the Express backend, which reads the key from environment variables. The frontend only ever calls your own backend.

### Thin API Client

`trackingApi.js` is a pure HTTP client — no caching, no normalization, no business logic. Data normalization happens in the backend controllers, keeping the frontend fully decoupled from TrackingMore's response shape.

---

## Deployment

### Frontend — Netlify

1. Push your code to GitHub
2. Connect the repo on [Netlify](https://netlify.com)
3. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add environment variable in Netlify dashboard:
   - `VITE_API_BASE_URL` = your Railway backend URL

### Backend — Railway

1. Connect the repo on [Railway](https://railway.app)
2. Set the root directory to `/backend`
3. Add environment variables in Railway dashboard:
   - `PORT` = `5000`
   - `TRACKING_API_KEY` = your TrackingMore key
   - `FRONTEND_URL` = your Netlify frontend URL

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Muhammad Raheel**  
GitHub: [@Muhammad-Raheel04](https://github.com/Muhammad-Raheel04)

---

> Built with ❤️ using React, Express, and TrackingMore API