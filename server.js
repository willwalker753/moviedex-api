const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const MOVIES = require('./movies-data-small.json')
const app = express()

app.use(morgan('dev'))
app.use(cors())

app.get('/movie', function getMovie(req, res) {
    let response = MOVIES;

    if(req.query.genre) {
        response = response.filter(movie => 
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }
    if(req.query.country) {
        response = response.filter(movie => 
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
    }
    if(req.query.avg_vote) {
        response = response.filter(movie =>
            Number(movie.avg_vote) >= Number(req.query.avg_vote)
        )
    }

    res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})