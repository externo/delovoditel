'use strict';

angular
  .module('app')
  .controller('AdminController', AdminController);

function AdminController($http, $scope, CaseService, FileService) {

  var Admin = this;

  Admin.currentCase = null;
  Admin.newcase = null;
  Admin.click = false;
  Admin.newfile = null;

  Admin.addCase = function (newcase) {
    newcase.files = [];
    $http.post('/admin/case', newcase)
      .then(function (res) {
        Admin.cases = res.data;
      }
    );
  };

  Admin.getCase = function (id) {
    $http.get('/admin/case/' + id)
      .then(function (res) {
        Admin.currentCase = res.data;
        Admin.click = true;
      }
    );
  };

  Admin.editCase = function () {
    $http.put('/admin/case/' + Admin.currentCase._id, Admin.currentCase)
      .then(function (res) {
        Admin.cases = res.data;
        Admin.click = false;
        Admin.currentCase=null;
      }
    );
  };

  Admin.removeCase = function (id) {
    $http.delete('/admin/case/' + id)
      .then(function (res) {
        Admin.cases = res.data;
      }
    );
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