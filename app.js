// Bring in Express code
const express = require('express')

const app = express()
const port = 3000

app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

const favoriteMovieList = [{
    title: "Star Wars",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "The Avengers",
    starRating: 4,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/index', (req,res)=>{
    res.send('Hello World!')
    console.log("Helly Manny!");
})

app.get('/all-movies', (req,res)=>{
    res.json({
        success: true,
        favoriteMovieList: favoriteMovieList
    })
})

app.get('/single-movie/:title', (req,res)=>{
    const foundMovie = favoriteMovieList.find((film)=>{
        // console.log("found")
        return film.name === req.params.name

    })

    res.json({
        success: true,
        foundMovie: foundMovie
    })
})

app.post('/new-movie', (req,res)=>{
    if(req.body.title === undefined || typeof(req. body.title) !== "string"){
        res.json({
            success: false,
            message: "title is required and must be a string",
        })
        return 
    }
    if (req.body.starRating === undefined || typeof(req.body.starRating) !== "number"){
        res.json({
            success: false,
            message: "star Rading is required and must be a number"
        })
        return
    }
    if(req.body.isRecommended === undefined || typeof(req.body.isRecommended) !== "boolean"){
        res.json({
            success: false,
            message: "is Recommended is required and must be a boolean"
        })
        return
    }
    const newMovie = {}
    newMovie.title = req.body.title
    newMovie.starRating = req.body.starRating
    newMovie.isRecommended = req.body.isRecommended
    newMovie.createdAt = new Date()
    newMovie.lastModified = new Date()

    favoriteMovieList.push(newMovie)

    res.json({
        success: true
    })
})

app.put('/update-movie/:titleToUpdate', (req,res)=>{
    const titleToFind = req.params.titleToUpdate
    const originalFilm = favoriteMovieList.find((film)=>{
        return film.title === titleToFind
    })
    const originalFilmIndex = favoriteMovieList.findIndex((film)=>{
        return film.title === titleToFind
    })

    if (!originalFilm){
        res.json({
            success: false,
            message: "Could not find film in favorite Movie list"
        })
        return
    }

    const updatedFilm = {}

    if(req.body.title !== undefined){
        updatedFilm.title = req.body.title
    } else {
        updatedFilm.title = originalFilm.title
    }

    if(req.body.starRating != undefined){
        updatedFilm.starRating = req.body.starRating
    } else {
        updatedFilm.starRating = originalFilm.starRating
    }

    if(req.body.isRecommended !== undefined){
        updatedFilm.isRecommended = req.body.isRecommended
    } else {
        updatedFilm.isRecommended = originalFilm.isRecommended
    }

    updatedFilm.createdAt = originalFilm.createdAt
    updatedFilm.lastModified = new Date() 

    favoriteMovieList[originalFilmIndex] = updatedFilm

    res.json({
        success: true,
        films: favoriteMovieList
    })
})

    app.delete('/delete-movie/:titleToDelete', (req,res)=>{
        
        const filmTitleToDelete = req.params.titleToDelete

        const indexOfFilm = favoriteMovieList.findIndex((film)=>{
            return film.title === filmTitleToDelete
        })

        favoriteMovieList.splice(indexOfFilm, 1)

        res.json({
            success:true
        })
    })    
    




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
