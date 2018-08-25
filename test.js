var nrc = require('node-run-cmd');

var dataCallback = function(data) {
  console.log(data)
};

var options = { cwd: 'recognizer', onData: dataCallback };
nrc.run('python predict_3.py', options);