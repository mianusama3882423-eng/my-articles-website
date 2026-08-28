const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());

const DATA_FILE = './articles.json';

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.get('/api/articles', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

app.post('/api/articles', (req, res) => {
    const articles = JSON.parse(fs.readFileSync(DATA_FILE));
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
    fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2));
    res.json({ message: "Article Published!", article: newArticle });
});

app.put('/api/articles/:id/view', (req, res) => {
    let articles = JSON.parse(fs.readFileSync(DATA_FILE));
    const article = articles.find(a => a.id === req.params.id);
    if (article) {
        article.views += 1;
        fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2));
        res.json(article);
    } else {
        res.status(404).json({ error: "Not Found" });
    }
});

const PORT = process.env.PORT || 5000;
// Old app.listen ko hata kar ye export likhein:
module.exports = app;
