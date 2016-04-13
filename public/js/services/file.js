'use strict';

angular
  .module('app')
  .factory('FileService', FileService);

function FileService($http) {

  return {
    findAll: findAll
  };

  function findAll(callback) {
    $http.get('/admin/file')
      .success(callback);
  }
}