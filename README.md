healthy-habitat-network/
│
├── backend/                        # PHP + MySQL API
│   ├── config/
│   │   ├── database.php
│   │   ├── auth.php
│   ├── routes/
│   │   ├── auth.php
│   │   ├── residents.php
│   │   ├── businesses.php
│   │   ├── products.php
│   │   ├── votes.php
│   │   ├── reports.php
│   ├── controllers/
│   │   ├── AuthController.php
│   │   ├── ResidentController.php
│   │   ├── BusinessController.php
│   │   ├── ProductController.php
│   │   ├── VoteController.php
│   │   ├── ReportController.php
│   ├── models/
│   │   ├── Resident.php
│   │   ├── Business.php
│   │   ├── Product.php
│   │   ├── Vote.php
│   ├── public/                     # Uploaded assets (images, files)
│   ├── .env                        # Environment variables (DB creds, etc.)
│   ├── .gitignore                  # Git ignore rules for backend
│   └── index.php                   # API entry point
│
├── frontend/                       # Next.js + Tailwind CSS
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   ├── layouts/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   ├── dashboard/
│   │   │   ├── ResidentDashboard.jsx
│   │   │   ├── BusinessDashboard.jsx
│   │   │   ├── CouncilDashboard.jsx
│   │   ├── admin/
│   │   │   ├── AdminPanel.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── Voting.jsx
│   ├── pages/
│   │   ├── index.jsx
│   │   ├── auth/
│   │   │   ├── login.jsx
│   │   │   ├── register.jsx
│   │   ├── dashboard/
│   │   │   ├── resident.jsx
│   │   │   ├── business.jsx
│   │   │   ├── council.jsx
│   │   ├── products/
│   │   │   ├── index.jsx
│   │   │   ├── [id].jsx
│   │   ├── admin/
│   │   │   ├── index.jsx
│   │   ├── voting.jsx
│   │   ├── reports.jsx
│   ├── public/                     # Static assets (e.g. logo, icons)
│   ├── styles/                     # Global and custom Tailwind styles
│   ├── utils/                      # Reusable utility functions
│   ├── context/                    # Global state (AuthContext, etc.)
│   ├── hooks/                      # Custom React hooks
│   ├── .env                        # API base URL, frontend-specific keys
│   ├── .gitignore                  # Git ignore rules for frontend
│   ├── package.json
│   └── tailwind.config.js
│
├── .gitignore                      # Root ignore (optional, mainly delegate to subfolders)
└── README.md                       # Project overview
