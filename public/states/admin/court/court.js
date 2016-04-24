'use strict';

angular
  .module('app')
  .controller('CourtController', CourtController);

function CourtController(CourtService, NotyService) {

  var Court = this;

  Court.court = null;

  Court.addCourt = function () {
    CourtService.create(Court.court, function(response){
      Court.courts = response;
      NotyService.success(Court.court.name + ' е добавен');
    });
  };

  Court.removeCourt = function (id) {
    CourtService.remove(id, function(response){
      Court.courts = response;
      NotyService.success(Court.court.name + ' е премахнат');
    });
  };

  CourtService.findAll(function (response) {
    var courtsLength = response.length;
    if(courtsLength){
      courtsLength > 1 ? NotyService.info('Заредени са ' + response.length + ' съдилища') : NotyService.info('Зареден е 1 съд');
    }else{
      NotyService.info('Няма добавени съдилияа');
      NotyService.success('Добавете съд чрез бутона [Добави дело]');
    }
    Court.courts = response;
  });
}