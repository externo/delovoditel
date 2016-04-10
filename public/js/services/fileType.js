'use strict';

angular
  .module('app')
  .factory('FileTypeService', FileTypeService);

function FileTypeService($http) {

  return {
    create: create,
    remove: remove,
    find: find
  };

  function create(site, callback) {
    $http.post('/file/type', site)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete('/file/type' + id)
      .success(callback);
  }

  function find(callback) {
    $http.get('/file/type')
      .success(callback);
  }
}