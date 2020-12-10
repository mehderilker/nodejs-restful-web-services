const express = require('express');
const app = express();
const userRouter = require('./routers/user')
require('./db/database')

const port = 3000

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port : ',port);
});