'use strict';

angular
  .module('app')
  .controller('AdminController', AdminController);

function AdminController($location) {

  var Admin = this;

  Admin.goCases = function () {
    $location.path("/admin/case");
  };

  Admin.goArchive = function () {
    $location.path("/admin/archive");
  };

  Admin.goFiles = function () {
    $location.path("/file/type");
  };
}