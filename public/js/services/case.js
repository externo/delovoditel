'use strict';

angular
  .module('app')
  .factory('CaseService', CaseService);

function CaseService($http) {

  return {
    create: create,
    findAllPending: findAllPending,
    findAllArchive: findAllArchive,
    update: update,
    remove: remove
  };

  function create(site, callback) {
    $http.post('/admin/case', site)
      .success(callback);
  }

  function findAllPending(callback) {
    $http.get('/admin/case')
      .success(callback);
  }

  function findAllArchive(callback) {
    $http.get('/admin/archive/case')
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