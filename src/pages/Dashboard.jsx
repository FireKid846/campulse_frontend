import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-logo">CAMPULSE</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            <div className="dashboard-content">
                <div className="welcome-section animate-fadeIn">
                    <h2>Welcome back, {user?.fullName || 'Student'}! 👋</h2>
                    <p>{user?.school}</p>
                    <p>{user?.department} • {user?.level}</p>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card animate-slideInLeft">
                        <div className="card-icon">📚</div>
                        <h3>Academic Planner</h3>
                        <p>Manage your classes, assignments, and exams</p>
                        <button className="card-btn">Coming Soon</button>
                    </div>

                    <div className="dashboard-card animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
                        <div className="card-icon">🎯</div>
                        <h3>Opportunities Hub</h3>
                        <p>Find gigs, scholarships, and deals</p>
                        <button className="card-btn">Coming Soon</button>
                    </div>

                    <div className="dashboard-card animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                        <div className="card-icon">👨‍🏫</div>
                        <h3>Tutor Discovery</h3>
                        <p>Connect with tutors for academic support</p>
                        <button className="card-btn">Coming Soon</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
