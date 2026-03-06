import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

const AdminPortal = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('growaf_user')) || null)
    const [activeTab, setActiveTab] = useState('dashboard')

    // Strict Security Check: Only Admins can access this route
    if (!user || user.role !== 'Admin') {
        return <Navigate to="/" />
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>

            {/* Admin Sidebar */}
            <div style={{ width: '280px', background: '#111', borderRight: '1px solid #333', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '3rem' }}>
                    <img src={logo} alt="Logo" style={{ height: '30px' }} />
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e74c3c' }}>Admin Control</span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <button onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '1rem', background: activeTab === 'dashboard' ? 'rgba(231, 76, 60, 0.1)' : 'transparent', color: activeTab === 'dashboard' ? '#e74c3c' : '#ccc', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: activeTab === 'dashboard' ? 'bold' : 'normal' }}>
                        📊 Platform Overview
                    </button>
                    <button onClick={() => setActiveTab('users')} style={{ textAlign: 'left', padding: '1rem', background: activeTab === 'users' ? 'rgba(231, 76, 60, 0.1)' : 'transparent', color: activeTab === 'users' ? '#e74c3c' : '#ccc', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: activeTab === 'users' ? 'bold' : 'normal' }}>
                        👥 User Management
                    </button>
                    <button onClick={() => setActiveTab('vendors')} style={{ textAlign: 'left', padding: '1rem', background: activeTab === 'vendors' ? 'rgba(231, 76, 60, 0.1)' : 'transparent', color: activeTab === 'vendors' ? '#e74c3c' : '#ccc', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: activeTab === 'vendors' ? 'bold' : 'normal' }}>
                        🚜 Vendor Approvals
                    </button>
                    <button onClick={() => setActiveTab('content')} style={{ textAlign: 'left', padding: '1rem', background: activeTab === 'content' ? 'rgba(231, 76, 60, 0.1)' : 'transparent', color: activeTab === 'content' ? '#e74c3c' : '#ccc', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: activeTab === 'content' ? 'bold' : 'normal' }}>
                        📝 Content Moderation
                    </button>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #333' }}>
                    <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1rem' }}>Logged in as <br /><strong style={{ color: 'white' }}>{user.name}</strong></div>
                    <Link to="/" style={{ display: 'block', textAlign: 'center', padding: '0.8rem', background: '#222', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem' }}>Return to Main Site</Link>
                </div>
            </div>

            {/* Main Admin Area */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>

                {activeTab === 'dashboard' && (
                    <div>
                        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Platform Overview</h1>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Users</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>12,450</div>
                            </div>
                            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Vendors</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>3,205</div>
                            </div>
                            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Pending KYC</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>142</div>
                            </div>
                            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Sales (Escrow)</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-green)' }}>₦45.2M</div>
                            </div>
                        </div>

                        <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '2rem', borderRadius: '8px' }}>
                            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#888' }}>Recent Activity Log</h2>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
                                    <span>New Vendor Registration (KYC Pending) - <strong>AgriTech Farms, Kenya</strong></span>
                                    <span style={{ color: '#888' }}>2 mins ago</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
                                    <span>Large Escrow Released - <strong>Order #5992</strong></span>
                                    <span style={{ color: '#888' }}>15 mins ago</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#e74c3c' }}>System Alert - Database connection latency spike</span>
                                    <span style={{ color: '#888' }}>1 hr ago</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div>
                        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>User Management</h1>
                        <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '2rem', borderRadius: '8px', textAlign: 'center', color: '#888' }}>
                            User moderation interface loading...
                        </div>
                    </div>
                )}

                {(activeTab === 'vendors' || activeTab === 'content') && (
                    <div>
                        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>{activeTab === 'vendors' ? 'Vendor Approvals' : 'Content Moderation'}</h1>
                        <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '2rem', borderRadius: '8px', textAlign: 'center', color: '#888' }}>
                            Module currently under active development.
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AdminPortal
