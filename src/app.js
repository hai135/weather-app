const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();
const port = 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './../public')
const viewPath = path.join(__dirname, './../templates/views')
const partialsPath = path.join(__dirname, './../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather page',
        name: 'Hải NT'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Hải NT'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Hải NT'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        });
    } else {
        let { address } = req.query;
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }

            forecast(latitude, longitude, (error, forecastData, linkIcon) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                return res.send({
                    location,
                    forecastData,
                    icon: linkIcon
                })
            })
        })
    }
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 page',
        errorMessage: 'Page not found',
        name: 'Hải NT'
    })
})

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

