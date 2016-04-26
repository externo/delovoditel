'use strict';

angular
  .module('app')
  .factory('NotyService', NotyService);

function NotyService() {

  var time = 4000;

  return {
    info: info,
    success: success,
    warning: warning,
    error: error
  };

  function info(msg) {
    noty({
      text: '<i class="fa fa-check"></i> ' + msg,
      type: 'information',
      layout: 'topRight',
      theme: 'relax',
      animation: {
        open: 'animated fadeInDown',
        close: 'animated fadeOutUpBig'
      }
    }).setTimeout(time);
  }

  function success(msg) {
    noty({
      text: '<i class="fa fa-check"></i> ' + msg,
      type: 'success',
      layout: 'topRight',
      theme: 'relax',
      animation: {
        open: 'animated fadeInDown',
        close: 'animated fadeOutUpBig'
      }
    }).setTimeout(time);
  }

  function warning(msg) {
    noty({
      text: '<i class="fa fa-check"></i> ' + msg,
      type: 'warning',
      layout: 'topRight',
      theme: 'relax',
      animation: {
        open: 'animated fadeInDown',
        close: 'animated fadeOutUpBig'
      }
    }).setTimeout(time);
  }

  function error(msg) {
    noty({
      text: '<i class="fa fa-check"></i> ' + msg,
      type: 'error',
      layout: 'topRight',
      theme: 'relax',
      animation: {
        open: 'animated fadeInDown',
        close: 'animated fadeOutUpBig'
      }
    }).setTimeout(time);
  }
}