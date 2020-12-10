const mongose = require('mongoose');

mongose.connect('mongodb://127.0.0.1:27017/nodejs-example',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})