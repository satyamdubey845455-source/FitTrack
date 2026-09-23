import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome,
  FiPieChart,
  FiDroplet,
  FiActivity,
  FiMenu,
  FiX,
  FiMoon,
  FiTrendingUp,
  FiTarget,
  FiBarChart2,
  FiCalendar,
  FiBell,
  FiSettings,
  FiLogOut,
  FiZap,
} from 'react-icons/fi';

export default function MobileNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const primaryTabs = [
    { to: '/dashboard', label: 'Home', icon: FiHome },
    { to: '/diet', label: 'Diet', icon: FiPieChart },
    { to: '/water', label: 'Water', icon: FiDroplet },
    { to: '/workout', label: 'Workout', icon: FiActivity },
  ];

  const moreItems = [
    { to: '/sleep', label: 'Sleep & Recovery', icon: FiMoon, color: '#818cf8' },
    { to: '/progress', label: 'Body Progress', icon: FiTrendingUp, color: '#38bdf8' },
    { to: '/goals', label: 'Targets & Goals', icon: FiTarget, color: '#f59e0b' },
    { to: '/analytics', label: 'Analytics & Trends', icon: FiBarChart2, color: '#10b981' },
    { to: '/calendar', label: 'Calendar Heatmap', icon: FiCalendar, color: '#a855f7' },
    { to: '/notifications', label: 'Alerts & Reminders', icon: FiBell, color: '#ec4899' },
    { to: '/settings', label: 'Settings & Data Export', icon: FiSettings, color: '#94a3b8' },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="mobile-top-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FiZap size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
            FitTrack <span style={{ fontSize: '0.65rem', color: '#818cf8', fontWeight: 600 }}>PRO</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <NavLink to="/notifications" style={{ color: '#94a3b8', position: 'relative' }}>
            <FiBell size={20} />
          </NavLink>
          <div
            onClick={() => setMenuOpen(true)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-bar">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) => `mobile-tab ${isActive ? 'mobile-tab-active' : ''}`}
            >
              <Icon size={20} />
              <span className="mobile-tab-label">{tab.label}</span>
            </NavLink>
          );
        })}

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className={`mobile-tab ${menuOpen ? 'mobile-tab-active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <FiMenu size={20} />
          <span className="mobile-tab-label">More</span>
        </button>
      </nav>

      {/* Slide-Up Drawer Menu */}
      {menuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.96rem' }}>
                    {user?.fullName || 'Athlete'}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                    {user?.email || 'satya@fittrack.com'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="mobile-drawer-list">
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#64748b', textTransform: 'uppercase', paddingLeft: '8px' }}>
                Modules & Health Trackers
              </span>

              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => `mobile-drawer-item ${isActive ? 'mobile-drawer-item-active' : ''}`}
                  >
                    <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>
                      <Icon size={18} />
                    </span>
                    <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500, color: '#f1f5f9' }}>
                      {item.label}
                    </span>
                  </NavLink>
                );
              })}
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={handleLogout}
                className="btn btn-danger"
                style={{ width: '100%', padding: '11px', fontSize: '0.88rem' }}
              >
                <FiLogOut size={16} /> Sign Out of FitTrack
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
