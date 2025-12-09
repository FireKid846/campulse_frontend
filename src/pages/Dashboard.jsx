import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bell, Mail } from 'lucide-react';
import { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data - replace with real data from your backend
  const notifications = [
    { id: 1, type: 'assignment', text: 'CSC 301 Assignment due tomorrow', time: '2h ago', unread: true },
    { id: 2, type: 'opportunity', text: 'New scholarship: Tech Women Africa Grant', time: '5h ago', unread: true },
    { id: 3, type: 'announcement', text: 'Library hours extended this week', time: '1d ago', unread: false },
  ];

  const todayAgenda = [
    { id: 1, type: 'class', title: 'CSC 301 - Data Structures', time: '10:00 AM' },
    { id: 2, type: 'assignment', title: 'PHY 202 Lab Report', time: '5:00 PM' },
    { id: 3, type: 'event', title: 'Study Group - Library', time: '7:00 PM' },
  ];

  const recentActivity = [
    { id: 1, icon: '🎓', text: 'New scholarship: Tech Women Africa Grant', time: '2h ago' },
    { id: 2, icon: '📱', text: 'New listing: iPhone 13 - ₦150,000', time: '4h ago' },
    { id: 3, icon: '📢', text: 'Campus announcement: Library hours extended', time: '6h ago' },
    { id: 4, icon: '🎯', text: 'Recommended: Web Dev internship matches your profile', time: '1d ago' },
  ];

  const features = [
    {
      icon: '📚',
      title: 'Academic Planner',
      description: 'Manage your classes, assignments, and exams',
      path: '/planner',
      color: '#f9dc5c'
    },
    {
      icon: '🎯',
      title: 'Opportunities Hub',
      description: 'Find gigs, scholarships, and deals',
      path: '/opportunities',
      color: '#bfd8fd'
    },
    {
      icon: '👨‍🏫',
      title: 'Tutor Discovery',
      description: 'Connect with tutors for academic support',
      path: '/tutors',
      color: '#10b981'
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="dashboard">
      {/* Top Bar with Mail and Notifications */}
      <div className="dashboard-topbar">
        <button className="topbar-icon mail-icon" onClick={() => navigate('/announcements')}>
          <Mail size={24} />
        </button>
        
        <div className="notification-container">
          <button 
            className="topbar-icon notification-icon" 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={24} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <button className="mark-all-read">Mark all as read</button>
              </div>
              <div className="notifications-list">
                {notifications.map(notif => (
                  <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                    <div className="notification-content">
                      <p>{notif.text}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                    {notif.unread && <span className="unread-dot"></span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-content">
        <div className="welcome-section animate-fadeIn">
          <h2>Welcome back, {user?.fullName || user?.full_name || 'Student'}! 👋</h2>
          <p className="user-school">{user?.school}</p>
          <p className="user-details">{user?.department} • {user?.level}</p>
        </div>

        {/* Today's Agenda and Recent Activity */}
        <div className="info-grid">
          <div className="info-card agenda-card">
            <h3>📅 Today's Agenda</h3>
            <div className="agenda-list">
              {todayAgenda.length > 0 ? (
                todayAgenda.map(item => (
                  <div key={item.id} className="agenda-item">
                    <div className="agenda-time">{item.time}</div>
                    <div className="agenda-details">
                      <span className={`agenda-type ${item.type}`}>{item.type}</span>
                      <p>{item.title}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-message">Nothing scheduled for today! 🎉</p>
              )}
            </div>
          </div>

          <div className="info-card activity-card">
            <h3>🔔 Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <span className="activity-icon">{activity.icon}</span>
                  <div className="activity-content">
                    <p>{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-grid">
          {features.map((feature, index) => (
            <div
              key={feature.path}
              className="dashboard-card animate-slideInLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(feature.path)}
            >
              <div className="card-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <button className="card-btn" style={{ background: feature.color }}>
                Get Started <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
