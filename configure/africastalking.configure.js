// here is a configuration file to add the Africa's Talking API setup

require('dotenv').config();
const Africastalking = require('africastalking');

const apiCredentials = {
    apiKey: process.env.AT_API_KEY,
    username: process.env.AT_USERNAME
}

const africastalking = Africastalking(apiCredentials);

const sms = africastalking.SMS;

module.exports = sms;
