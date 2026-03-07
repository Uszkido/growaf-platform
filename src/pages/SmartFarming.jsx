import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SmartFarming = () => {
    // State for Pest Detection
    const [imagePreview, setImagePreview] = useState(null)
    const [scanLoading, setScanLoading] = useState(false)
    const [scanResult, setScanResult] = useState(null)

    // State for IoT Data
    const [iotData, setIotData] = useState([])
    const [yieldData, setYieldData] = useState([])
    const [iotLoading, setIotLoading] = useState(true)

    const API_URL = import.meta.env.VITE_API_URL || '/api'

    // Fetch initial IoT and Yield Data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch Historical IoT Data
                const iotRes = await fetch(`${API_URL}/iot/history`)
                const iotResData = await iotRes.json()
                if (iotResData.data) {
                    setIotData(iotResData.data)
                }

                // Fetch Yield Prediction Data
                const yieldRes = await fetch(`${API_URL}/ai/yield-prediction`)
                const yieldResData = await yieldRes.json()
                if (yieldResData.data) {
                    setYieldData(yieldResData.data)
                }
            } catch (err) {
                console.error("Failed to load dashboard data.", err)
            } finally {
                setIotLoading(false)
            }
        }
        fetchDashboardData()
    }, [API_URL])

    // Handle Image Upload for Pest Detection
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
            setScanResult(null) // Reset previous scan
        }
    }

    const handleScanImage = async () => {
        if (!imagePreview) return
        setScanLoading(true)
        setScanResult(null)

        try {
            // Note: For a real deployment, we would use FormData to send the file blob.
            // For this functional mockup, we can simulate an API call to processing.
            const res = await fetch(`${API_URL}/ai/pest-detect`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageProcessed: true }) // Placeholder body
            })
            const data = await res.json()
            setScanResult(data)
        } catch (err) {
            console.error("Scan error", err)
            setScanResult({ error: "Failed to connect to the AI vision service." })
        } finally {
            setScanLoading(false)
        }
    }

    return (
        <section className="page-transition" style={{ padding: '8rem 0', background: 'var(--grad-dark)', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="badge" style={{ display: 'inline-block', padding: '0.5rem 1.2rem', borderRadius: '100px', background: 'rgba(46, 204, 113, 0.1)', color: 'var(--primary-green)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
                        Powered by Growaf Ecosystem Analytics
                    </div>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.1' }}>Advanced <span style={{ color: 'var(--primary-green)' }}>Smart Farming</span> Suite</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '1.2rem' }}>
                        Harness the power of AI Vision and real-time IoT sensors to protect your crops and predict your financial yield months in advance.
                    </p>
                </div>

                {/* 1. Pest Detection Tool */}
                <div className="glass-effect" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 400px' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>AI Pest Detection Center</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Upload a high-resolution photo of affected crop leaves or visible pests. Our proprietary AI Vision Engine will instantly analyze the biological markers, identify the threat, and formulate a targeted, sustainable eradication plan.
                            </p>

                            <div style={{ border: '2px dashed #444', borderRadius: '8px', padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.3)', marginBottom: '1.5rem', position: 'relative' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                />
                                {imagePreview ? (
                                    <p style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>Image Selected. Tap anywhere here to change.</p>
                                ) : (
                                    <>
                                        <div style={{ fontSize: '2rem', color: '#666', marginBottom: '1rem' }}>📸</div>
                                        <p style={{ color: '#aaa' }}>Drag & drop or click to upload a photo of your crop</p>
                                    </>
                                )}
                            </div>

                            <button
                                onClick={handleScanImage}
                                disabled={!imagePreview || scanLoading}
                                style={{
                                    padding: '1.2rem', background: imagePreview ? 'var(--grad-green)' : '#333',
                                    color: imagePreview ? 'white' : '#777', fontWeight: 'bold', width: '100%', border: 'none',
                                    borderRadius: 'var(--radius-sm)', cursor: imagePreview && !scanLoading ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.3s ease'
                                }}>
                                {scanLoading ? 'Scanning Biological Data...' : 'Start AI Scan'}
                            </button>
                        </div>

                        <div style={{ flex: '1 1 400px', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                            <h4 style={{ color: '#aaa', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Analysis Output Array</h4>

                            {!imagePreview && !scanResult && (
                                <div style={{ margin: 'auto', textAlign: 'center', color: '#555' }}>Awaiting image upload for vision processing...</div>
                            )}

                            {imagePreview && (
                                <div style={{ marginBottom: scanLoading || scanResult ? '1.5rem' : 'auto', textAlign: 'center' }}>
                                    <div style={{ width: '150px', height: '150px', margin: '0 auto', borderRadius: '50%', overflow: 'hidden', border: '4px solid #333', position: 'relative' }}>
                                        <img src={imagePreview} alt="Crop Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        {scanLoading && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(46, 204, 113, 0.4)', animation: 'pulse 1s infinite alternate' }}></div>}
                                    </div>
                                </div>
                            )}

                            {scanLoading && (
                                <div style={{ margin: 'auto', textAlign: 'center' }}>
                                    <p style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>Running Vision Algorithms...</p>
                                </div>
                            )}

                            {scanResult && !scanResult.error && (
                                <div className="animate-fade" style={{ background: 'rgba(46, 204, 113, 0.1)', borderLeft: '4px solid var(--primary-green)', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                                    <h5 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Threat Detected: <span style={{ color: '#e74c3c' }}>{scanResult.diagnosis}</span></h5>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.8rem' }}>
                                        <span style={{ background: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c', padding: '2px 8px', borderRadius: '4px' }}>Confidence: {(scanResult.confidence * 100).toFixed(1)}%</span>
                                        <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ccc', padding: '2px 8px', borderRadius: '4px' }}>Severity: {scanResult.severity}</span>
                                    </div>
                                    <p style={{ color: '#ddd', lineHeight: '1.5', fontSize: '0.95rem', marginBottom: '1rem' }}>{scanResult.description}</p>
                                    <h6 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem', fontSize: '1rem' }}>Action Plan:</h6>
                                    <ul style={{ listStylePosition: 'inside', color: '#ccc', fontSize: '0.9rem', margin: 0, padding: 0 }}>
                                        {scanResult.treatment.map((step, idx) => (
                                            <li key={idx} style={{ marginBottom: '0.5rem' }}>{step}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {scanResult && scanResult.error && (
                                <div className="animate-fade" style={{ margin: 'auto', textAlign: 'center', color: '#e74c3c' }}>
                                    <p>{scanResult.error}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. IoT and Yield Data Dashboards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'stretch' }}>

                    {/* IoT Real-Time Monitoring */}
                    <div className="glass-effect" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📡 Live Sensor Telemetry</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Real-time 24-hour monitoring of Section A.</p>
                            </div>
                            <span className="badge" style={{ background: 'rgba(46, 204, 113, 0.2)', color: 'var(--primary-green)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>• Live</span>
                        </div>

                        {iotLoading ? (
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>Synchronizing Base Station...</div>
                        ) : (
                            <div style={{ flex: 1, minHeight: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={iotData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="time" stroke="#555" tick={{ fill: '#888' }} />
                                        <YAxis stroke="#555" tick={{ fill: '#888' }} />
                                        <RechartsTooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: 'white' }} itemStyle={{ color: 'white' }} />
                                        <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                        <Area type="monotone" dataKey="moisture" stroke="#3498db" fillOpacity={1} fill="url(#colorMoisture)" name="Moisture (%)" />
                                        <Area type="monotone" dataKey="ph" stroke="#2ecc71" fillOpacity={1} fill="url(#colorPh)" name="Soil pH" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #333' }}>
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(52, 152, 219, 0.1)', borderRadius: '8px' }}>
                                <p style={{ color: '#3498db', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Current Moisture</p>
                                <p style={{ fontSize: '1.8rem', color: 'white' }}>{iotData.length > 0 ? iotData[iotData.length - 1].moisture : '--'}%</p>
                            </div>
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(46, 204, 113, 0.1)', borderRadius: '8px' }}>
                                <p style={{ color: 'var(--primary-green)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Current pH Level</p>
                                <p style={{ fontSize: '1.8rem', color: 'white' }}>{iotData.length > 0 ? iotData[iotData.length - 1].ph : '--'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Yield Prediction Forecast */}
                    <div className="glass-effect" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📈 Market Yield Forecast</h3>
                            <p style={{ color: 'var(--text-muted)' }}>AI-Simulated 9-Month Price and Harvest Volume Trajectory.</p>
                        </div>

                        {iotLoading ? (
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>Generating Quantum Forecasts...</div>
                        ) : (
                            <div style={{ flex: 1, minHeight: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="month" stroke="#555" tick={{ fill: '#888' }} />
                                        <YAxis yAxisId="left" stroke="#555" tick={{ fill: '#888' }} />
                                        <YAxis yAxisId="right" orientation="right" stroke="#555" tick={{ fill: '#888' }} />
                                        <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                        <RechartsTooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: 'white' }} itemStyle={{ color: 'white' }} />
                                        <Line yAxisId="left" type="monotone" dataKey="volume" stroke="#9b59b6" activeDot={{ r: 8 }} strokeWidth={3} name="Est. Harvest Volume (Tons)" />
                                        <Line yAxisId="right" type="monotone" dataKey="price" stroke="#f1c40f" strokeWidth={3} name="Market Price (₦/Ton)" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        <div style={{ background: 'rgba(241, 196, 15, 0.1)', borderLeft: '4px solid #f1c40f', padding: '1.5rem', borderRadius: '0 8px 8px 0', marginTop: '2rem' }}>
                            <h5 style={{ color: '#f1c40f', marginBottom: '0.5rem', fontSize: '1.1rem' }}>AI Market Strategy Advisory:</h5>
                            <p style={{ color: '#ddd', fontSize: '0.9rem', lineHeight: '1.6' }}>The predictive model indicates a peak market price per ton in <strong>Q3 (Sept-Oct)</strong>. It is highly advised to optimize fertilizer schedules to align harvest windows with this deficit-driven economic surge to maximize profit margins.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SmartFarming;
