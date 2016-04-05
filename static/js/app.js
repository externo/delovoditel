'use strict';

angular
  .module('app', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.when('/admin/case', {
      templateUrl: '/states/admin/admin.html',
      controller: 'AdminController'
    });
    $routeProvider.when('/admin/archive/case', {
      templateUrl: '/states/admin/archive/admin-archive.html',
      controller: 'AdminArchiveController'
    });
    $routeProvider.otherwise(
      {redirectTo: '/admin/case'}
    );
  });