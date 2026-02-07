src/

├── App.jsx
│
│
├── Pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   │
│   ├── finder/
│   │   ├── Dashboard.jsx
│   │   ├── CleanerList.jsx
│   │   ├── CleanerDetails.jsx
│   │   └── Profile.jsx
│   │
│   ├── cleaner/
│   │   ├── Dashboard.jsx
│   │   ├── RequestJob.jsx
│   │   ├── AvailableJobs.jsx
│   │   ├── MyJobs.jsx
│   │   ├── ActiveJobs.jsx
│   │   ├── Earnings.jsx
│   │   ├── Notifications.jsx
│   │   └── Profile.jsx
│   │
│   └── admin/
│       ├── Dashboard.jsx
│       ├── VerifyCleaners.jsx
│       └── Jobs.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── JobCard.jsx
│   ├── NotificationCard.jsx
│   ├── Modal.jsx
│   └── Loader.jsx
│
├── Services/
│   ├── api.js
│   ├── auth.js
│   ├── job.js
│   └── profile.js
│
├── hooks/
│   ├── useAuth.js
│   └── useRole.js
│
├── utils/
│   ├── constants.js
│   └── helpers.js
│
├
│
└── main.jsx

BACKEND FILE STRUCTURE (MINIMAL)
server/
└── src/
    ├── index.js
    ├
    │
    ├── config/
    │   └── db.js
    │
    ├── routes/
    │   ├── auth.routes.js
    │   ├── profile.routes.js
    │   ├── job.routes.js
    │   └── notification.routes.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── profile.controller.js
    │   ├── job.controller.js
    │   └── notification.controller.js
    │
    ├── models/
    │   ├── User.model.js
    │   ├── CleanerProfile.model.js
    │   ├── FinderProfile.model.js
    │   ├── Job.model.js
    │   └── Notification.model.js
    │
    ├── middlewares/
    │   ├── auth.middleware.js
    │   ├── role.middleware.js
    │   └── profile.middleware.js
    │
    └── utils/
        └── jwt.js

