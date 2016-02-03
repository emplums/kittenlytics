var fs = require('fs');

function mergeValues (values, content) {
  //Cycle over the keys of the values
  for (var key in values) {
    //Replace all {{key}} with the values from the values object
    content = content.replace("{{" + key + "}}", values[key]);
  }
  //return merged content
  return content;
}

function view (templateName, values, response) {
  //read from the template files sychronously (readFileSync = blocking)
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf-8'});
  //Insert result into content
  fileContents = mergeValues(values, fileContents);
  //Write out the contents to the response
  response.write(fileContents);
}

module.exports.view = view;