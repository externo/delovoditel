'use strict';

angular
  .module('app', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.when('/admin/case', {
      templateUrl: '/states/admin/case/case.html',
      controller: 'CaseController',
      controllerAs: 'Case'
    });
    $routeProvider.when('/admin/archive', {
      templateUrl: '/states/admin/archive/archive.html',
      controller: 'ArchiveController',
      controllerAs: 'Archive'
    });
    $routeProvider.when('/admin/court', {
      templateUrl: '/states/admin/court/court.html',
      controller: 'CourtController',
      controllerAs: 'Court'
    });
    $routeProvider.when('/admin/file', {
      templateUrl: '/states/admin/file/file.html',
      controller: 'FileController',
      controllerAs: 'File'
    });
    $routeProvider.when('/admin/file/type', {
      templateUrl: '/states/admin/file/file-type.html',
      controller: 'FileTypeController',
      controllerAs: 'FileType'
    });
    $routeProvider.otherwise(
      {redirectTo: '/admin/case'}
    );
  });