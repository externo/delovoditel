'use strict';

angular
  .module('app')
  .factory('CaseService', CaseService);

function CaseService($http, baseUrl) {

  return {
    create: create,
    findAllPending: findAllPending,
    findAllArchive: findAllArchive,
    update: update,
    remove: remove
  };

  function create(site, callback) {
    $http.post(baseUrl + '/admin/case', site)
      .success(callback);
  }

  function findAllPending(callback) {
    $http.get(baseUrl + '/admin/case')
      .success(callback);
  }

  function findAllArchive(callback) {
    $http.get(baseUrl + '/admin/archive')
      .success(callback);
  }

  function update(id, newcase, callback) {
    $http.put(baseUrl + '/admin/case/' + id, newcase)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete(baseUrl + '/admin/case/' + id)
      .success(callback);
  }
}