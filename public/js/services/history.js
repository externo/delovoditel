'use strict';

angular
  .module('app')
  .factory('HistoryService', HistoryService);

function HistoryService($http, baseUrl) {

  return {
    create: create,
    findAll: findAll
  };

  function create(msg, type, callback) {
    var action = {
      name: msg,
      type: type,
      datetime: new Date()
    };
    $http.post(baseUrl + '/admin/history', action)
      .success(callback);
  }

  function findAll(callback) {
    $http.get(baseUrl + '/admin/history')
      .success(callback);
  }
}