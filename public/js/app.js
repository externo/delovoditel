'use strict';

angular
  .module('app', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.when('/admin/case', {
      templateUrl: '/states/admin/cases/cases.html',
      controller: 'CasesController'
    });
    $routeProvider.when('/admin/archive', {
      templateUrl: '/states/admin/archive/archive.html',
      controller: 'ArchiveController'
    });
    $routeProvider.when('/file/type', {
      templateUrl: '/states/admin/files/files.html',
      controller: 'FileTypesController'
    });
    $routeProvider.otherwise(
      {redirectTo: '/admin/case'}
    );
  });