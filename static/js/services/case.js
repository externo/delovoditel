'use strict';

angular
  .module('app')
  .factory('CaseService', CaseService);

function CaseService($http) {

  return {
    create: create,
    findAll: findAll,
    update: update,
    remove: remove
  };

  function create(site, callback) {
    $http.post('/admin/case', site)
      .success(callback);
  }

  function findAll(callback) {
    $http.get('/admin/case')
      .success(callback);
  }

  function update(id, newcase, callback) {
    $http.put('/admin/case/' + id, newcase)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete('/admin/case/' + id)
      .success(callback);
  }
}