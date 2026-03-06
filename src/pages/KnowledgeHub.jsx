import React from 'react'

const KnowledgeHub = () => {
    return (
        <>
            <section style={{ padding: '8rem 0', background: 'var(--grad-dark)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>Agricultural <span style={{ color: 'var(--primary-green)' }}>Knowledge Hub</span></h2>
                            <p style={{ color: 'var(--text-muted)' }}>Empowering farmers with the latest research, sustainable techniques, and climate-smart agricultural guides.</p>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⛅</div>
                            <div style={{ color: 'var(--primary-green)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Guide</div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Climate-Smart Farming 2026</h3>
                            <a href="#" style={{ color: 'white', textDecoration: 'underline', fontSize: '0.9rem' }}>Read Guide</a>
                        </div>
                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💧</div>
                            <div style={{ color: 'var(--primary-green)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Research</div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Sustainable Irrigation Techniques</h3>
                            <a href="#" style={{ color: 'white', textDecoration: 'underline', fontSize: '0.9rem' }}>Read Research</a>
                        </div>
                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1592982537447-6f2afba5aede?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>📺</div>
                            <div style={{ color: 'var(--primary-green)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>Video</div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Maximizing Crop Yields</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontSize: '0.9rem', position: 'relative', zIndex: 1, marginTop: '2rem' }}>
                                <span style={{ background: 'var(--primary-green)', padding: '0.2rem 0.5rem', borderRadius: '50%', fontSize: '0.7rem' }}>▶</span> Training: Organic Soil Health
                            </div>
                            <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: '#ddd', position: 'relative', zIndex: 1 }}>Watch our latest expert-led training session.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default KnowledgeHub
