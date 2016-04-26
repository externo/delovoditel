'use strict';

angular
  .module('app')
  .controller('ArchiveController', ArchiveController);

function ArchiveController($http, ArchiveService, CourtService, NotyService, SoundService, HistoryService) {

  var Archive = this;

  Archive.currentCase = null;
  Archive.openCase = false;

  Archive.inRange = function (caseDatetime, dateRange) {

    return inRange(caseDatetime, dateRange);
  };

  Archive.getCase = function (id) {
    ArchiveService.find(id, function (res) {
      Archive.currentCase = res;
      Archive.openCase = true;
    });
  };

  Archive.extractCase = function () {
    var msg = 'Раз-архивирано е ' + Archive.currentCase.info.type + ' дело № ' + Archive.currentCase.info.number + ' в ' + Archive.currentCase.info.court
      + ' на ' + Archive.currentCase.client.name;

    ArchiveService.update(Archive.currentCase, function (res) {
      Archive.cases = res;
      Archive.openCase = false;
      Archive.currentCase = null;

      SoundService.extract();
      NotyService.info(msg);
      HistoryService.create(msg, 'info');
    });

  };

  Archive.removeCase = function () {
    var files = Archive.currentCase.files;
    for (var i = 0; i < files.length; i++) {
      $http.delete('/admin/file/' + files[i].id);
    }

    var msg = 'Изтрито е ' + Archive.currentCase.info.type + ' дело № ' + Archive.currentCase.info.number + ' в ' + Archive.currentCase.info.court
      + ' на ' + Archive.currentCase.client.name;

    ArchiveService.remove(Archive.currentCase._id, function (res) {

      Archive.cases = res;
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

  ArchiveService.findAll(function (res) {
    var casesLength = res.length;
    if(casesLength){
      casesLength > 1 ? NotyService.info('Заредени са ' + res.length + ' архивирани дела') : NotyService.info('Заредено е 1 архивирано дело');
    }else{
      NotyService.info('Няма архивирани дела');
      NotyService.success('Архивирайте дело чрез бутона [Архивирай] в секция <i class="fa fa-book"> Дела</i>');
    }
    Archive.cases = res;
  });

  CourtService.findAll(function (res) {
    Archive.courts = res;
  });

}