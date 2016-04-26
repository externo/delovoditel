'use strict';

angular
  .module('app')
  .factory('ArchiveService', ArchiveService);

function ArchiveService($http, baseUrl) {

  return {
    findAll: findAll,
    find: find,
    update: update,
    remove: remove
  };

  function findAll(callback) {
    $http.get(baseUrl + '/admin/archive')
      .success(callback);
  }

  function find(id, callback) {
    $http.get(baseUrl + '/admin/archive/' + id)
      .success(callback);
  }

  function update(currentCase, callback) {
    $http.put(baseUrl + '/admin/archive/' + currentCase._id + '/extract', currentCase)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete(baseUrl + '/admin/archive/' + id)
      .success(callback);
  }

}