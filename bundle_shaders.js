var fs = require('fs');
var shaders = {};
var files =fs.readdirSync('./shaders/');

for (var i = files.length - 1; i >= 0; i--) {
    var fileContent = fs.readFileSync('./shaders/' + files[i], 'utf8');
    shaders[files[i]] = fileContent;
}

console.log('export const shaders = ');
console.log(JSON.stringify(shaders, null, '    '));
console.log(';');
