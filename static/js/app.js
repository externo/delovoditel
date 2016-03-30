'use strict';

angular
  .module('app', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.when('/admin/case', {
      templateUrl: '/states/admin/admin.html',
      controller: 'AdminController'
    });
    $routeProvider.otherwise(
      {redirectTo: '/admin/case'}
    );
  });