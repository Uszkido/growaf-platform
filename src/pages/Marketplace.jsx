import React, { useState, useEffect } from 'react'

const Marketplace = () => {
    const [products, setProducts] = useState([])
    const [activeTab, setActiveTab] = useState('all')
    const API_URL = 'http://localhost:5000/api'

    const categories = [
        { id: 1, name: 'Crops', icon: '🌾' },
        { id: 2, name: 'Livestock', icon: '🐄' },
        { id: 3, name: 'Machinery', icon: '🚜' },
        { id: 4, name: 'Seeds', icon: '🌱' },
        { id: 5, name: 'Poultry', icon: '🐔' },
        { id: 6, name: 'Organic', icon: '🥗' },
        { id: 7, name: 'Fish', icon: '🐟' },
        { id: 8, name: 'Fertilizers', icon: '🧪' }
    ]

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/products`)
            const data = await res.json()
            setProducts(data)
        } catch (err) {
            console.error("Error fetching products:", err)
        }
    }

    const filteredProducts = activeTab === 'all'
        ? products
        : products.filter(p => p.category_name.toLowerCase() === activeTab)

    return (
        <>
            {/* Categories Section */}
            <section style={{ padding: '6rem 0', background: 'var(--grad-dark)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>Marketplace Categories</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Explore specialized sections for all your farming needs.</p>
                        </div>
                        <button onClick={() => setActiveTab('all')} style={{ background: 'none', border: 'none', color: 'var(--primary-green)', fontWeight: '600', cursor: 'pointer' }}>View All Categories</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem' }}>
                        {categories.map((cat) => (
                            <div key={cat.name} className="glass-effect" onClick={() => setActiveTab(cat.name.toLowerCase())} style={{ padding: '2rem 1rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', cursor: 'pointer', outline: activeTab === cat.name.toLowerCase() ? '2px solid var(--primary-green)' : 'none', transition: 'transform 0.3s ease' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{cat.icon}</div>
                                <h3 style={{ fontSize: '1.1rem' }}>{cat.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Marketplace Grid */}
            <section id="marketplace" style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.01)', minHeight: '60vh' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Live Marketplace</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Every product here is provided by verified Growaf vendors across Africa.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                            <div key={product.id} className="glass-effect" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.3s ease' }}>
                                <div style={{ height: '220px', background: 'var(--grad-dark)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                                    {product.category_name === 'Seeds' ? '🌱' : product.category_name === 'Crops' ? '🍅' : '🚜'}
                                    <div style={{ position: 'absolute', top: '15px', right: '15px', padding: '0.3rem 0.8rem', background: 'rgba(0,0,0,0.5)', borderRadius: '100px', fontSize: '0.8rem' }}>⭐ {product.rating || 'New'}</div>
                                </div>
                                <div style={{ padding: '1.8rem' }}>
                                    <div style={{ color: 'var(--primary-green)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{product.category_name}</div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>{product.name}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>by {product.store_name || 'Vendor'}</span>
                                        <span style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary-green)' }}>₦{Number(product.price).toLocaleString()}</span>
                                    </div>
                                    <button style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--grad-green)', color: 'var(--white)', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Add to Cart</button>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No live products found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Marketplace
