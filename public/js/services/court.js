'use strict';

angular
  .module('app')
  .factory('CourtService', CourtService);

function CourtService($http) {

  return {
    create: create,
    remove: remove,
    findAll: findAll
  };

  function create(site, callback) {
    $http.post('/admin/court', site)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete('/admin/court/' + id)
      .success(callback);
  }

  function findAll(callback) {
    $http.get('/admin/court')
      .success(callback);
  }
}