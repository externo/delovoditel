'use strict';

angular
  .module('app')
  .controller('FileTypeController', FileTypeController);

function FileTypeController(FileTypeService) {

  var File = this;

  File.type = null;

  File.addType = function () {
    FileTypeService.create(File.type, function(response){
      File.types = response;
    });
  };

  File.removeType = function (id) {
    FileTypeService.remove(id, function(response){
      File.types = response;
    });
  };

  FileTypeService.findAll(function (response) {
    File.types = response;
  });
}