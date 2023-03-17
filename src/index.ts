import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import { getSentiment } from './utils/getSentiment';

/** PORT */
const PORT = process.env.PORT || 3000;

/**
 * Create http and socket.io server
 */
const app = express();
const server = http.createServer(app);

/**
 * Middlewares
 */

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

// Serve static directory
app.use(express.static(path.join(__dirname, '../public')))


/** Routes */
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/analyze', (req, res) => {
    const text = req.query.text as string;
    const sentimentScore = getSentiment(text);

    // console.log(sentimentScore); // Debug
    res.json({
        score: sentimentScore
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
