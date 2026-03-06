import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'

const BuyerDashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('growaf_user')) || null)
    const [activeTab, setActiveTab] = useState('orders')

    // Security Check
    if (!user || user.role !== 'Buyer') {
        return <Navigate to="/" />
    }

    return (
        <div style={{ padding: '4rem 0', minHeight: '80vh', background: 'var(--grad-dark)' }}>
            <div className="container">

                {/* Dashboard Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Buyer Portal</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Manage your orders, wallet, and saved products.</p>
                    </div>
                    <div className="glass-effect" style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>💳</span>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wallet Balance</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-green)' }}>₦{Number(user.wallet_balance || 0).toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
                    {/* Sidebar Navigation */}
                    <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', alignSelf: 'start' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>
                                <button onClick={() => setActiveTab('orders')} style={{ width: '100%', textAlign: 'left', padding: '1rem', background: activeTab === 'orders' ? 'rgba(46, 204, 113, 0.1)' : 'transparent', border: 'none', color: activeTab === 'orders' ? 'var(--primary-green)' : 'white', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: activeTab === 'orders' ? 'bold' : 'normal' }}>
                                    📦 My Orders
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setActiveTab('saved')} style={{ width: '100%', textAlign: 'left', padding: '1rem', background: activeTab === 'saved' ? 'rgba(46, 204, 113, 0.1)' : 'transparent', border: 'none', color: activeTab === 'saved' ? 'var(--primary-green)' : 'white', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: activeTab === 'saved' ? 'bold' : 'normal' }}>
                                    ❤️ Saved Products
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setActiveTab('wallet')} style={{ width: '100%', textAlign: 'left', padding: '1rem', background: activeTab === 'wallet' ? 'rgba(46, 204, 113, 0.1)' : 'transparent', border: 'none', color: activeTab === 'wallet' ? 'var(--primary-green)' : 'white', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: activeTab === 'wallet' ? 'bold' : 'normal' }}>
                                    💰 Escrow & Wallet
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setActiveTab('settings')} style={{ width: '100%', textAlign: 'left', padding: '1rem', background: activeTab === 'settings' ? 'rgba(46, 204, 113, 0.1)' : 'transparent', border: 'none', color: activeTab === 'settings' ? 'var(--primary-green)' : 'white', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: activeTab === 'settings' ? 'bold' : 'normal' }}>
                                    ⚙️ Account Settings
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Main Content Area */}
                    <div>
                        {activeTab === 'orders' && (
                            <div>
                                <h2 style={{ marginBottom: '2rem' }}>Recent Orders</h2>
                                <div className="glass-effect" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                                    <h3 style={{ marginBottom: '1rem' }}>No orders yet</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Explore the marketplace to find high-quality agricultural products.</p>
                                    <Link to="/marketplace" style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Browse Marketplace</Link>
                                </div>
                            </div>
                        )}

                        {activeTab === 'wallet' && (
                            <div>
                                <h2 style={{ marginBottom: '2rem' }}>Escrow & Wallet</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                                        <h3 style={{ marginBottom: '1rem' }}>Fund Wallet</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Add funds to securely purchase from African vendors via our internal escrow system.</p>
                                        <button style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Fund via Card/Bank</button>
                                    </div>
                                    <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                                        <h3 style={{ marginBottom: '1rem' }}>Escrow Transactions</h3>
                                        <p style={{ color: 'var(--text-muted)' }}>No funds currently held in escrow.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'saved' || activeTab === 'settings') && (
                            <div className="glass-effect" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                                <p style={{ color: 'var(--text-muted)' }}>This section is currently under development.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BuyerDashboard
