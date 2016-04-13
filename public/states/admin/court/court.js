'use strict';

angular
  .module('app')
  .controller('CourtController', CourtController);

function CourtController(CourtService) {

  var Court = this;
  Court.court = null;

  Court.addCourt = function () {
    CourtService.create(Court.court, function(response){
      Court.courts = response;
    });
  };

  Court.removeCourt = function (id) {
    CourtService.remove(id, function(response){
      Court.courts = response;
    });
  };

  CourtService.findAll(function (response) {
    Court.courts = response;
  });
}