import React from 'react';

const Community = () => {
    return (
        <section className="page-transition" style={{ padding: '8rem 0', background: 'var(--grad-dark)', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="badge" style={{ display: 'inline-block', padding: '0.5rem 1.2rem', borderRadius: '100px', background: 'rgba(46, 204, 113, 0.1)', color: 'var(--primary-green)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
                        Growaf Ecosystem Network
                    </div>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>The Future of <span style={{ color: 'var(--primary-green)' }}>African Farming</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        Join over 500,000 farmers, agricultural experts, and buyers. Share knowledge, negotiate deals, and grow together.
                    </p>
                </div>

                <div className="glass-effect" style={{ padding: '4rem', borderRadius: 'var(--radius-lg)' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Community Forums (Coming Soon)</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        We are currently building a state-of-the-art interactive forum where you can ask agronomy questions, share your harvest success stories, and connect directly with verified buyers in your region.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌍</div>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Regional Hubs</h4>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>Connect with farmers facing the same climate and soil conditions in your specific area.</p>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎓</div>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Expert Q&A</h4>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>Get direct advice from certified African agronomists and AI-supported data.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', background: 'rgba(46, 204, 113, 0.05)', borderRadius: '8px', border: '1px dashed var(--primary-green)' }}>
                        <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Want early access?</h4>
                        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Register your email to be notified the moment the forums go live.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
                            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '1rem', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                            <button style={{ padding: '1rem 2rem', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Notify Me</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Community;
