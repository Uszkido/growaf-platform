import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const VendorDashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('growaf_user')) || null)
    const [token, setToken] = useState(localStorage.getItem('growaf_token') || null)
    const [vendorProducts, setVendorProducts] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [productFormData, setProductFormData] = useState({ name: '', price: '', category_id: 1, description: '', stock: 10 })
    const API_URL = import.meta.env.VITE_API_URL || '/api'

    const categories = [
        { id: 1, name: 'Crops' }, { id: 2, name: 'Livestock' }, { id: 3, name: 'Machinery' },
        { id: 4, name: 'Seeds' }, { id: 5, name: 'Poultry' }, { id: 6, name: 'Organic' },
        { id: 7, name: 'Fish' }, { id: 8, name: 'Fertilizers' }
    ]

    useEffect(() => {
        if (user && token && user.role === 'Farmer') {
            fetchVendorProducts()
        }
    }, [user, token])

    const fetchVendorProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/products`) // In a real app, pass vendor ID query or filter backend
            const data = await res.json()
            // Filter for this specific vendor based on their ID from the decoded token
            // Simulated client-side filter for now
            const myProducts = data.filter(p => p.vendor_id === user.id)
            setVendorProducts(myProducts)
        } catch (err) {
            console.error("Error fetching vendor products:", err)
        }
    }

    const handleCreateProduct = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productFormData)
            })
            if (res.ok) {
                alert("Product listed successfully!")
                setShowAddModal(false)
                fetchVendorProducts() // Refresh list
            } else {
                const errorData = await res.json()
                alert(errorData.message || "Failed to list product")
            }
        } catch (err) {
            console.error("Product creation error:", err)
        }
    }

    // Security Check
    if (!user || user.role !== 'Farmer') {
        return <Navigate to="/" />
    }

    return (
        <div style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div className="container">

                {/* Dashboard Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Vendor Management Portal</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Welcome back, <strong>{user.name}</strong></p>
                    </div>
                    <button onClick={() => setShowAddModal(true)} style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.2rem' }}>+</span> List New Product
                    </button>
                </div>

                {/* Dashboard Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>

                    {/* Sidebar / Quick Stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Overview</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Wallet Balance:</span>
                                    <span style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>₦{Number(user.wallet_balance || 0).toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Active Listings:</span>
                                    <span style={{ fontWeight: 'bold' }}>{vendorProducts.length}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Pending Orders:</span>
                                    <span style={{ fontWeight: 'bold', color: '#f39c12' }}>3</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Quick Links</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Order Management</a></li>
                                <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Payout Settings</a></li>
                                <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Profile Verification (KYC)</a></li>
                                <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Store Settings</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Main View Area: Listings */}
                    <div>
                        <h2 style={{ marginBottom: '2rem' }}>My Live Inventory</h2>

                        {vendorProducts.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                                {vendorProducts.map(product => (
                                    <div key={product.id} className="glass-effect" style={{ borderRadius: 'var(--radius-md)', padding: '1.5rem', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(46, 204, 113, 0.2)', color: 'var(--primary-green)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Active</div>
                                        <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>{product.category_name === 'Seeds' ? '🌱' : product.category_name === 'Crops' ? '🍅' : '🚜'}</div>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h4>
                                        <div style={{ color: 'var(--primary-green)', fontWeight: 'bold', marginBottom: '1rem' }}>₦{Number(product.price).toLocaleString()}</div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button style={{ flex: 1, padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                            <button style={{ flex: 1, padding: '0.5rem', background: 'rgba(231, 76, 60, 0.2)', border: '1px solid rgba(231, 76, 60, 0.5)', color: '#e74c3c', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="glass-effect" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
                                <h3>No Products Listed Yet</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Start building your digital storefront by adding your first agricultural product.</p>
                                <button onClick={() => setShowAddModal(true)} style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                                    Add Your First Product
                                </button>
                            </div>
                        )}
                    </div>

                </div>

            </div>

            {/* Modal - Add Product */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-effect animate-fade" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', width: '500px', position: 'relative' }}>
                        <button onClick={() => setShowAddModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>List New Product</h2>
                        <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <input type="text" placeholder="Product Name" required value={productFormData.name} onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })} style={{ padding: '1rem', background: '#222', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input type="number" placeholder="Price (NGN)" required value={productFormData.price} onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })} style={{ flex: 1, padding: '1rem', background: '#222', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                                <select value={productFormData.category_id} onChange={(e) => setProductFormData({ ...productFormData, category_id: e.target.value })} style={{ flex: 1, padding: '1rem', background: '#222', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }}>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <textarea placeholder="Description" rows="4" value={productFormData.description} style={{ padding: '1rem', background: '#222', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}></textarea>
                            <input type="number" placeholder="Stock Quantity" required value={productFormData.stock} onChange={(e) => setProductFormData({ ...productFormData, stock: e.target.value })} style={{ padding: '1rem', background: '#222', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }} />
                            <button type="submit" style={{ padding: '1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Confirm Listing</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VendorDashboard
