'use strict';

angular
  .module('app')
  .controller('FileTypesController', FileTypesController);

function FileTypesController($http, $scope, FileTypeService) {

  var File = this;
  File.type = null;

  File.addType = function () {
    console.log(File.type.name);
    $http.post('/file/type', File.type)
      .then(function (res) {
        File.types = res.data;
      }
    );
  };

  File.removeType = function (id) {
    $http.delete('/file/type/' + id)
      .then(function (res) {
        File.types = res.data;
      }
    );
  };

  FileTypeService.find(function (response) {
    File.types = response;
  });
}