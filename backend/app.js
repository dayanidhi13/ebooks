const express = require('express');
const cors = require('cors');
const booksRouter = require('./books'); // changed this line

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/api/books', booksRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
