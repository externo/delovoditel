'use strict';

angular
  .module('app')
  .controller('ArchiveController', ArchiveController);

function ArchiveController($http, CaseService, CourtService, NotyService, SoundService, HistoryService) {

  var Archive = this;

  Archive.currentCase = null;
  Archive.openCase = false;

  Archive.inRange = function (caseDatetime, dateRange) {

    return inRange(caseDatetime, dateRange);
  };

  Archive.getCase = function (id) {
    $http.get('/admin/case/' + id)
      .then(function (res) {
        Archive.currentCase = res.data;
        Archive.openCase = true;
      }
    );
  };

  Archive.removeCase = function () {
    var files = Archive.currentCase.files;
    for (var i = 0; i < files.length; i++) {
      $http.delete('/admin/file/' + files[i].id);
    }
    $http.delete('/admin/archive/' + Archive.currentCase._id)
      .then(function (res) {
        var msg = 'Изтрито е ' + Archive.currentCase.info.type + ' дело № ' + Archive.currentCase.info.number + ' в ' + Archive.currentCase.info.court
        + ' на ' + Archive.currentCase.client.name;

        Archive.cases = res.data;
        Archive.openCase = false;
        Archive.currentCase = null;

        SoundService.deleteCase();
        NotyService.error(msg);
        HistoryService.create(msg, 'danger');
      });
  };

  Archive.cancelCase = function () {
    Archive.openCase = false;
    Archive.currentCase = null
  };

  Archive.extractCase = function () {
    $http.put('/admin/archive/' + Archive.currentCase._id + '/extract')
      .then(function (res) {
        var msg = 'Раз-архивирано е ' + Archive.currentCase.info.type + ' дело № ' + Archive.currentCase.info.number + ' в ' + Archive.currentCase.info.court
        + ' на ' + Archive.currentCase.client.name;

        Archive.cases = res.data;
        Archive.openCase = false;
        Archive.currentCase = null;

        SoundService.extract();
        NotyService.info(msg);
        HistoryService.create(msg, 'info');
      }
    );
  };

  CaseService.findAllArchive(function (response) {
    var casesLength = response.length;
    if(casesLength){
      casesLength > 1 ? NotyService.info('Заредени са ' + response.length + ' архивирани дела') : NotyService.info('Заредено е 1 архивирано дело');
    }else{
      NotyService.info('Няма архивирани дела');
      NotyService.success('Архивирайте дело чрез бутона [Архивирай] в секция <i class="fa fa-book"> Дела</i>');
    }
    Archive.cases = response;
  });

  CourtService.findAll(function (response) {
    Archive.courts = response;
  });

}