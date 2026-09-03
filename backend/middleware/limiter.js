const ratelimit = require('express-rate-limit');


const limiter = ratelimit({
    windowMs : 15*60*1000,
    max : 100,
    standardHeaders : true,
    legacyHeaders : false,
    message : {error: "Too many requests, please try again later"}
})

const loginLimiter = ratelimit({
    windowMs : 10 * 60 * 1000,
    max : 5,
    message : {error : "Too many login attempts, please try again later"},
    legacyHeaders : false,
    standardHeaders : true
})
module.exports = {
    limiter,
    loginLimiter
}