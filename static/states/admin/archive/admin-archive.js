'use strict';

angular
  .module('app')
  .controller('AdminArchiveController', AdminArchiveController);

function AdminArchiveController($http, $scope, CaseService, FileService) {

  var Archive = this;

  Archive.currentCase = null;
  Archive.newCase = null;
  Archive.openForm = false;
  Archive.openCase = false;
  Archive.newfile = null;

  Archive.toggleForm = function () {
    Archive.openForm = !Archive.openForm;
    Archive.openCase = false;
  };

  Archive.addCase = function () {
    Archive.newCase.status = 'pending';
    Archive.newCase.files = [];
    $http.post('/admin/case', Archive.newCase)
      .then(function (res) {
        Archive.cases = res.data;
        Archive.openForm = false;
      }
    );
  };

  Archive.getCase = function (id) {
    $http.get('/admin/case/' + id)
      .then(function (res) {
        Archive.currentCase = res.data;
        Archive.openForm = false;
        Archive.openCase = true;
      }
    );
  };

  Archive.editCase = function () {
    if (Archive.newDatetime){
      Archive.currentCase.info.datetime = Archive.newDatetime;
    }
    $http.put('/admin/case/' + Archive.currentCase._id, Archive.currentCase)
      .then(function (res) {
        Archive.cases = res.data;
        Archive.openCase = false;
        Archive.currentCase=null;
      }
    );
  };

  Archive.archiveCase = function () {
    $http.put('/admin/case/' + Archive.currentCase._id + '/archive')
      .then(function (res) {
        Archive.cases = res.data;
        Archive.openCase = false;
        Archive.currentCase=null;
      }
    );
  };

  Archive.removeCase = function () {
    $http.delete('/admin/case/' + Archive.currentCase._id)
      .then(function (res) {
        Archive.cases = res.data;
        Archive.openCase = false;
        Archive.currentCase=null;
      }
    );
  };

  Archive.cancelCase = function () {
    Archive.openCase = false;
    Archive.currentCase=null
  };

  Archive.uploadFile = function (file) {
    var fd = new FormData();
    fd.append('file', file);

    $http.post('/file', fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        filename: file.name
      }
    })
      .then(function (res) {
        Archive.currentCase.files.push(res.data);
      });
  };

  Archive.removeFile = function (id) {
    $http.delete('/file/' + id)
      .then(function (res) {
        var fileIds = Archive.currentCase.files;
        var idIndex = fileIds.indexOf(res.data);
        fileIds.splice(idIndex, 1);
      });
  };

  CaseService.findArchive(function (response) {
    Archive.cases = response;
    console.log('archive');
  });

  FileService.find(function (response) {
    Archive.files = response;
  });
}