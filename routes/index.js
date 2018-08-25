var nrc = require('node-run-cmd');
var express = require('express')
var router = express.Router();
const config = require('../config.js')
// var spawn = require("child_process").spawn;
var PythonShell = require('python-shell');

var path = require('path');
var fs = require('fs');


// router.get('/', (req, res) => {
//     res.send('welcome')
// })

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

router.post('/recognize', function(req, res){

    var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");

    console.log(base64Data)

    require("fs").writeFile("recognizer2/out.png", base64Data, 'base64', function(err) {
      if(err){
        console.log(err);
      }
    })


    var dataCallback = function(data) {
      console.log(data)
      res.json({
        success: true,
        result: data
      })
    };

    var options = { cwd: 'recognizer2', onData: dataCallback };
    nrc.run('python predict_2.py out.png', options);

    

})

module.exports = router;