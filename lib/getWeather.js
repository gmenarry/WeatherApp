const request = require('request')
const {promisify} = require('util')

const promisifiedRequest = promisify(request)
require('dotenv').config()

const getWeather = async () => {
    let data = await promisifiedRequest({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=Blackpool,uk&APPID=${process.env.APPID}`,
        json: true
    })
    return data.body
}

module.exports = getWeather