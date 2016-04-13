'use strict';

angular
  .module('app')
  .controller('FileController', FileController);

function FileController(FileService, FileTypeService) {

  var File = this;

  FileService.findAll(function (response) {
    File.files = response;
  });

  FileTypeService.findAll(function (response) {
    File.types = response;
  });
}