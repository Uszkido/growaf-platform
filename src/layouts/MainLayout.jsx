import React from 'react'
import logo from '../assets/logo.svg'
import { Outlet, Link } from 'react-router-dom'

const MainLayout = ({ user, setShowAuthModal, logout }) => {
    return (
        <div className="app-container">
            {/* Navigation */}
            <header className="glass-effect" style={{ padding: '0.8rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
                <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                        <img src={logo} alt="Growaf Logo" style={{ height: '50px', width: 'auto' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--primary-green)', letterSpacing: '-0.5px', lineHeight: '1' }}>Growaf</span>
                            <span style={{ fontSize: '0.65rem', fontWeight: '500', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Growers Revitalizing Opportunities within Africa’s Farms</span>
                        </div>
                    </Link>

                        <Link to="/marketplace" className="nav-hover">Marketplace</Link>
                        <Link to="/smart-farming" className="nav-hover">Smart Farming</Link>
                        <Link to="/hub" className="nav-hover">Knowledge Hub</Link>
                        <a href="#community" className="nav-hover">Community</a>
                        <a href="#about" className="nav-hover">About</a>
                    </div>

                    <div className="auth-btns" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {user ? (
                            <>
                                <span style={{ fontWeight: '600' }}>Welcome, {user.name}</span>
                                {user.role === 'Admin' && (
                                    <Link to="/admin" style={{ padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', background: '#e74c3c', color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Admin Panel</Link>
                                )}
                                {user.role === 'Farmer' && (
                                    <Link to="/dashboard/vendor" style={{ padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Vendor Dashboard</Link>
                                )}
                                {user.role === 'Buyer' && (
                                    <Link to="/dashboard/buyer" className="glass-effect" style={{ padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', color: 'var(--white)', textDecoration: 'none' }}>My Dashboard</Link>
                                )}
                                <button onClick={logout} className="glass-effect" style={{ padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', color: 'var(--white)', border: 'none', cursor: 'pointer' }}>Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setShowAuthModal('login')} className="glass-effect" style={{ padding: '0.7rem 1.5rem', borderRadius: 'var(--radius-sm)', color: 'var(--white)', fontWeight: '500', border: 'none', cursor: 'pointer' }}>Log In</button>
                                <Link to="/register" style={{ padding: '0.7rem 1.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'var(--white)', fontWeight: '700', boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)', textDecoration: 'none' }}>Join Growaf</Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            {/* Language Switcher Float */ }
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }} className="glass-effect">
                <div style={{ padding: '0.8rem 1.2rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🌐 English
                </div>
            </div>

            <footer className="glass-effect" style={{ padding: '6rem 0', borderTop: '1px solid var(--glass-border)', background: 'var(--grad-dark)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                                <img src={logo} alt="Growaf Logo" style={{ height: '50px', width: 'auto' }} />
                                <span style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--primary-green)', letterSpacing: '-0.5px' }}>Growaf</span>
                            </div>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '350px', lineHeight: '1.6' }}>Revitalizing Opportunities Within Africa's Farms. Empowering our agricultural future.</p>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: 'var(--white)' }}>Platform</h4>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li><Link to="/marketplace" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Marketplace</Link></li>
                                <li><Link to="/smart-farming" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Smart Farming</Link></li>
                                <li><Link to="/hub" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Knowledge Hub</Link></li>
                                <li><a href="#community" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Community</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: 'var(--white)' }}>Support</h4>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Help Center</a></li>
                                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Safety</a></li>
                                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: 'var(--white)' }}>Legal</h4>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</a></li>
                                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', paddingTop: '3rem', borderTop: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        © {new Date().getFullYear()} Growaf Team. All rights reserved. Built for African Agricultural Excellence.
                    </div>
                </div>
            </footer>
        </div >
    )
}

export default MainLayout
