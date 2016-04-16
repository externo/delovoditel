'use strict';

angular
  .module('app')
  .factory('PatternService', PatternService);

function PatternService(data) {

  return {
    generate: generate
  };

  function generate(data) {
    var fs = require('fs');
    var Docxtemplater = require('docxtemplater');

    //Load the docx file as a binary
    var content = fs.readFileSync(__dirname + "/input.doc", "binary");

    var doc = new Docxtemplater(content);

    //set the templateVariables
    doc.setData(data);

    //apply them (replace all occurences of {first_name} by Hipp, ...)
    doc.render();

    var buf = doc.getZip().generate({type: "nodebuffer"});

    fs.writeFileSync(__dirname + "/output.doc", buf);
  }
}