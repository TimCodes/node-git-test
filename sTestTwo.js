const spawn = require('child_process').spawn;

let py  = spawn('git');

let dataString = "";

py.stdout.on('data', function(data){
    dataString += data.toString();
  });

  py.stdout.on('end', function(){
    console.log('end', dataString)
   
  })

  py.stdout.on('error', function(err){
    console.log('there was an error ')
    console.log(err)
  }); 
 
  py.stdin.end()   