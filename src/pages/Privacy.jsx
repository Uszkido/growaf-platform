import React from 'react';

const Privacy = () => {
    return (
        <section className="page-transition" style={{ padding: '8rem 0', minHeight: '100vh', background: 'var(--grad-dark)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--white)' }}>Privacy <span style={{ color: 'var(--primary-green)' }}>Policy</span></h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Last Updated: October 2026</p>

                <div style={{ color: '#ccc', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '2rem' }}>At Growaf, accessible from thermal-chromosphere.vercel.app, one of our main priorities is the privacy of our visitors and registered users. This Privacy Policy document contains types of information that is collected and recorded by Growaf and how we use it.</p>

                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginTop: '3rem', marginBottom: '1rem' }}>Information We Collect</h3>
                    <p style={{ marginBottom: '1.5rem' }}>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you register for an Account, we may ask for your contact information, including items such as name, farm name, address, email address, and telephone number.</p>

                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginTop: '3rem', marginBottom: '1rem' }}>How We Use Your Information</h3>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
                        <li>Provide, operate, and maintain our platform</li>
                        <li>Improve, personalize, and expand our platform</li>
                        <li>Understand and analyze how you use our platform</li>
                        <li>Develop new products, services, features, and AI predictions</li>
                        <li>Communicate with you for customer service and support</li>
                    </ul>

                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginTop: '3rem', marginBottom: '1rem' }}>Secure Data Handling (KYC)</h3>
                    <p style={{ marginBottom: '2rem' }}>Growaf implements robust security protocols to protect sensitive documentation submitted during the Vendor Verification (KYC) process. Data is encrypted using AWS standard encryption and is only accessible by authorized compliance personnel.</p>
                </div>
            </div>
        </section>
    );
};

export default Privacy;
