/**
 * @prettier
 */
require('dotenv').config();
const md5 = require('md5');
const MailChimpAPI = require('mailchimp-api-v3');
const zendeskAPI = require('node-zendesk');

const mailChimp = new MailChimpAPI(process.env.MAILCHIMP_API_KEY);
const zendesk = zendeskAPI.createClient({
    debug: process.env.NODE_ENV === 'development',
    remoteUri: `https://${process.env.ZENDESK_USERNAME}.zendesk.com/api/v2`,
    token: process.env.ZENDESK_API_KEY,
    username: process.env.ZENDESK_API_USERNAME
});

const getMailChimpMemberData = (email = '') => {
    return new Promise((resolve, reject) => {
        const emailHash = md5(email.toLowerCase());

        mailChimp
            .request({
                method: 'get',
                path: `/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHash}`
            })
            .then(result => {
                if (result && result.statusCode === 200) {
                    resolve(result.merge_fields);
                } else {
                    reject('Invalid response');
                }
            })
            .catch(reject);
    });
};

const unsubscribeFromMailChimp = (email = '') => {
    return new Promise((resolve, reject) => {
        const emailHash = md5(email.toLowerCase());

        getMailChimpMemberData(email)
            .then(data => {
                if (data) {
                    mailChimp
                        .request({
                            method: 'patch',
                            path: `/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHash}`,
                            body: {status: 'unsubscribed'}
                        })
                        .then(resolve)
                        .catch(reject);
                }
            }, reject)
            .catch(reject);
    });
};

const postZendeskTicket = data => {
    return new Promise((resolve, reject) => {
        const ticket = {
            ticket: {
                subject: 'Website Contact Form',
                comment: {
                    body: data.description
                },
                custom_fields: [
                    {
                        id: 114103519812,
                        value: data.subject
                    },
                    {
                        id: 114103583511,
                        value: data.order_number
                    },
                    {
                        id: 114103583471,
                        value: data.first_name
                    },
                    {
                        id: 114103519612,
                        value: data.last_name
                    },
                    {
                        id: 114103519632,
                        value: data.email
                    }
                ],
                requester: {
                    email: data.email,
                    name: `${data.first_name} ${data.last_name}`
                }
            }
        };

        zendesk.tickets.create(ticket, (error, request, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({ticket_id: result.id});
            }
        });
    });
};

module.exports = {
    getMailChimpMemberData,
    unsubscribeFromMailChimp,
    postZendeskTicket
};
