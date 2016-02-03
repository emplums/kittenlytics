var fs = require('fs');

//Replaces all the {{}} values in templates with their
//actual values if they are passed in as an argument in router.js
function mergeValues (values, content) {
  //Cycle over the keys of the values
  for (var key in values) {
    //Replace all {{key}} with the matching key values from the values object
    content = content.replace("{{" + key + "}}", values[key]);
  }
  //return merged content
  return content;
}

//Calls mergeValues on the contents of template
//Writes template
function view (templateName, values, response) {
  //read from the template files sychronously (readFileSync = blocking)
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf-8'});
  //Insert result into content
  fileContents = mergeValues(values, fileContents);
  //Write out the contents to the response
  response.write(fileContents);
}

module.exports.view = view;