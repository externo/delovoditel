'use strict';

angular
  .module('app')
  .controller('AdminController', AdminController);

function AdminController($http, CaseService, CourtService, NotyService, SoundService, HistoryService) {

  var Admin = this;

  Admin.sound = true;

  Admin.toggleSound = function () {
    if (Admin.sound) {
      SoundService.stop();
      Admin.sound = false;
    } else {
      SoundService.start();
      Admin.sound = true;
    }
  };

}