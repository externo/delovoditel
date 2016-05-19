'use strict';

angular
  .module('app')
  .factory('NotyService', NotyService);

function NotyService(CaseService, HistoryService) {

  var time = 4000;
  var layout = 'topCenter';
  var theme = 'relax';
  var animation = {
    open: 'animated fadeInDown',
    close: 'animated fadeOutUpBig'
  };

  return {
    info: info,
    success: success,
    warning: warning,
    error: error,
    changeDate: changeDate
  };

  function info(msg) {
    noty({
      text: '<i class="fa fa-exclamation"></i> ' + msg,
      type: 'information',
      layout: layout,
      theme: theme,
      animation: animation
    }).setTimeout(time);
  }

  function success(msg) {
    noty({
      text: '<i class="fa fa-check"></i> ' + msg,
      type: 'success',
      layout: layout,
      theme: theme,
      animation: animation
    }).setTimeout(time);
  }

  function warning(msg) {
    noty({
      text: '<i class="fa fa-pencil"></i> ' + msg,
      type: 'warning',
      layout: layout,
      theme: theme,
      animation: animation
    }).setTimeout(time);
  }

  function error(msg) {
    noty({
      text: '<i class="fa fa-times"></i> ' + msg,
      type: 'error',
      layout: layout,
      theme: theme,
      animation: animation
    }).setTimeout(time);
  }

  function changeDate(msg, event, revertFunc) {
    noty({
      text: '<i class="fa fa-arrows-h"></i> ' + msg,
      type: 'warning',
      layout: layout,
      theme: theme,
      animation: animation,
      buttons: [
        {
          addClass: 'btn btn-primary', text: 'Премести', onClick: function ($noty) {
            CaseService.updateDate(event);
            HistoryService.create(msg, 'warning');
            $noty.close();
          }
        },
        {
          addClass: 'btn btn-danger', text: 'Отмени', onClick: function ($noty) {
            revertFunc();
            $noty.close();
          }
        }
      ]
    });
  }

}