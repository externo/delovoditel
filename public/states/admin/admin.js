'use strict';

angular
  .module('app')
  .controller('AdminController', AdminController);

function AdminController($location) {

  var Admin = this;

  Admin.header = 'Висящи дела';

  Admin.goCases = function () {
    $location.path("/admin/case");
    Admin.header = 'Висящи дела';
  };

  Admin.goArchive = function () {
    $location.path("/admin/archive");
    Admin.header = 'Архивирани дела';
  };

  Admin.goCourt = function () {
    $location.path("/admin/court");
    Admin.header = 'Съдилища';
  };

  Admin.goFiles = function () {
    $location.path("/admin/file");
    Admin.header = 'Всички приложени документи';
  };

  Admin.goFileTypes = function () {
    $location.path("/admin/file/type");
    Admin.header = 'Всички тъпове документи';
  };
}