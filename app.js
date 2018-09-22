import axios from 'axios'
import cors from 'cors'
import express from 'express'
import fiat from './fiat'
import helmet from 'helmet'

const app = express()
const PORT = process.env.PORT || 3004

let bitcoinRates = {}
let litecoinRates = {}

app.use(cors())
app.use(helmet())

// rate fetching function
const fetchCrypto = (currency) => {
    return axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`)
}

// fetch Bitcoin & Litecoin rates from Coinbase API
setInterval(() => {
    axios.all([fetchCrypto('BTC'), fetchCrypto('LTC')])
        .then(axios.spread((bitcoin, litecoin) => {
            bitcoin = bitcoin.data.data.rates
            litecoin = litecoin.data.data.rates

            // Add price & symbol per fiat currency into object
            Object.keys(bitcoin).map((key) => {
                bitcoinRates[key] = { price: parseFloat(bitcoin[key]), symbol: fiat[key].symbol }
            })

            Object.keys(litecoin).map((key) => {
                litecoinRates[key] = { price: parseFloat(litecoin[key]), symbol: fiat[key].symbol }
            })
        }))
}, 5000)

// express routes
app.get('/ticker/bitcoin', (req, res) => {
    res.json(bitcoinRates)
})

app.get('/ticker/litecoin', (req, res) => {
    res.json(litecoinRates)
})

app.listen(PORT, () => {
    console.log(`zap-ticker is running on localhost:${PORT}`)
})