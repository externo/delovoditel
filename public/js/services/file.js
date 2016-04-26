'use strict';

angular
  .module('app')
  .factory('FileService', FileService);

function FileService($http, baseUrl) {

  return {
    findAll: findAll
  };

  function findAll(callback) {
    $http.get(baseUrl + '/admin/file')
      .success(callback);
  }
}