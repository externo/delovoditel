'use strict';

angular
  .module('app')
  .factory('CaseService', CaseService);

function CaseService($http, baseUrl) {

  return {
    findAll: findAll,
    find: find,
    create: create,
    update: update,
    updateFiles: updateFiles,
    updateDate: updateDate,
    remove: remove
  };

  function findAll(callback) {
    $http.get(baseUrl + '/admin/case')
      .success(callback);
  }

  function find(id, callback) {
    $http.get(baseUrl + '/admin/case/' + id)
      .success(callback);
  }

  function create(newCase, callback) {
    $http.post(baseUrl + '/admin/case', newCase)
      .success(callback);
  }

  function update(currentCase, callback) {
    $http.put(baseUrl + '/admin/case/' + currentCase._id, currentCase)
      .success(callback);
  }

  function updateFiles(currentCase, callback) {
    $http.put(baseUrl + '/admin/case/' + currentCase._id + '/files', currentCase)
      .success(callback);
  }

  function updateDate(event, callback) {
    $http.put(baseUrl + '/admin/case/' + event.id + '/datetime', event)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete(baseUrl + '/admin/case/' + id)
      .success(callback);
  }

}