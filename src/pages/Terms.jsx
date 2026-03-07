import React from 'react';

const Terms = () => {
    return (
        <section className="page-transition" style={{ padding: '8rem 0', minHeight: '100vh', background: 'var(--grad-dark)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--white)' }}>Terms of <span style={{ color: 'var(--primary-green)' }}>Service</span></h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Last Updated: October 2026</p>

                <div style={{ color: '#ccc', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '2rem' }}>Welcome to Growaf. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Growaf if you do not agree to take all of the terms and conditions stated on this page.</p>

                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginTop: '3rem', marginBottom: '1rem' }}>1. Vendor Responsibilities</h3>
                    <p style={{ marginBottom: '1.5rem' }}>As a verified vendor on the Growaf network, you agree to list products accurately. Misrepresentation of agricultural goods, including but not limited to incorrect weight, compromised quality, or deliberate false advertising, will result in immediate suspension and forfeiture of escrowed funds back to the buyer.</p>

                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginTop: '3rem', marginBottom: '1rem' }}>2. Financial Transactions & Escrow</h3>
                    <p style={{ marginBottom: '1.5rem' }}>All transactions initiated through the Growaf platform are subject to our Escrow security policies. Funds are held in trust until the buyer confirms receipt of the goods. Growaf assumes a standard service fee of 2.5% per successful transaction.</p>

                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginTop: '3rem', marginBottom: '1rem' }}>3. AI Artificial Intelligence Advice</h3>
                    <p style={{ marginBottom: '2rem' }}>The Smart Farming Hub, including the Crop Advisor and Pest Detection Vision Models, provide recommendations based on available agronomic data. These are suggestions and should not replace professional, localized on-site agronomist consultations. Growaf is not liable for crop failure due to misinterpretations of AI advice.</p>
                </div>
            </div>
        </section>
    );
};

export default Terms;
