'use strict';

angular
  .module('app')
  .factory('FileTypeService', FileTypeService);

function FileTypeService($http, baseUrl) {

  return {
    create: create,
    remove: remove,
    findAll: findAll
  };

  function create(fileType, callback) {
    $http.post(baseUrl + '/admin/file/type', fileType)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete(baseUrl + '/admin/file/type/' + id)
      .success(callback);
  }

  function findAll(callback) {
    $http.get(baseUrl + '/admin/file/type')
      .success(callback);
  }
}