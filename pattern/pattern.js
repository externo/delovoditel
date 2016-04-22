'use strict';

angular
  .module('app')
  .controller('PatternController', PatternController);

function PatternController(PatternService) {

  var Pattern = this;

  var data = {
    "first_name": "bumba-balju",
    "last_name": "circus",
    "phone": "0652455478",
    "description": "New Website"
  };

  PatternService.generate(data);
}