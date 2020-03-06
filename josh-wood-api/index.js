/**
 * @prettier
 */
require('dotenv').config();
const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const JWCAPI = require('./api');
const {
    handleValidationErrors,
    isValidMailChimpRequest,
    isValidZenDeskRequest,
    returnBadResponse
} = require('./api-validation');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

if (IS_PRODUCTION) {
    require('newrelic');
    const bugsnag = require('bugsnag');

    bugsnag.register(process.env.BUGSNAG_API_KEY);
}

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(
    morgan('short', {
        stream: fs.createWriteStream('../access.log', {flags: 'a'})
    })
);

app.get('/', (request, response) => response.json('go to https://www.joshwoodcolour.com'));

app.post(
    '/consultation/unsubscribe',
    [isValidMailChimpRequest, handleValidationErrors],
    (request, response) => {
        JWCAPI.unsubscribeFromMailChimp(request.body.email)
            .then(data => response.json({success: data ? true : false}))
            .catch(error => returnBadResponse(response, [error]));
    }
);

app.post(
    '/consultation/retrieve',
    [isValidMailChimpRequest, handleValidationErrors],
    (request, response) => {
        JWCAPI.getMailChimpMemberData(request.body.email)
            .then(data => response.json(data))
            .catch(error => returnBadResponse(response, [error]));
    }
);

app.post(
    '/contact/create-ticket',
    [isValidZenDeskRequest, handleValidationErrors],
    (request, response) => {
        JWCAPI.postZendeskTicket(request.body)
            .then(data => response.json(data))
            .catch(error => returnBadResponse(response, [error]));
    }
);

const server = http.createServer(app);

server.listen(port);
server.on('listening', () => console.log(`Server listening at localhost:${port}`));
