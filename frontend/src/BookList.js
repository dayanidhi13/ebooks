import React, { useState } from 'react';

const BookList = ({ books }) => {
    const [expandedId, setExpandedId] = useState(null);

    if (!books || books.length === 0) {
        return <p>No books found.</p>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            {books.map((book, index) => {
                const {
                    title = 'Untitled',
                    authors = ['Unknown Author'],
                    subtitle = '',
                    description = 'No description available.',
                    publisher = 'N/A',
                    publishedDate = 'N/A',
                    pageCount = 'N/A',
                    previewLink = '#',
                    thumbnail = '' // NEW: receive thumbnail here
                } = book;

                return (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            display: 'flex',
                            gap: '15px'
                        }}
                    >
                        {thumbnail && (
                            <img
                                src={thumbnail}
                                alt={title}
                                style={{ width: '80px', height: 'auto', objectFit: 'contain' }}
                            />
                        )}

                        <div style={{ flex: 1 }}>
                            <div
                                onClick={() => setExpandedId(expandedId === index ? null : index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <p style={{ fontWeight: 'bold', margin: '0' }}>
                                    {index + 1}. {title}
                                </p>
                                <p style={{ fontStyle: 'italic', fontSize: '14px', margin: '0' }}>
                                    {authors.join(', ')}{subtitle && ` - ${subtitle}`}
                                </p>
                            </div>
                            <button
                                onClick={() => window.open(previewLink, "_blank")}
                                style={{ marginTop: '5px' }}
                            >
                                View
                            </button>

                            {expandedId === index && (
                                <div style={{ marginTop: '10px', fontSize: '14px' }}>
                                    <p><strong>Description:</strong> {description}</p>
                                    <p><strong>Publisher:</strong> {publisher}</p>
                                    <p><strong>Published:</strong> {publishedDate}</p>
                                    <p><strong>Pages:</strong> {pageCount}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BookList;
