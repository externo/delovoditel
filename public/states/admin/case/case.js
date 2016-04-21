'use strict';

angular
  .module('app')
  .controller('CaseController', CaseController);

function CaseController($http, CaseService, CourtService, FileTypeService, PatternService) {

  var Case = this;

  Case.header = 'Висящи дела';
  Case.currentCase = null;      // temp variable for edit selected case
  Case.newCase = null;          // temp variable for add new case
  Case.openForm = false;        // help variable for toggle open/close for add-new-case form
  Case.openCase = false;        // help variable for toggle open/close for edit-current-case form
  Case.newFile = null;          // temp variable for storing new-file before add to case
  Case.fileType = null;         // temp variable for storing new-file-type before add to case
  Case.patternType = null;      // temp variable for storing pattern-type before generating it
  Case.orderByField = 'number';
  Case.reverseSort = false;

  Case.ifInRange = function (caseDatetime) {
    var caseDatetimeObj = new Date(caseDatetime);
    var dateString = Case.search.datetime;
    var reggie = /(\w.{17}) - (\w.{17})/;
    var dateArray = reggie.exec(dateString);
    var startDate = new Date(formatDate(dateArray[1]));
    var endDate = new Date(formatDate(dateArray[2]));

    return (startDate < caseDatetimeObj) && (caseDatetimeObj < endDate);
  };

  Case.toggleForm = function () {
    Case.openForm = !Case.openForm;
    Case.openCase = false;
  };

  Case.addCase = function () {
    if (Case.newCase.info.datetime) {
      Case.newCase.info.datetime = formatDate(Case.newCase.info.datetime);
    }
    Case.newCase.status = 'pending';
    Case.newCase.files = [];
    $http.post('/admin/case', Case.newCase)
      .then(function (res) {
        Case.cases = res.data;
        Case.openForm = false;
        Case.newCase = null;
      }
    );
  };

  Case.getCase = function (id) {
    $http.get('/admin/case/' + id)
      .then(function (res) {
        Case.currentCase = res.data;

        if (Case.currentCase.info.datetime) {
          console.log(typeof new Date(Case.currentCase.info.datetime));
          Case.currentCase.info.datetime = moment(Case.currentCase.info.datetime).format('DD.MM.YYYY HH:mm');
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
        Case.cases = res.data;
        Case.openCase = false;
        Case.currentCase = null;
      }
    );
  };

  Case.archiveCase = function () {
    $http.put('/admin/case/' + Case.currentCase._id + '/archive')
      .then(function (res) {
        Case.cases = res.data;
        Case.openCase = false;
        Case.currentCase = null;
      }
    );
  };

  Case.removeCase = function () {
    var files = Case.currentCase.files;
    for (var i = 0; i < files.length; i++) {
      $http.delete('/file/' + files[i].id);
    }

    $http.delete('/admin/case/' + Case.currentCase._id)
      .then(function (res) {
        Case.cases = res.data;
        Case.openCase = false;
        Case.currentCase = null;
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
        var file = {
          id: res.data,
          name: Case.newFile.name,
          type: Case.fileType
        };
        Case.currentCase.files.push(file);
        Case.newFile = null;
        Case.fileType = null;
        $('input[type=file]').val('');

        $http.put('/admin/case/' + Case.currentCase._id, Case.currentCase);
      });
  };

  Case.removeFile = function (id) {
    $http.delete('/admin/file/' + id)
      .then(function (res) {
        var files = Case.currentCase.files;
        var file = Case.currentCase.files.find(x=>x.id == id);
        var fileIndex = files.indexOf(file);
        files.splice(fileIndex, 1);

        $http.put('/admin/case/' + Case.currentCase._id, Case.currentCase);
      });
  };

  Case.generatePattern = function () {
    var courts = Case.courts;
    var court = courts.find(x=> x.name == Case.currentCase.info.court);
    PatternService.generatePattern(Case.patternType, court, Case.currentCase, Case.profile);
  };

  CaseService.findAllPending(function (response) {
    Case.cases = response;
  });

  CourtService.findAll(function (response) {
    Case.courts = response;
  });

  FileTypeService.findAll(function (response) {
    Case.fileTypes = response;
  });

  Case.profile = {
    name: "Pitagor Pontiiski",
    phone: '345345',
    fax: '#!@$!#@',
    email: "drevna@greece.eu"
  }
}

function formatDate(date) {
  var dateString = date;
  var reggie = /(\d{2}).(\d{2}).(\d{4}) \/ (\d{2}):(\d{2})/;
  var dateArray = reggie.exec(dateString);
  var dateObject = new Date(
    (+dateArray[3]),
    (+dateArray[2]) - 1, // Careful, month starts at 0!
    (+dateArray[1]),
    (+dateArray[4]),
    (+dateArray[5])
  );
  return dateObject;
}