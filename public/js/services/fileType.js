'use strict';

angular
  .module('app')
  .factory('FileTypeService', FileTypeService);

function FileTypeService($http) {

  return {
    create: create,
    remove: remove,
    findAll: findAll
  };

  function create(fileType, callback) {
    $http.post('/admin/file/type', fileType)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete('/admin/file/type/' + id)
      .success(callback);
  }

  function findAll(callback) {
    $http.get('/admin/file/type')
      .success(callback);
  }
}