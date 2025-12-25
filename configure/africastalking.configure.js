// here is a configuration file to add the Africa's Talking API setup

require('dotenv').config();
const Africastalking = require('africastalking');

const apiCredentials = {
    apiKey: 'atsk_2403d1b002faf91952d8c5e5e78c314563e71a2ecda0bb11ea82ad2dcc1a87b85556269c',
    username: 'kaybee'
}

const africastalking = Africastalking(apiCredentials);

const sms = africastalking.SMS;

module.exports = sms;
