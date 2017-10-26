const fs         = require('fs');
const schedule   = require('node-schedule');
const spawn      = require('child_process').spawn;
//const { Client } = require('pg')


// const client = new Client({
//   host: 'localhost',
//   database: 'leads',
//   user: 'postgres',
//   password: 'solar1',
// })

// client.connect((err) => {
//     if (err) {
//       console.error('connection error', err.stack)
//     } else {
//       console.log('connected')
//     }
// })

function execGitCmd(args = []) {
   

  let gitPromise = new Promise((resolve, reject) => {
       
    let git =  spawn('git',args);
    let dataString = "";

    git.stdout.on('data', function(data){
      dataString += data.toString();
    });

    git.stdout.on('end', function(){
     // console.log('end', dataString)
      resolve(dataString)
    })

    git.stdout.on('error', function(err){
     // console.log(err);
      reject(err)
    }); 

    git.stdin.end()   

  });  

  return gitPromise;
  
}



execGitCmd(['add', '.'])
.then(execGitCmd(['commit', '-m', "first Commit"]))
.then(execGitCmd(['remote', 'add', "origin", "https://github.com/TimCodes/node-git-test.git"]))
.then(execGitCmd(['push', '-u', "origin", "master"]))
.then(console.log)
.catch(console.log)





// execGitCmd(['help', '-a'])
// .then(console.log)

// git config --global user.name "Cron Update"
// git add .
// git commit -m "latest update"
// git push https://techshocktim:tasty01@github.com/skooliostyles/mongodb-backup.git master