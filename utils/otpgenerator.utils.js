// here is a code to generate a 4-digit OTP
const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

module.exports = { generateOtp }