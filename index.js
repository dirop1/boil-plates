const readline = require('readline');
const fs = require("fs");
var path = require("path");



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.question = function(q , cb ){
    var response;
    rl.setPrompt(q);
    rl.prompt();
    rl.on('line', (userInput) => {
        response = userInput;
        rl.close();
    });
    rl.on('close', () => {
        return cb(response);
    });
};
function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}



var folder = './';
var title= 'Title';
var description='This is the site\'s description!';
var bstjquery=false;


rl.question('Name of folder to output The boilerplate:\n', (answer) => {
  if(answer)
    folder= folder+answer;
    rl.question('Do you want bootstrap and Jquery? (y)', (answer) => {
      if(!answer || answer == ('y'))
        bstjquery = true;
        rl.question('Enter site\'s title:', (answer) => {
            title = answer;
            rl.question('Enter site\'s description:', (answer) => {
                description = answer;
                saveBoiler(title,description);
            });
        });
    });
});

function saveBoiler(title,description){
  console.log('Boilling the html for: ${title}..');
  if (folder != './'){
    if(fs.existsSync(folder)) {
        console.log('Panic! folder already exists, not going to overwrite!');

    }else{
        fs.mkdirSync(folder);
    }
  }

  //replacing in boiler
  var index_text = fs.readFileSync(path.join(__dirname, '/inc/index.html'), {encoding: 'utf8'});

  index_text = replaceAll(index_text,'[TITLE]',title);
  index_text = replaceAll(index_text,'[DESCRIPTION]',description);

  index_text = replaceAll(index_text,'[JS]',bstjquery ? fs.readFileSync(path.join(__dirname,'/inc/js_inc.txt')) : '');
  index_text = replaceAll(index_text,'[CSS]',bstjquery ? fs.readFileSync(path.join(__dirname,'/inc/css_inc.txt')): '');

  fs.writeFileSync(folder+'/index.html', index_text, function (err) {
    if (err) return console.log(err);
  });
  fs.writeFileSync(folder+'/script.js', ' ', function (err) {
    if (err) return console.log(err);
  });
  fs.writeFileSync(folder+'/style.css', ' ', function (err) {
    if (err) return console.log(err);
  });
  console.log('Done!');
  console.log('go work! -> http://localhost/'+folder);
  process.exit();
}
