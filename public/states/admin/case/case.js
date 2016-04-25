'use strict';

angular
  .module('app')
  .controller('CaseController', CaseController);

function CaseController($http, CaseService, CourtService, FileTypeService, PatternService, NotyService, SoundService, HistoryService) {

  var Case = this;

  Case.currentCase = null;      // temp variable for edit selected case
  Case.newCase = null;          // temp variable for add new case
  Case.openForm = false;        // help variable for toggle open/close for add-new-case form
  Case.openCase = false;        // help variable for toggle open/close for edit-current-case form
  Case.newFile = null;          // temp variable for storing new-file before add to case
  Case.fileType = null;         // temp variable for storing new-file-type before add to case
  Case.patternType = null;      // temp variable for storing pattern-type before generating it

  Case.stopSounds = function () {
    SoundService.stop();
  };
  Case.profile = {
    name: "Pitagor Pontiiski",
    phone: '345345',
    fax: '#!@$!#@',
    email: "drevna@greece.eu"
  };
  // TODO: above code to be removed in admin Ctrl or in app.js

  Case.inRange = function (caseDatetime, dateRange) {

    return inRange(caseDatetime, dateRange);
  };

  Case.toggleForm = function () {
    Case.openForm = !Case.openForm;
    Case.openCase = false;
  };

  Case.addCase = function () {
    Case.newCase.status = 'pending';
    Case.newCase.files = [];
    $http.post('/admin/case', Case.newCase)
      .then(function (res) {
        var msg = 'Добавено е ' + Case.newCase.info.type + ' дело № ' + Case.newCase.info.number + ' в ' + Case.newCase.info.court
          + ' на ' + Case.newCase.client.name;

        Case.cases = res.data;
        Case.openForm = false;
        Case.newCase = null;

        NotyService.success(msg);
        HistoryService.create(msg, 'success');
      }
    );
  };

  Case.getCase = function (id) {
    $http.get('/admin/case/' + id)
      .then(function (res) {
        Case.currentCase = res.data;

        if (Case.currentCase.info.datetime) {
          Case.currentCase.info.datetime = moment(Case.currentCase.info.datetime).format('DD.MM.YYYY / HH:mm');
        }

        Case.openForm = false;
        Case.openCase = true;
      }
    );
  };

  Case.editCase = function () {
    if (Case.currentCase.info.datetime) {
      Case.currentCase.info.datetime = formatDate(Case.currentCase.info.datetime);
    }
    $http.put('/admin/case/' + Case.currentCase._id, Case.currentCase)
      .then(function (res) {
        var msg = 'Редактирано е ' + Case.currentCase.info.type + ' дело № ' + Case.currentCase.info.number + ' в ' + Case.currentCase.info.court
        + ' на ' + Case.currentCase.client.name;

        Case.cases = res.data;
        Case.openCase = false;
        Case.currentCase = null;

        NotyService.warning(msg);
        HistoryService.create(msg, 'warning');
      });
  };

  Case.archiveCase = function () {
    if (Case.currentCase.info.datetime) {
      Case.currentCase.info.datetime = formatDate(Case.currentCase.info.datetime);
    }
    Case.currentCase.status = 'won';
    $http.put('/admin/case/' + Case.currentCase._id, Case.currentCase)
      .then(function (res) {
        var msg = 'Архивирано е ' + Case.currentCase.info.type + ' дело № ' + Case.currentCase.info.number + ' в ' + Case.currentCase.info.court
        + ' на ' + Case.currentCase.client.name;

        Case.cases = res.data;
        Case.openCase = false;
        Case.currentCase = null;

        SoundService.archive();
        NotyService.info(msg);
        HistoryService.create(msg, 'info');
      });
  };

  Case.removeCase = function () {
    var files = Case.currentCase.files;
    for (var i = 0; i < files.length; i++) {
      $http.delete('/admin/file/' + files[i].id);
    }

    $http.delete('/admin/case/' + Case.currentCase._id)
      .then(function (res) {
        var msg = 'Изтрито е ' + Case.currentCase.info.type + ' дело № ' + Case.currentCase.info.number + ' в ' + Case.currentCase.info.court
        + ' на ' + Case.currentCase.client.name;

        Case.cases = res.data;
        Case.openCase = false;
        Case.currentCase = null;

        SoundService.deleteCase();
        NotyService.error(msg);
        HistoryService.create(msg, 'danger');
      });
  };

  Case.cancelCase = function () {
    Case.openCase = false;
    Case.currentCase = null
  };

  Case.uploadFile = function () {
    var file = Case.newFile;
    var uploadUrl = "/admin/file";
    var fd = new FormData();
    fd.append('file', file);

    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        filename: encodeURIComponent(Case.newFile.name),
        metadata: encodeURIComponent(JSON.stringify({
          type: Case.fileType,
          court: Case.currentCase.info.court
        }))
      }
    })
      .then(function (res) {
        var msg = 'Добавен файл ' + Case.newFile.name + ' - "' + Case.fileType + '" към дело № ' + Case.currentCase.info.number
          + ' в ' + Case.currentCase.info.court + ' на ' + Case.currentCase.client.name;

        var file = {
          id: res.data,
          name: Case.newFile.name,
          type: Case.fileType
        };
        Case.currentCase.files.push(file);
        Case.newFile = null;
        Case.fileType = null;
        $('input[type=file]').val('');

        $http.put('/admin/case/' + Case.currentCase._id + '/files', Case.currentCase.files);

        NotyService.success(msg);
        HistoryService.create(msg, 'success');
      });
  };

  Case.removeFile = function (file) {
    var msg = 'Изтрит файл ' + file.name + ' - "' + file.type + '" към дело № ' + Case.currentCase.info.number
      + ' в ' + Case.currentCase.info.court + ' на ' + Case.currentCase.client.name;

    $http.delete('/admin/file/' + file.id)
      .then(function (res) {
        var fileIndex = Case.currentCase.files.indexOf(file);
        Case.currentCase.files.splice(fileIndex, 1);
        $http.put('/admin/case/' + Case.currentCase._id + '/files', Case.currentCase.files);

        SoundService.deleteFile();
        NotyService.error(msg);
        HistoryService.create(msg, 'danger');
      });
  };

  Case.generatePattern = function () {
    var msg = 'Генериран документ "' + $("option[value=" + Case.patternType + "]").text() + '" към дело № ' + Case.currentCase.info.number + ' в ' + Case.currentCase.info.court
      + ' на ' + Case.currentCase.client.name;

    var courts = Case.courts;
    var court = courts.find(x=> x.name == Case.currentCase.info.court);
    PatternService.generatePattern(Case.patternType, court, Case.currentCase, Case.profile);

    NotyService.success(msg);
    HistoryService.create(msg, 'success');
  };

  CaseService.findAllPending(function (response) {
    var casesLength = response.length;
    if (casesLength) {
      casesLength > 1 ? NotyService.info('Заредени са ' + response.length + ' висящи дела') : NotyService.info('Заредено е 1 висящо дело');
    } else {
      NotyService.info('Няма висящи дела');
      NotyService.success('Добавете дело чрез бутона [Добави дело]');
    }
    Case.cases = response;
  });

  CourtService.findAll(function (response) {
    Case.courts = response;
  });

  FileTypeService.findAll(function (response) {
    Case.fileTypes = response;
  });

}
