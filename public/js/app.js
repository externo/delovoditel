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
    $routeProvider.when('/admin/calendar', {
      templateUrl: '/states/admin/calendar/calendar.html',
      controller: 'CalendarController',
      controllerAs: 'Calendar'
    });
    $routeProvider.otherwise(
      {redirectTo: '/admin/case'}
    );
  });

function formatDate(date) {
  var dateString = date;
  var reggie = /(\d{2}).(\d{2}).(\d{4}) \/ (\d{1,2}):(\d{2})/;
  var dateArray = reggie.exec(dateString);
  var dateObject = new Date(
    (dateArray[3]),
    (dateArray[2]) - 1, // Careful, month starts at 0!
    (dateArray[1]),
    (dateArray[4]),
    (dateArray[5])
  );
  return dateObject;
}