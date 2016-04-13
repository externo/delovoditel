'use strict';

angular
  .module('app')
  .controller('CaseController', CaseController);

function CaseController($http, $location, CaseService, CourtService, FileTypeService) {

  var Case = this;

  Case.currentCase = null;
  Case.newCase = null;
  Case.openForm = false;
  Case.openCase = false;
  Case.newFile = null;
  Case.fileType = null;
  Case.files = [];

  Case.toggleForm = function () {
    Case.openForm = !Case.openForm;
    Case.openCase = false;
  };

  Case.addCase = function () {
    Case.newCase.status = 'pending';
    Case.newCase.files = [];
    $http.post('/admin/case', Case.newCase)
      .then(function (res) {
        Case.cases = res.data;
        Case.openForm = false;
        Case.newCase = null;
      }
    );
  };

  Case.getCase = function (id) {
    $http.get('/admin/case/' + id)
      .then(function (res) {
        Case.currentCase = res.data;
        Case.openForm = false;
        Case.openCase = true;
      }
    );
  };

  Case.editCase = function () {
    if (Case.newDatetime) {
      Case.currentCase.info.datetime = Case.newDatetime;
    }
    $http.put('/admin/case/' + Case.currentCase._id, Case.currentCase)
      .then(function (res) {
        Case.cases = res.data;
        Case.openCase = false;
        Case.currentCase = null;
      }
    );
  };

  Case.archiveCase = function () {
    $http.put('/admin/case/' + Case.currentCase._id + '/archive')
      .then(function (res) {
        Case.cases = res.data;
        Case.openCase = false;
        Case.currentCase = null;
      }
    );
  };

  Case.removeCase = function () {
    var files = Case.currentCase.files;
    for (var i = 0; i < files.length; i++) {
      $http.delete('/file/' + files[i].id);
      console.log(files[i].id);
    }

    $http.delete('/admin/case/' + Case.currentCase._id)
      .then(function (res) {
        Case.cases = res.data;
        Case.openCase = false;
        Case.currentCase = null;
      });
  };

  Case.cancelCase = function () {
    Case.openCase = false;
    Case.currentCase = null
  };

  Case.uploadFile = function () {
    var fd = new FormData();
    fd.append('file', Case.newFile);

    $http.post('/file', fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        filename: encodeURIComponent(Case.newFile.name),
        metadata: JSON.stringify({
          type: encodeURIComponent(Case.fileType)
        })
      }
    })
      .then(function (res) {
        var file = {
          id: res.data,
          name: Case.newFile.name,
          type: Case.fileType
        };
        Case.newFile = null;
        $('input[type=file]').val('');
        Case.fileType = null;
        Case.currentCase.files.push(file);

        $http.put('/admin/case/' + Case.currentCase._id, Case.currentCase);
      });
  };

  Case.removeFile = function (id) {
    $http.delete('/file/' + id)
      .then(function (res) {
        var files = Case.currentCase.files;
        var file = files.find(x=>x.id == id);
        var fileIndex = files.indexOf(file);
        files.splice(fileIndex, 1);

        $http.put('/admin/case/' + Case.currentCase._id, Case.currentCase);
      });
  };

  CaseService.findAllPending(function (response) {
    Case.cases = response;
  });

  CourtService.findAll(function (response) {
    Case.courts = response;
  });

  FileTypeService.findAll(function (response) {
    Case.fileTypes = response;
  });
}