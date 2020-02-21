const hbs = require('express-handlebars')
const path = require('path')
const express = require('express')

const app = express()

const getWeather = require('./lib/getWeather')

app.use(express.static(path.join(__dirname, 'public'))) 
 // MAKE SURE THERE ARE TWO __'s
// (express.static)Tell express that this path is static content for the client //(path.join)use path to join these two paths
// dir name - directory name (full path)

app.engine('.hbs', hbs({ // set the view engine to handlebars
    defaultLayout: 'layout',
    extname: '.hbs' // here we are setting the file name to .hbs
}))
app.set('view engine', '.hbs') // tell express to use this engine

app.get('/', async(req,res) => {
    let data = await getWeather()
    let name = data.name
    let lon = data.coord.lon
    let lat = data.coord.lat
    let weatherMain = data.weather[0].main
    let weatherDescription = data.weather[0].description
    let temp = data.main.temp
    let feelsLike = data.main.feels_like
    let pressure = data.main.pressure
    let vis = data.visibility
    let windSpeed = data.wind.speed
    let windDeg = data.wind.deg
    let clouds = data.clouds.all
    let sunrise = data.sys.sunrise
    let sunset = data.sys.sunset

    res.render('index', {name, lon, lat, weatherMain, weatherDescription, temp, feelsLike, pressure, vis, windSpeed, windDeg, clouds, sunrise,sunset}) //this will look for a .hbs with the same name
    console.log(data.body);
    
})
app.listen(3000, () => {
    console.log('server listening on port 3000')
})

app.get('/home', (req, res) => {
    res.render('index')
})
app.get('/blackpool', (req, res) => {
    res.render('blackpool')
})
app.get('/wigan', (req, res) => {
    res.render('wigan')
})
app.get('/london', (req, res) => {
    res.render('london')
})