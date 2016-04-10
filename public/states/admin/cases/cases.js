'use strict';

angular
  .module('app')
  .controller('CasesController', CasesController);

function CasesController($http, $location, CaseService, FileTypeService) {

  var Cases = this;

  Cases.currentCase = null;
  Cases.newCase = null;
  Cases.openForm = false;
  Cases.openCase = false;
  Cases.newFile = null;
  Cases.fileType = null;
  Cases.files = [];

  Cases.toggleForm = function () {
    Cases.openForm = !Cases.openForm;
    Cases.openCase = false;
  };

  Cases.addCase = function () {
    Cases.newCase.status = 'pending';
    Cases.newCase.files = [];
    $http.post('/admin/case', Cases.newCase)
      .then(function (res) {
        Cases.cases = res.data;
        Cases.openForm = false;
        Cases.newCase = null;
      }
    );
  };

  Cases.getCase = function (id) {
    $http.get('/admin/case/' + id)
      .then(function (res) {
        Cases.currentCase = res.data;
        Cases.openForm = false;
        Cases.openCase = true;
      }
    );
  };

  Cases.editCase = function () {
    if (Cases.newDatetime) {
      Cases.currentCase.info.datetime = Cases.newDatetime;
    }
    $http.put('/admin/case/' + Cases.currentCase._id, Cases.currentCase)
      .then(function (res) {
        Cases.cases = res.data;
        Cases.openCase = false;
        Cases.currentCase = null;
      }
    );
  };

  Cases.archiveCase = function () {
    $http.put('/admin/case/' + Cases.currentCase._id + '/archive')
      .then(function (res) {
        Cases.cases = res.data;
        Cases.openCase = false;
        Cases.currentCase = null;
      }
    );
  };

  Cases.removeCase = function () {
    var files = Cases.currentCase.files;
    for (var i = 0; i < files.length; i++) {
      $http.delete('/file/' + files[i].id);
      console.log(files[i].id);
    }

    $http.delete('/admin/case/' + Cases.currentCase._id)
      .then(function (res) {
        Cases.cases = res.data;
        Cases.openCase = false;
        Cases.currentCase = null;
      });
  };

  Cases.cancelCase = function () {
    Cases.openCase = false;
    Cases.currentCase = null
  };

  Cases.uploadFile = function () {
    var fd = new FormData();
    fd.append('file', Cases.newFile);

    $http.post('/file', fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        filename: Cases.newFile.name,
        metadata: JSON.stringify({
          type: encodeURIComponent(Cases.fileType)
        })
      }
    })
      .then(function (res) {
        var file = {
          id: res.data,
          name: Cases.newFile.name,
          type: Cases.fileType
        };
        Cases.newFile = null;
        $('input[type=file]').val('');
        Cases.fileType = null;
        Cases.currentCase.files.push(file);

        $http.put('/admin/case/' + Cases.currentCase._id, Cases.currentCase);
      });
  };

  Cases.removeFile = function (id) {
    $http.delete('/file/' + id)
      .then(function (res) {
        var files = Cases.currentCase.files;
        var file = files.find(x=>x.id == id);
        var fileIndex = files.indexOf(file);
        files.splice(fileIndex, 1);

        $http.put('/admin/case/' + Cases.currentCase._id, Cases.currentCase);
      });
  };

  CaseService.findAllPending(function (response) {
    Cases.cases = response;
  });

  FileTypeService.find(function (response) {
    Cases.fileTypes = response;
  });
}