import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import './App.css';

function App() {
    const [books, setBooks] = useState([]);
    const [stats, setStats] = useState({});
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        setLoading(true);
        const startIndex = (page - 1) * 5;

        try {
            const start = Date.now();
            const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=5`
            );
            const data = await res.json();
            console.log('API Response:', data);

            const end = Date.now();
            const items = data.items || [];

            const authors = items.flatMap(item =>
                item.volumeInfo.authors || ['Unknown']
            );
            const mostCommonAuthor =
                authors.sort(
                    (a, b) =>
                        authors.filter(v => v === b).length -
                        authors.filter(v => v === a).length
                )[0] || 'N/A';

            const pubDates = items
                .map(item => item.volumeInfo.publishedDate?.substring(0, 4))
                .filter(Boolean)
                .map(Number);
            const earliest = Math.min(...pubDates);
            const latest = Math.max(...pubDates);

            setBooks(items);
            setStats({
                total: data.totalItems,
                mostCommonAuthor,
                earliest,
                latest,
                responseTime: end - start,
            });
        } catch (error) {
            console.error('Fetch error:', error);
            setBooks([]);
            setStats({});
        }
        setLoading(false);
    };

    useEffect(() => {
        if (query.trim()) {
            fetchBooks();
        }
    }, [page, query]);

    const handleSearch = e => {
        e.preventDefault();
        console.log('Searching for:', query);
        setPage(1); // triggers fetch via useEffect
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
            <h1 style={{ textAlign: 'center' }}>Google Books Search</h1>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10 }}>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search books..."
                    style={{ flex: 1, padding: 8 }}
                />
                <button type="submit" style={{ padding: '8px 16px' }}>
                    Search
                </button>
            </form>

            <div style={{ marginTop: 20 }}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <BookList
                        books={books.map(book => ({
                            title: book.volumeInfo.title,
                            authors: book.volumeInfo.authors,
                            subtitle: book.volumeInfo.subtitle,
                            description: book.volumeInfo.description,
                            publisher: book.volumeInfo.publisher,
                            publishedDate: book.volumeInfo.publishedDate,
                            pageCount: book.volumeInfo.pageCount,
                            previewLink: book.volumeInfo.previewLink,
                            thumbnail: book.volumeInfo.imageLinks?.thumbnail // <-- this line adds image
                        }))}

                    />
                )}
            </div>

            {stats.total != null && (
                <div style={{ border: '1px solid #ccc', padding: 10 }}>
                    <h3>Statistics</h3>
                    <p>Total Results: {stats.total}</p>
                    <p>Most Common Author: {stats.mostCommonAuthor}</p>
                    <p>Earliest Publication Date: {stats.earliest}</p>
                    <p>Latest Publication Date: {stats.latest}</p>
                    <p>Server Response Time: {stats.responseTime}ms</p>
                </div>
            )}

            {books.length > 0 && (
                <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                    <button onClick={() => setPage(p => Math.max(p - 1, 1))}>
                        Previous
                    </button>
                    <span>Page: {page}</span>
                    <button onClick={() => setPage(p => p + 1)}>Next</button>
                </div>
            )}
        </div>
    );
}

export default App;
