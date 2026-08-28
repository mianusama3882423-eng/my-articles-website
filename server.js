const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Temporary memory store for Vercel Serverless
let articles = [
    {
        id: "1",
        title: "Welcome to My Article Site",
        category: "Tech",
        excerpt: "Your website is live and running smoothly on Vercel serverless functions!",
        content: "First article content...",
        views: 1
    }
];

app.get('/api/articles', (req, res) => {
    res.json(articles);
});

app.post('/api/articles', (req, res) => {
    const newArticle = {
        id: Date.now().toString(),
        title: req.body.title,
        category: req.body.category,
        excerpt: req.body.excerpt,
        content: req.body.content,
        views: 0,
        date: new Date().toLocaleDateString()
    };
    articles.unshift(newArticle);
    res.json({ message: "Article Published!", article: newArticle });
});

app.put('/api/articles/:id/view', (req, res) => {
    const article = articles.find(a => a.id === req.params.id);
    if (article) {
        article.views += 1;
        res.json(article);
    } else {
        res.status(404).json({ error: "Not Found" });
    }
});

module.exports = app;
