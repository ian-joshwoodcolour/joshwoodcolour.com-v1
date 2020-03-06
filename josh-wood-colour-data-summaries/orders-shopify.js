/**
 * @prettier
 */
const chalk = require('chalk');
const fs = require('fs');
const flatMap = require('lodash.flatmap');
const jsonexport = require('jsonexport');
const Shopify = require('shopify-api-node');

const log = console.log;

const shopify = new Shopify({
    shopName: 'josh-wood-colour',
    apiKey: process.env.SHOPIFY_API_KEY,
    password: process.env.SHOPIFY_API_PASSWORD
});

const arrayToObject = array => {
    return array.reduce((prev, cur) => {
        prev[cur] = '';
        return prev;
    }, {});
};

const setUniqueItems = orders => {
    const uniqueItems = new Set();

    orders.map(order => {
        order.line_items.map(item => uniqueItems.add(item.title));
    });

    const uniqueItemsSorted = [...uniqueItems].sort((a, b) => a.localeCompare(b));

    return uniqueItemsSorted;
};

const setOrderGroup = (allItems, order) => {
    const obj = arrayToObject([...['id'], ...allItems]);
    const orderItems = flatMap(
        order.line_items.map(item => [...Array(item.quantity)].map(i => item.title))
    );

    Object.keys(obj).map(key => {
        if (key === 'id') {
            obj[key] = order.id;
        } else {
            obj[key] = orderItems.filter(item => item === key).length;
        }
    });

    return obj;
};

const saveSummaryToFile = data => {
    jsonexport(data, (error, output) => {
        fs.writeFile('./orders-shopify.csv', output, 'utf-8', writeError => {
            if (writeError) {
                log(chalk.black.bgRed('SUMMARISING error saving CSV file'));
            } else {
                log(chalk.black.bgGreen('SUMMARISING saved to CSV'));
            }
        });
    });
};

const summariseOrders = orders => {
    const items = setUniqueItems(orders);
    const groupedItems = orders.map(order => setOrderGroup(items, order));

    saveSummaryToFile(groupedItems);
};

async function fetchOrders(page = 1) {
    log(chalk.yellow(`FETCHING orders – page ${page}`));

    return shopify.order.list({fields: 'id, line_items', limit: 250, page, status: 'any'});
}

async function fetchAllOrders(prevOrders = [], page = 1) {
    const newOrders = await fetchOrders(page);

    if (newOrders.length) {
        return fetchAllOrders([...prevOrders, ...newOrders], page + 1);
    } else {
        return prevOrders;
    }
}

async function fetchAndSaveOrders() {
    log(chalk.black.bgYellow('FETCHING orders'));

    const orders = await fetchAllOrders();

    fs.writeFile('./orders-shopify.json', JSON.stringify(orders, null, 4), 'utf-8', error => {
        if (error) {
            log(chalk.black.bgRed(error));
        } else {
            log(chalk.black.bgGreen('FETCHED orders'));
            log(chalk.black.bgWhite('Please rerun this task'));
        }
    });
}

function init() {
    fs.readFile('./orders-shopify.json', (error, data) => {
        if (!data) {
            log(chalk.black.bgWhite('No orders found'));

            return fetchAndSaveOrders();
        }

        log(chalk.black.bgYellow('SUMMARISING orders'));

        summariseOrders(JSON.parse(data));
    });
}

init();
