const sms = require('../configure/africastalking.configure.js');

const sendOtp = async (phoneNumber, message) => {
    const options = {
        to: [phoneNumber],
        message: message,
        from: 'aftkng'
    };

    try{
        const response = await sms.send(options);
        return response;
    }
    catch (error){
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
}

module.exports = sendOtp