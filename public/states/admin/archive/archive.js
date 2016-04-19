'use strict';

angular
  .module('app')
  .controller('ArchiveController', ArchiveController);

function ArchiveController($http, CaseService) {

  var Archive = this;

  Archive.header = 'Архив';
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
      $http.delete('/file/' + files[i].id);
    }

    $http.delete('/admin/case/' + Archive.currentCase._id)
      .then(function (res) {
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
    $http.put('/admin/case/' + Archive.currentCase._id + '/extract')
      .then(function (res) {
        Archive.cases = res.data;
        Archive.openCase = false;
        Archive.currentCase = null;
      }
    );
  };

  CaseService.findAllArchive(function (response) {
    Archive.cases = response;
  });
}