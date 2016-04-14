'use strict';

angular
  .module('app')
  .controller('FileController', FileController);

function FileController(FileService, FileTypeService, CourtService) {

  var File = this;

  FileService.findAll(function (response) {
    File.files = response;
  });

  FileTypeService.findAll(function (response) {
    File.types = response;
  });

  CourtService.findAll(function (response) {
    File.courts = response;
  });
}