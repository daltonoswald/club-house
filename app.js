const express = require('express');
const indexRouter = require('./routes/indexRoutes');

const path = require('node:path');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => console.log(`Club House listening on port ${PORT}`));