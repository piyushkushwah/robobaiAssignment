const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/database');
const bodyParser = require('body-parser');

const app = express();
const product = require('./routes/product');

//Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect mongodb database //
mongoose
    .connect(db.mongoURI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    .then(e => {
        console.log('MongoDB connected...');
    })
    .catch(err => console.error(err));

app.use('/api/product', product);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});