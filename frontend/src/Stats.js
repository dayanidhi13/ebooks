import React from 'react';

const Stats = ({ stats, total }) => (
    <div style={{
            maxWidth: '800px',
            margin: '20px auto',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px'
    }}>
            <h3 style={{ marginBottom: '10px' }}>Statistics</h3>
            <p><strong>Total Results:</strong> {total}</p>
            <p><strong>Most Common Author:</strong> {stats.mostCommonAuthor || 'N/A'}</p>
            <p><strong>Earliest Publication Date:</strong> {stats.earliest || 'N/A'}</p>
            <p><strong>Latest Publication Date:</strong> {stats.latest || 'N/A'}</p>
            <p><strong>Server Response Time:</strong> {stats.responseTime || 'N/A'}</p>
    </div>
);

export default Stats;
