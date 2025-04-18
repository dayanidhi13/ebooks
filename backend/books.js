const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { q, limit = 10, startIndex = 0 } = req.query;
    const API_KEY = '<YOUR_GOOGLE_BOOKS_API_KEY>';
    const startTime = Date.now();

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
            params: {
                q,
                maxResults: limit,
                startIndex,
                key: API_KEY,
            },
        });


        const data = response.data.items || [];
        let authorCount = {};
        let earliest = '9999';
        let latest = '0000';

        const books = data.map((item) => {
            const info = item.volumeInfo;
            const authors = info.authors || ['Unknown Author'];
            git add .

                const publishedDate = info.publishedDate || '0000';

            authors.forEach((a) => {
                authorCount[a] = (authorCount[a] || 0) + 1;
            });

            if (publishedDate < earliest) earliest = publishedDate;
            if (publishedDate > latest) latest = publishedDate;

            return {
                id: item.id,
                authors,
                title: info.title || 'No Title',
                description: info.description || 'No description found. Imagine a thrilling adventure!',
                publishedDate,
            };
        });

        const mostCommonAuthor = Object.keys(authorCount).reduce((a, b) =>
            authorCount[a] > authorCount[b] ? a : b
        );

        const endTime = Date.now();

        res.json({
            totalItems: response.data.totalItems,
            books,
            stats: {
                mostCommonAuthor,
                earliest,
                latest,
                responseTime: `${endTime - startTime} ms`,
            },
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books.' });
    }
});

module.exports = router;
