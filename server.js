const express = require('express');
const app = express();
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const dateToNatural = (date) => `${MONTHS[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;

const getDateObject = (date) => {
    const parsedDate = +date || Date.parse(date);
    const dateObj = new Date((+date || parsedDate));
    return Number.isSafeInteger(parsedDate) ? {
        unix: +dateObj,
        natural: dateToNatural(dateObj)
    } : {
        unix: null,
        natural: null
    };
};

app.get('/:date', (req, res) => {
    res.status(200)
        .json(getDateObject(req.params.date));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(process.env.PORT || 8080);