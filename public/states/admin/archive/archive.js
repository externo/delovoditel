'use strict';

angular
  .module('app')
  .controller('ArchiveController', ArchiveController);

function ArchiveController($http, CaseService, CourtService, NotyService) {

  var Archive = this;

  Archive.currentCase = null;
  Archive.openCase = false;

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
        NotyService.error('Изтрихте дело № ' + Archive.currentCase.info.number);
        Archive.cases = res.data;
        Archive.openCase = false;
        Archive.currentCase = null;
      });
  };

  Archive.cancelCase = function () {
    Archive.openCase = false;
    Archive.currentCase = null
  };

  Archive.extractCase = function () {
    $http.put('/admin/archive/' + Archive.currentCase._id + '/extract')
      .then(function (res) {
        Archive.cases = res.data;
        NotyService.info('Раз-архивирахте дело № ' + Archive.currentCase.info.number);
        Archive.openCase = false;
        Archive.currentCase = null;
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