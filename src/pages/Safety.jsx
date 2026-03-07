import React from 'react';

const Safety = () => {
    return (
        <section className="page-transition" style={{ padding: '8rem 0', minHeight: '100vh', background: 'var(--grad-dark)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div className="badge" style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '100px', background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(231, 76, 60, 0.3)', marginBottom: '1.5rem' }}>
                        Platform Guarantee
                    </div>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Trust & <span style={{ color: 'var(--primary-green)' }}>Safety Center</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        Your security is our highest priority. Learn how Growaf protects your transactions and ensures the quality of agricultural products across Africa.
                    </p>
                </div>

                <div className="glass-effect" style={{ padding: '4rem', borderRadius: 'var(--radius-lg)', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '3rem' }}>
                        <div style={{ fontSize: '3rem', color: 'var(--primary-green)' }}>🔒</div>
                        <div>
                            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Smart Escrow System</h3>
                            <p style={{ color: '#aaa', lineHeight: '1.6' }}>When a buyer purchases a product, the funds are held securely by Growaf. The payment is only released to the vendor once the buyer confirms delivery and product quality. If there is a dispute, our escrow holds the funds until a resolution is reached.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '3rem' }}>
                        <div style={{ fontSize: '3rem', color: 'var(--primary-green)' }}>🛡️</div>
                        <div>
                            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Rigorous Vendor KYC</h3>
                            <p style={{ color: '#aaa', lineHeight: '1.6' }}>Every vendor on the platform must undergo strict Know Your Customer (KYC) verification. They are required to submit government-issued IDs, farm registration details, and geo-location data, which is verified by our team before they can list products.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: '3rem', color: 'var(--primary-green)' }}>⚖️</div>
                        <div>
                            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Dispute Resolution Protocol</h3>
                            <p style={{ color: '#aaa', lineHeight: '1.6' }}>In the rare event of a disagreement regarding product quality or logistics, Growaf steps in as an impartial arbitrator. Both parties upload photographic proof and chat logs to our support center for a swift, fair resolution.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Safety;
