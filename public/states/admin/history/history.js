'use strict';

angular
  .module('app')
  .controller('HistoryController', HistoryController);

function HistoryController(HistoryService) {

  var History = this;

  History.action = null;

  History.addAction = function () {
    HistoryService.create(History.action);
  };

  History.removeAction = function (action) {
    HistoryService.remove(action._id);
  };

  HistoryService.findAll(function (response) {
    History.actions = response;
  });
}