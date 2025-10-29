# Facebook Clone

A full-stack Facebook clone built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a beautiful, responsive frontend.

## 🚀 Live Demo

- **Frontend**: [Deployed on Netlify](https://your-netlify-url.netlify.app)
- **Backend API**: [Deployed on Heroku](https://your-heroku-app.herokuapp.com)

## ✨ Features

### Core Features
- ✅ User authentication (register/login)
- ✅ User profiles with avatars and cover photos
- ✅ News feed with posts from friends
- ✅ Create posts with text and images
- ✅ Like and comment on posts
- ✅ Friend requests and connections
- ✅ Real-time notifications
- ✅ Responsive design (mobile & desktop)

### Technical Features
- ✅ JWT authentication
- ✅ File upload handling
- ✅ Real-time updates with Socket.io
- ✅ Rate limiting and security
- ✅ RESTful API design
- ✅ MongoDB database
- ✅ Modern UI with smooth animations

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **JavaScript (ES6+)** - Interactive functionality
- **Local Storage** - Client-side data persistence

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Socket.io** - Real-time communication

## 📁 Project Structure

```
facebook-clone/
├── frontend/              # Frontend application
│   ├── index.html        # Main HTML file
│   ├── styles.css        # Main stylesheet
│   ├── responsive.css    # Responsive styles
│   ├── app.js           # Main application logic
│   ├── data.js          # Data management
│   ├── package.json     # Frontend dependencies
│   └── README.md        # Frontend documentation
├── backend/              # Backend API
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── uploads/         # File uploads
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── README.md        # Backend documentation
├── package.json          # Root package.json
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/facebook-clone.git
cd facebook-clone
```

2. **Setup Backend**
```bash
cd backend
npm install
# Create .env file with your MongoDB URI and JWT secret
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
npm start
```

4. **Open in browser**
```
Frontend: http://localhost:3000
Backend API: http://localhost:5000
```

## 🔧 Configuration

### Backend Environment Variables (.env)
```env
MONGO_URI=mongodb://localhost:27017/facebook-clone
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

### Demo Accounts
- **John Doe**: john@example.com / password123
- **Jane Smith**: jane@example.com / password123
- **Mike Johnson**: mike@example.com / password123

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Posts Endpoints
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `POST /api/posts/:id/like` - Like/unlike post

### Friends Endpoints
- `POST /api/friends/request` - Send friend request
- `PUT /api/friends/accept/:id` - Accept friend request

## 🚀 Deployment

### Frontend (Netlify)
1. Push frontend code to GitHub
2. Connect repository to Netlify
3. Deploy automatically

### Backend (Heroku)
1. Create Heroku app
2. Set environment variables
3. Connect MongoDB Atlas
4. Deploy with git push

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend (open in browser and test manually)
cd frontend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Facebook's design and functionality
- Built for educational purposes
- Thanks to the open-source community

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ by [Your Name]**
