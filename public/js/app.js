'use strict';

angular
  .module('app', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.when('/admin/case', {
      templateUrl: '/states/admin/case/case.html',
      controller: 'CaseController'
    });
    $routeProvider.when('/admin/archive', {
      templateUrl: '/states/admin/archive/archive.html',
      controller: 'ArchiveController'
    });
    $routeProvider.when('/admin/court', {
      templateUrl: '/states/admin/court/court.html',
      controller: 'CourtController'
    });
    $routeProvider.when('/file/type', {
      templateUrl: '/states/admin/file/file.html',
      controller: 'FileTypeController'
    });
    $routeProvider.otherwise(
      {redirectTo: '/admin/case'}
    );
  });