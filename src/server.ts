import express from 'express'
import "express-async-errors"
import { router } from './routes'
import { handleErrors } from './errors'

const app = express()

app.use(express.json())
app.use(router)
app.use(handleErrors)
app.listen(3000, () => {
    console.log('Alive on port 3000')
})