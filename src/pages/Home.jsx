import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({ showAuthModal, setShowAuthModal, handleAuth, formData, setFormData }) => {
    const navigate = useNavigate()

    const handleStartTrading = () => {
        navigate('/marketplace')
    }

    return (
        <>
            {/* Modals - Auth */}
            {showAuthModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-effect" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', width: '450px', position: 'relative' }}>
                        <button onClick={() => setShowAuthModal(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>{showAuthModal === 'login' ? 'Welcome Back' : 'Join Growaf'}</h2>
                        {showAuthModal === 'register' ? (
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <p style={{ color: 'var(--text-muted)' }}>We've moved to a dedicated secure registration portal for better KYC verification.</p>
                                <Link to="/register" onClick={() => setShowAuthModal(null)} style={{ display: 'inline-block', marginTop: '1.5rem', padding: '1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', textDecoration: 'none', width: '100%' }}>Go to Secure Registration</Link>
                            </div>
                        ) : (
                            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <input type="email" placeholder="Email Address" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                                <input type="password" placeholder="Password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                                <button type="submit" style={{ padding: '1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>Login</button>
                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Don't have an account? </span>
                                    <Link to="/register" onClick={() => setShowAuthModal(null)} style={{ color: 'var(--primary-green)', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up</Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="hero" style={{ padding: '10rem 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(46, 204, 113, 0.1) 0%, transparent 70%)', zIndex: -1 }}></div>
                <div className="container animate-fade" style={{ textAlign: 'center' }}>
                    <div className="badge" style={{ display: 'inline-block', padding: '0.5rem 1.2rem', borderRadius: '100px', background: 'rgba(46, 204, 113, 0.1)', color: 'var(--primary-green)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '2rem', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
                        Empowering Africa's Future
                    </div>
                    <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: '700' }}>
                        Growers Revitalizing <span style={{ color: 'var(--primary-green)' }}>Opportunities</span> <br />
                        Within Africa’s Farms
                    </h1>
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', maxWidth: '850px', margin: '0 auto 3.5rem', fontWeight: '400' }}>
                        The premier digital marketplace connecting smallholder farmers, agribusinesses, and markets across the continent. Grow faster, farm smarter.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <button style={{ padding: '1.2rem 3rem', borderRadius: 'var(--radius-md)', background: 'var(--grad-green)', color: 'var(--white)', fontWeight: '700', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(46, 204, 113, 0.3)', border: 'none', cursor: 'pointer' }} onClick={handleStartTrading}>Start Trading</button>
                        <button className="glass-effect" onClick={() => navigate('/hub')} style={{ padding: '1.2rem 3rem', borderRadius: 'var(--radius-md)', color: 'var(--white)', fontWeight: '700', fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>Knowledge Hub</button>
                    </div>

                    <div className="animate-fade" style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '6rem', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Active Farmers', value: '500k+' },
                            { label: 'African Nations', value: '12' },
                            { label: 'Trading Volume', value: '₦2.5B+' },
                            { label: 'Sustainable Focus', value: '98%' }
                        ].map(stat => (
                            <div key={stat.label} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-green)' }}>{stat.value}</div>
                                <div style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>




        </>
    )
}

export default Home
