import React from 'react';

const HelpCenter = () => {
    return (
        <section className="page-transition" style={{ padding: '8rem 0', minHeight: '100vh', background: 'var(--grad-dark)' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Help & <span style={{ color: 'var(--primary-green)' }}>Support</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        How can we assist you today? Search our knowledge base or contact the Growaf support team directly.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                    {/* FAQ Section */}
                    <div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Frequently Asked Questions</h3>

                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                            <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>How do I become a verified vendor?</h4>
                            <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '0.9rem' }}>You must sign up as a 'Vendor', proceed to the Vendor Dashboard, and submit your local farm registration and identification documents through our secure KYC portal.</p>
                        </div>

                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                            <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Is my payment secure?</h4>
                            <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '0.9rem' }}>Yes. All transactions are routed through our Escrow smart-contract logic and processed by Paystack. Funds are not released to the farmer until delivery is confirmed.</p>
                        </div>

                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                            <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>How does the AI Crop Advisor work?</h4>
                            <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '0.9rem' }}>Our AI models are trained on specific African agronomic data. By uploading an image of a pest or describing your soil, the AI cross-references thousands of data points to suggest a solution.</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-effect" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Contact Us</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Send a message directly to our agronomic or technical support teams.</p>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', color: '#ccc', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Name</label>
                                <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '1rem', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#ccc', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                                <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '1rem', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#ccc', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Message</label>
                                <textarea placeholder="Describe your issue..." rows="5" style={{ width: '100%', padding: '1rem', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px', resize: 'vertical' }}></textarea>
                            </div>
                            <button type="button" style={{ padding: '1.2rem', background: 'var(--grad-green)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpCenter;
