(function () {

  'use strict';

  require('angular');
  require('angular-route');
  require('auth0');
  require('angular-storage');
  require('angular-jwt');

  // Load services
  var profileSrvc = require('./services/profile');
  var courtSrvc = require('./services/court');
  var caseSrvc = require('./services/case');
  var archiveSrvc = require('./services/archive');
  var fileSrvc = require('./services/file');
  var filetypeSrvc = require('./services/filetype');
  var patternSrvc = require('./services/pattern');
  var notySrvc = require('./services/noty');
  var soundSrvc = require('./services/sound');
  var historySrvc = require('./services/history');

  // Load directives
  var fileModelDrctv = require('./directives/upload');
  var datetimeRangeDrctv = require('./directives/datetime-range');
  var datetimePickerDrctv = require('./directives/datetime-picker');
  var validFileDrctv = require('./directives/valid-file');

  // Load controllers
  var adminCtrl = require('../states/admin/admin');
  var profileCtrl = require('../states/admin/profile/profile');
  var courtCtrl = require('../states/admin/court/court');
  var caseCtrl = require('../states/admin/case/case');
  var archiveCtrl = require('../states/admin/archive/archive');
  var fileCtrl = require('../states/admin/file/file');
  var filetypeCtrl = require('../states/admin/file/file-type');
  var calendarCtrl = require('../states/admin/calendar/calendar');
  var historyCtrl = require('../states/admin/history/history');

  angular
    .module('app', [
      'ngRoute',
      'auth0',
      'angular-storage',
      'angular-jwt'
    ])
    .constant('baseUrl', 'http://dela.kataraga.com')
    //.constant('baseUrl', '')
    .config([
      '$httpProvider',
      '$routeProvider',
      '$provide',
      'authProvider',
      'jwtInterceptorProvider',
      function ($httpProvider, $routeProvider, $provide, authProvider, jwtInterceptorProvider) {

        authProvider.init({
          domain: 'iliata.eu.auth0.com',
          clientID: 'wwcIqotTbjHGVVJ0Me1ZtrmB3NCRzII5'
        });
        jwtInterceptorProvider.tokenGetter = function (store) {
          return store.get('id_token');
        };

        $routeProvider.when('/admin/profile', {
          templateUrl: '/states/admin/profile/profile.html',
          controller: 'ProfileController as Profile'
        });
        $routeProvider.when('/admin/case', {
          templateUrl: '/states/admin/case/case.html',
          controller: 'CaseController as Case'
        });
        $routeProvider.when('/admin/archive', {
          templateUrl: '/states/admin/archive/archive.html',
          controller: 'ArchiveController as Archive'
        });
        $routeProvider.when('/admin/court', {
          templateUrl: '/states/admin/court/court.html',
          controller: 'CourtController as Court'
        });
        $routeProvider.when('/admin/file', {
          templateUrl: '/states/admin/file/file.html',
          controller: 'FileController as File'
        });
        $routeProvider.when('/admin/file/type', {
          templateUrl: '/states/admin/file/file-type.html',
          controller: 'FileTypeController as File'
        });
        $routeProvider.when('/admin/calendar', {
          templateUrl: '/states/admin/calendar/calendar.html',
          controller: 'CalendarController as Calendar'
        });
        $routeProvider.when('/admin/history', {
          templateUrl: '/states/admin/history/history.html',
          controller: 'HistoryController as History'
        });
        $routeProvider.otherwise( {redirectTo: '/admin/case'} );

        function redirect($q, $injector, auth, store, $location) {

          return {

            responseError: function (rejection) {
              if (rejection.status === 401) {
                auth.signout();
                store.remove('profile');
                store.remove('id_token');
                //Admin.profile = undefined;
                $location.path('/admin/profile');
              }

              return $q.reject(rejection);
            }
          }
        }

        $provide.factory('RedirectService', redirect);
        //$httpProvider.interceptors.push('RedirectService');
        //$httpProvider.interceptors.push('jwtInterceptor');
      }
    ])
    //.run(function($rootScope, auth, store, jwtHelper, $location){
    //  $rootScope.$on('$locationChangeStart', function(){
    //    var token = store.get('id_token');
    //    if (token){
    //      if(!jwtHelper.isTokenExpired(token)){
    //        if(!auth.isAuthenticated){
    //          auth.authenticate(store.get('profile'), token);
    //        }
    //      }
    //    }else{
    //      $location.path('/admin/profile');
    //    }
    //  })
    //})
    .factory('CourtService', ['$http', 'baseUrl', courtSrvc])
    .factory('CaseService', ['$http', 'baseUrl', caseSrvc])
    .factory('ArchiveService', ['$http', 'baseUrl', archiveSrvc])
    .factory('FileService', ['$http', 'baseUrl', fileSrvc])
    .factory('FileTypeService', ['$http', 'baseUrl', filetypeSrvc])
    .factory('PatternService', [patternSrvc])
    .factory('ProfileService', ['$http', 'baseUrl', profileSrvc])
    .factory('HistoryService', ['$http', 'baseUrl', historySrvc])
    .factory('NotyService', ['CaseService', 'HistoryService', notySrvc])
    .factory('SoundService', [soundSrvc])
    .directive('fileModel', ['$parse', fileModelDrctv])
    .directive('datetimeRange', [datetimeRangeDrctv])
    .directive('datetimePicker', [datetimePickerDrctv])
    .directive('validFile', [validFileDrctv])
    .controller('AdminController', ['$http', '$location', 'auth', 'store', 'SoundService', 'NotyService', 'HistoryService', adminCtrl])
    .controller('ProfileController', ['baseUrl', 'ProfileService', 'FileService', 'NotyService', 'SoundService', 'HistoryService', profileCtrl])
    .controller('CourtController', ['CourtService', 'NotyService', courtCtrl])
    .controller('CaseController', ['baseUrl', 'ProfileService', 'CaseService', 'CourtService', 'FileTypeService', 'FileService', 'PatternService', 'NotyService', 'SoundService', 'HistoryService', caseCtrl])
    .controller('ArchiveController', ['$http', 'ArchiveService', 'CourtService', 'NotyService', 'SoundService', 'HistoryService', archiveCtrl])
    .controller('FileController', ['baseUrl', 'FileService', 'FileTypeService', 'CourtService', 'NotyService', fileCtrl])
    .controller('FileTypeController', ['FileTypeService', 'NotyService', filetypeCtrl])
    .controller('CalendarController', ['$http', 'CaseService', 'NotyService', 'HistoryService', calendarCtrl])
    .controller('HistoryController', ['HistoryService', historyCtrl]);

}());