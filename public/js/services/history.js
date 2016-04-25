'use strict';

angular
  .module('app')
  .factory('HistoryService', HistoryService);

function HistoryService($http) {

  return {
    create: create,
    remove: remove,
    findAll: findAll
  };

  function create(msg, type) {
    var action = {
      name: msg,
      type: type,
      datetime: new Date()
    };
    $http.post('/admin/history', action);
  }

  function remove(id) {
    $http.delete('/admin/history/' + id);
  }

  function findAll(callback) {
    $http.get('/admin/history')
      .success(callback);
  }
}