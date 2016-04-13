'use strict';

angular
  .module('app')
  .controller('AdminController', AdminController);

function AdminController($location) {

  var Admin = this;

  Admin.goCases = function () {
    $location.path("/admin/case");
    Admin.header = 'Съдебен модул';
    $('li a').removeClass('active');
    $('#casesId').addClass('active');
  };

  Admin.goArchive = function () {
    $location.path("/admin/archive");
    Admin.header = 'Съдебен модул';
  };

  Admin.goCourt = function () {
    $location.path("/admin/court");
    Admin.header = 'Съдилища';
  };

  Admin.goFiles = function () {
    $location.path("/file/type");
    Admin.header = 'Файлове';
    $('li a').removeClass('active');
    $('#filesId').addClass('active');

  };
}