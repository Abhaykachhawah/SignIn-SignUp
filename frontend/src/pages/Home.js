import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      navigate('/login');
      return;
    }
    setLoggedInUser(user);  
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    setTimeout(() => navigate('/login'), 1000);
  };

const fetchProducts = async()=>{
    try{
       const url = 'http://localhost:8080/products';
       const headers ={
        headers: {
            'Authorization' : localStorage.getItem('token')
        }
       }
       const response = await fetch(url , headers);
       const data = await response.json();
       console.log(data);
       setProducts(data);
    }catch(error){
        toast.error('Something went wrong. Please try again.');
    }
}
   
  useEffect(()=>{
    fetchProducts();
  },[]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="home-nav">
        <div className="nav-brand">
          <div className="nav-logo">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="nav-title">Dashboard</span>
        </div>
        <div className="nav-right">
          <div className="nav-avatar">{getInitials(loggedInUser)}</div>
          <button className="logout-btn" onClick={handleLogout}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name} : {product.price}</h2>
          </div>
        ))}
        </div> */}

      {/* Main content */}
      <main className="home-main">
        {/* Welcome section */}
        <section className="welcome-section">
          <div className="welcome-text">
            <p className="greeting">{getGreeting()} 👋</p>
            <h1 className="welcome-name">{loggedInUser || 'User'}</h1>
            <p className="welcome-date">{formattedDate}</p>
          </div>
          <div className="time-card">
            <div className="time-display">{formattedTime}</div>
            <p className="time-label">Current Time</p>
          </div>
        </section>

        {/* Stats cards */}
        <section className="stats-grid">
          <div className="stat-card stat-purple">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-value">Active</p>
              <p className="stat-label">Account Status</p>
            </div>
          </div>

          <div className="stat-card stat-blue">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-value">Secured</p>
              <p className="stat-label">JWT Protected</p>
            </div>
          </div>

          <div className="stat-card stat-emerald">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-value">Online</p>
              <p className="stat-label">Session Active</p>
            </div>
          </div>
        </section>

        {/* Info card */}
        <section className="info-section">
          <div className="info-card">
            <div className="info-card-header">
              <h2>Your Profile</h2>
              <span className="info-badge">Authenticated</span>
            </div>
            <div className="info-card-body">
              <div className="info-row">
                <span className="info-label">Name</span>
                <span className="info-value">{loggedInUser || '—'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status</span>
                <span className="info-value">
                  <span className="status-dot" />
                  Logged In
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Session</span>
                <span className="info-value">JWT Token Active</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Home;