'use strict';

angular
  .module('app')
  .controller('AdminController', AdminController);

function AdminController($http, $scope, CaseService, FileService) {

  var Admin = this;

  Admin.currentCase = null;
  Admin.newCase = null;
  Admin.openForm = false;
  Admin.openCase = false;
  Admin.newfile = null;

  Admin.toggleForm = function () {
    Admin.openForm = !Admin.openForm;
    Admin.openCase = false;
  };

  Admin.addCase = function () {
    Admin.newCase.status = 'pending';
    Admin.newCase.files = [];
    $http.post('/admin/case', Admin.newCase)
      .then(function (res) {
        Admin.cases = res.data;
        Admin.openForm = false;
      }
    );
  };

  Admin.getCase = function (id) {
    $http.get('/admin/case/' + id)
      .then(function (res) {
        Admin.currentCase = res.data;
        Admin.openForm = false;
        Admin.openCase = true;
      }
    );
  };

  Admin.editCase = function () {
    if (Admin.newDatetime){
      Admin.currentCase.info.datetime = Admin.newDatetime;
    }
    $http.put('/admin/case/' + Admin.currentCase._id, Admin.currentCase)
      .then(function (res) {
        Admin.cases = res.data;
        Admin.openCase = false;
        Admin.currentCase=null;
      }
    );
  };

  Admin.archiveCase = function () {
    $http.put('/admin/case/' + Admin.currentCase._id + '/archive')
      .then(function (res) {
        Admin.cases = res.data;
        Admin.openCase = false;
        Admin.currentCase=null;
      }
    );
  };

  Admin.removeCase = function () {
    $http.delete('/admin/case/' + Admin.currentCase._id)
      .then(function (res) {
        Admin.cases = res.data;
        Admin.openCase = false;
        Admin.currentCase=null;
      }
    );
  };

  Admin.cancelCase = function () {
    Admin.openCase = false;
    Admin.currentCase=null
  };

  Admin.uploadFile = function (file) {
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
        Admin.currentCase.files.push(res.data);
      });
  };

  Admin.removeFile = function (id) {
    $http.delete('/file/' + id)
      .then(function (res) {
        var fileIds = Admin.currentCase.files;
        var idIndex = fileIds.indexOf(res.data);
        fileIds.splice(idIndex, 1);
      });
  };

  CaseService.findAll(function (response) {
    Admin.cases = response;
  });

  FileService.find(function (response) {
    Admin.files = response;
  });
}