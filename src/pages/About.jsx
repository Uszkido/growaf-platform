import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    return (
        <section className="page-transition" style={{ padding: '8rem 0', minHeight: '100vh', background: 'var(--grad-dark)' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Our Vision for <span style={{ color: 'var(--primary-green)' }}>African Agriculture</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                        To transform the continent's agricultural landscape by connecting farmers directly to markets, providing actionable AI insights, and enabling transparent financial logistics.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
                    <div className="glass-effect" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', height: '100%' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary-green)' }}>The Growaf Mission</h3>
                        <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8' }}>
                            We are more than just a marketplace. We are building the foundational digital infrastructure required to bring modern technology to traditional farming across Africa.
                            <br /><br />
                            By combining state-of-the-art AI with secure FinTech escrow systems, we ensure that the hard-working farmers of Africa get the fair prices and secure payments they deserve, while buyers gain access to a reliable, verified supply chain.
                        </p>
                    </div>

                    <div style={{ position: 'relative', height: '100%', minHeight: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid #333' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1592982537447-6f2afba5aede?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <div style={{ position: 'relative', zIndex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                            <h4 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Empowering Local Economies</h4>
                            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Growaf removes predatory middlemen, driving up to 40% more profit directly into rural farming communities.</p>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button onClick={() => navigate('/register')} style={{ padding: '1.2rem 3rem', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(46,204,113,0.3)' }}>Join the Movement</button>
                </div>
            </div>
        </section>
    );
};

export default About;
