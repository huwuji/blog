const express = require('express')
const app = express();
const {main}=require('./mian');

app.get('/', function (req, res) {
  res.send('Hello World')
})


/**
 * 触发
 */
app.get('/start',function (eq, res) {
    main();
})


app.listen(8000)