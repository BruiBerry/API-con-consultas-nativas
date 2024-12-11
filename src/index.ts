import 'dotenv/config'
import express from 'express'
import userRoute from './routes/user.route'
import authRoute from './routes/auth.route'
import bookRoute from './routes/book.route'
import {pool} from './config/database'
import { httpErrorHandle } from './middlewares/httpErrorHandlers.middleware'
import { loggerMiddleware } from './middlewares/logger.midlewares'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(loggerMiddleware);

app.use('/api/v1/users', userRoute)
app.use('/api/v1/books', bookRoute)
app.use('/api/v1/auth', authRoute)

app.use(httpErrorHandle)

const main = async () => {
  try {
    const {rows} = await pool.query("SELECT NOW()")
    console.log(rows[0].now, "DB conectada!!")
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`)
    })
  }catch (error) {
    console.log(error)
  }
}

main()






