import express from 'express'

const app = express()

const PORT = process.env.PORT || 3004

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(PORT, () => {
    console.log(`ltc-ticker is running on localhost:${PORT}`)
})