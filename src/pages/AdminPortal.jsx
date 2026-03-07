import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

const AdminPortal = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('growaf_user')) || null)
    const [token] = useState(localStorage.getItem('growaf_token') || null)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [stats, setStats] = useState({ totalUsers: 0, activeVendors: 0, escrowBalance: '₦0' })
    const [usersList, setUsersList] = useState([])
    const [loading, setLoading] = useState(true)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    useEffect(() => {
        if (user && user.role === 'Admin') {
            fetchAdminData()
        }
    }, [user])

    const fetchAdminData = async () => {
        setLoading(true)
        try {
            // Fetch Stats
            const statsRes = await fetch(`${API_URL}/admin/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const statsData = await statsRes.json()
            if (statsData.stats) setStats(statsData.stats)

            // Fetch Users
            const usersRes = await fetch(`${API_URL}/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const usersData = await usersRes.json()
            if (Array.isArray(usersData)) setUsersList(usersData)

        } catch (error) {
            console.error("Admin fetch error:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSuspend = async (userId) => {
        if (!window.confirm("Are you sure you want to suspend this user?")) return;
        try {
            const res = await fetch(`${API_URL}/admin/users/${userId}/suspend`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                alert("User suspended successfully.")
                // Mock update UI
            }
        } catch (error) {
            console.error("Error suspending:", error)
        }
    }

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
                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{loading ? '...' : stats.totalUsers}</div>
                            </div>
                            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Vendors</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{loading ? '...' : stats.activeVendors}</div>
                            </div>
                            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Pending KYC</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>3 (Mock)</div>
                            </div>
                            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Sales (Escrow)</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-green)' }}>{loading ? '...' : stats.escrowBalance}</div>
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
                        <div style={{ background: '#1c1c1c', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#222', color: '#888', borderBottom: '1px solid #333' }}>
                                        <th style={{ padding: '1rem' }}>Name</th>
                                        <th style={{ padding: '1rem' }}>Email</th>
                                        <th style={{ padding: '1rem' }}>Role</th>
                                        <th style={{ padding: '1rem' }}>Location</th>
                                        <th style={{ padding: '1rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading users...</td></tr>
                                    ) : usersList.map(u => (
                                        <tr key={u.id} style={{ borderBottom: '1px solid #333' }}>
                                            <td style={{ padding: '1rem' }}><strong>{u.name}</strong></td>
                                            <td style={{ padding: '1rem', color: '#ccc' }}>{u.email}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', background: u.role === 'Admin' ? 'rgba(231, 76, 60, 0.2)' : u.role === 'Farmer' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: u.role === 'Admin' ? '#e74c3c' : u.role === 'Farmer' ? 'var(--primary-green)' : 'white' }}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#ccc' }}>{u.location}</td>
                                            <td style={{ padding: '1rem' }}>
                                                {u.role !== 'Admin' && (
                                                    <button onClick={() => handleSuspend(u.id)} style={{ padding: '0.5rem 1rem', background: 'rgba(231, 76, 60, 0.1)', border: '1px solid rgba(231, 76, 60, 0.5)', color: '#e74c3c', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Suspend</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {(activeTab === 'vendors' || activeTab === 'content') && (
                    <div>
                        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>{activeTab === 'vendors' ? 'Vendor Approvals' : 'Content Moderation'}</h1>

                        {activeTab === 'vendors' && (
                            <div style={{ background: '#1c1c1c', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ background: '#222', color: '#888', borderBottom: '1px solid #333' }}>
                                            <th style={{ padding: '1rem' }}>Vendor Name</th>
                                            <th style={{ padding: '1rem' }}>Location</th>
                                            <th style={{ padding: '1rem' }}>KYC Status</th>
                                            <th style={{ padding: '1rem' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading vendors...</td></tr>
                                        ) : usersList.filter(u => u.role === 'Farmer').map(u => (
                                            <tr key={u.id} style={{ borderBottom: '1px solid #333' }}>
                                                <td style={{ padding: '1rem' }}><strong>{u.name}</strong><br /><span style={{ fontSize: '0.8rem', color: '#888' }}>{u.email}</span></td>
                                                <td style={{ padding: '1rem', color: '#ccc' }}>{u.location}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', background: 'rgba(243, 156, 18, 0.2)', color: '#f39c12' }}>
                                                        Pending Review
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                                    <button onClick={() => alert('KYC Documents approved.')} style={{ padding: '0.5rem 1rem', background: 'rgba(46, 204, 113, 0.2)', border: '1px solid rgba(46, 204, 113, 0.5)', color: 'var(--primary-green)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Approve</button>
                                                    <button onClick={() => alert('KYC Documents rejected.')} style={{ padding: '0.5rem 1rem', background: 'rgba(231, 76, 60, 0.1)', border: '1px solid rgba(231, 76, 60, 0.5)', color: '#e74c3c', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Reject</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {usersList.filter(u => u.role === 'Farmer').length === 0 && (
                                            <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No pending vendor applications.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'content' && (
                            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '2rem', borderRadius: '8px', textAlign: 'center', color: '#888' }}>
                                Module currently under active development.
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}

export default AdminPortal
