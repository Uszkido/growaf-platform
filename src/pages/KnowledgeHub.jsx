import React, { useState } from 'react'

const KnowledgeHub = () => {
    const [aiForm, setAiForm] = useState({ crop: '', region: '', issue: '' })
    const [aiAdvice, setAiAdvice] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAIAssist = async (e) => {
        e.preventDefault()
        setLoading(true)
        setAiAdvice('')
        try {
            const API_URL = import.meta.env.VITE_API_URL || '/api';
            const res = await fetch(`${API_URL}/ai/advisor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aiForm)
            })
            const data = await res.json()
            setAiAdvice(data.advice || data.message)
        } catch (err) {
            setAiAdvice("There was a connection error reaching the AI Advisor.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section className="page-transition" style={{ padding: '8rem 0', background: 'var(--grad-dark)' }}>
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

                    {/* AI Advisor Section */}
                    <div style={{ marginTop: '5rem' }}>
                        <div className="glass-effect" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤖 Smart Farming AI Advisor</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Describe your crop, your location, and the challenge you are facing. Our agricultural AI will provide an actionable, localized solution.</p>

                                    <form onSubmit={handleAIAssist} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <input
                                            type="text"
                                            placeholder="What crop? (e.g., Maize, Cassava)"
                                            value={aiForm.crop}
                                            onChange={(e) => setAiForm({ ...aiForm, crop: e.target.value })}
                                            required
                                            style={{ padding: '1rem', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Region/Location? (e.g., Lagos, Nairobi)"
                                            value={aiForm.region}
                                            onChange={(e) => setAiForm({ ...aiForm, region: e.target.value })}
                                            required
                                            style={{ padding: '1rem', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                                        />
                                        <textarea
                                            placeholder="Describe the issue... (e.g., Yellowing leaves, pest holes)"
                                            value={aiForm.issue}
                                            onChange={(e) => setAiForm({ ...aiForm, issue: e.target.value })}
                                            required
                                            rows="4"
                                            style={{ padding: '1rem', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px', resize: 'vertical' }}
                                        />
                                        <button type="submit" disabled={loading} style={{ padding: '1rem', background: 'var(--primary-green)', color: 'white', fontWeight: 'bold', borderRadius: '4px', cursor: loading ? 'wait' : 'pointer' }}>
                                            {loading ? 'Analyzing...' : 'Get AI Diagnosis'}
                                        </button>
                                    </form>
                                </div>

                                <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '2rem', minHeight: '350px' }}>
                                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary-green)' }}>AI Diagnosis & Plan</h4>
                                    {loading ? (
                                        <div style={{ color: '#888', fontStyle: 'italic', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <span>Processing data</span><span className="animate-fade">...</span>
                                        </div>
                                    ) : aiAdvice ? (
                                        <div style={{ whiteSpace: 'pre-line', color: '#ccc', lineHeight: '1.8' }}>
                                            {aiAdvice}
                                        </div>
                                    ) : (
                                        <div style={{ color: '#666', textAlign: 'center', marginTop: '4rem' }}>
                                            Awaiting your input.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default KnowledgeHub
