'use strict';

angular
  .module('app')
  .controller('AdminController', AdminController);

function AdminController($location) {

  var Admin = this;

  Admin.header = 'Висящи дела';

  Admin.goCase = function () {
    $location.path("/admin/case");
  };

  Admin.goArchive = function () {
    $location.path("/admin/archive");
  };

  Admin.goCourt = function () {
    $location.path("/admin/court");
  };

  Admin.goFile = function () {
    $location.path("/admin/file");
  };

  Admin.goFileType = function () {
    $location.path("/admin/file/type");
  };
}