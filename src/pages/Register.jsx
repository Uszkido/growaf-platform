import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Register = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Buyer', // Default role
        location: '',
        phone: '',
        farmSize: '',
        expertDomain: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL || '/api'

    const handleNext = (e) => {
        e.preventDefault()
        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Create user endpoint accepts name, email, password, role, location
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                location: formData.location
            }

            const res = await fetch(`${API_URL}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            const data = await res.json()

            if (data.token) {
                localStorage.setItem('growaf_user', JSON.stringify(data.user))
                localStorage.setItem('growaf_token', data.token)
                alert('Welcome to Growaf! Registration successful.')

                // Redirect based on role
                if (data.user.role === 'Farmer') navigate('/dashboard/vendor')
                else if (data.user.role === 'Buyer') navigate('/dashboard/buyer')
                else navigate('/')

                window.location.reload() // Refresh state in App.jsx
            } else {
                alert(data.message || "Registration failed")
            }
        } catch (err) {
            console.error("Registration error:", err)
            alert("Registration failed. See console.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
            <div className="glass-effect animate-fade" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '600px', background: 'rgba(20, 30, 20, 0.8)', border: '1px solid var(--glass-border)' }}>

                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <img src={logo} alt="Growaf Logo" style={{ height: '50px', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Join the Ecosystem</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {step === 1 ? 'Basic Information' : step === 2 ? 'Select Your Role' : 'Additional Verification (KYC)'}
                    </p>

                    {/* Step Indicators */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                        <div style={{ width: '40px', height: '5px', background: step >= 1 ? 'var(--primary-green)' : '#333', borderRadius: '5px' }}></div>
                        <div style={{ width: '40px', height: '5px', background: step >= 2 ? 'var(--primary-green)' : '#333', borderRadius: '5px' }}></div>
                        <div style={{ width: '40px', height: '5px', background: step >= 3 ? 'var(--primary-green)' : '#333', borderRadius: '5px' }}></div>
                    </div>
                </div>

                <form onSubmit={step === 3 ? handleSubmit : handleNext}>
                    {/* STEP 1: Basic Account Info */}
                    {step === 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Full Name / Company Name *</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Email Address *</label>
                                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Secure Password *</label>
                                <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Location (City, Country) *</label>
                                <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Nairobi, Kenya" style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                            </div>
                            <button type="submit" style={{ padding: '1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Continue</button>
                        </div>
                    )}

                    {/* STEP 2: Role Selection */}
                    {step === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <h3 style={{ textAlign: 'center' }}>How will you use Growaf?</h3>
                            <div style={{ display: 'grid', gap: '1rem' }}>

                                {/* Role: Buyer */}
                                <div onClick={() => setFormData({ ...formData, role: 'Buyer' })} style={{ padding: '1.5rem', border: formData.role === 'Buyer' ? '2px solid var(--primary-green)' : '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', background: formData.role === 'Buyer' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ fontSize: '2rem' }}>🛒</div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.3rem' }}>Buyer / Agri-Processor</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>I want to purchase crops, machinery, or agricultural products.</p>
                                    </div>
                                </div>

                                {/* Role: Farmer / Vendor */}
                                <div onClick={() => setFormData({ ...formData, role: 'Farmer' })} style={{ padding: '1.5rem', border: formData.role === 'Farmer' ? '2px solid var(--primary-green)' : '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', background: formData.role === 'Farmer' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ fontSize: '2rem' }}>🚜</div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.3rem' }}>Farmer / Vendor</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>I want to list my farm produce, livestock, or machinery for sale.</p>
                                    </div>
                                </div>

                                {/* Role: Expert */}
                                <div onClick={() => setFormData({ ...formData, role: 'Expert' })} style={{ padding: '1.5rem', border: formData.role === 'Expert' ? '2px solid var(--primary-green)' : '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', background: formData.role === 'Expert' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ fontSize: '2rem' }}>🎓</div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.3rem' }}>Agricultural Expert</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>I want to provide consultation, share research, or mentor farmers.</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={handleBack} className="glass-effect" style={{ flex: 1, padding: '1.2rem', borderRadius: 'var(--radius-sm)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Back</button>
                                <button type="submit" style={{ flex: 2, padding: '1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Continue</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Specialized Info (Simulated KYC) */}
                    {step === 3 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(243, 156, 18, 0.1)', borderLeft: '4px solid #f39c12', borderRadius: '4px', marginBottom: '1rem' }}>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#f39c12' }}><strong>Identity Verification:</strong> To maintain an international standard and prevent fraud, additional details are required based on your selected role.</p>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Phone Number *</label>
                                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+234..." style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                            </div>

                            {formData.role === 'Farmer' && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Estimated Farm Size (Hectares)</label>
                                    <input type="number" value={formData.farmSize} onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })} placeholder="e.g. 50" style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                            )}

                            {formData.role === 'Expert' && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Domain of Expertise</label>
                                    <input type="text" value={formData.expertDomain} onChange={(e) => setFormData({ ...formData, expertDomain: e.target.value })} placeholder="e.g. Soil Agronomy, Ag-Tech" style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                            )}

                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input type="checkbox" required />
                                    <span>I agree to the Growaf International Terms of Service, Privacy Policy, and KYC compliance terms.</span>
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" onClick={handleBack} className="glass-effect" style={{ flex: 1, padding: '1.2rem', borderRadius: 'var(--radius-sm)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Back</button>
                                <button type="submit" disabled={loading} style={{ flex: 2, padding: '1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                                    {loading ? 'Creating Secure Profile...' : 'Complete Registration'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>

            </div>
        </div>
    )
}

export default Register
