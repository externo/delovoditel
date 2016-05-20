module.exports = function(CaseService, CourtService, FileTypeService, FileService, PatternService, NotyService, SoundService, HistoryService) {

  var Case = this;

  Case.currentCase = null;      // temp variable for edit selected case
  Case.newCase = null;          // temp variable for add new case
  Case.openForm = false;        // help variable for toggle open/close for add-new-case form
  Case.openCase = false;        // help variable for toggle open/close for edit-current-case form
  Case.newFile = null;          // temp variable for storing new-file before add to case
  Case.fileType = null;         // temp variable for storing new-file-type before add to case
  Case.patternType = null;      // temp variable for storing pattern-type before generating it

  Case.profile = {
    name: "Pitagor Pontiiski",
    phone: '345345',
    fax: '#!@$!#@',
    email: "drevna@greece.eu"
  };
  // TODO: above code to be removed in admin Ctrl or in app.js

  function formatDate(date) {

    var reggie = /(\d{2}).(\d{2}).(\d{4}) \/ (\d{1,2}):(\d{2})/;
    var dateArray = reggie.exec(date);

    var dateObject = new Date(
      (dateArray[3]),
      (dateArray[2]) - 1, // Careful, month starts at 0!
      (dateArray[1]),
      (dateArray[4]),
      (dateArray[5])
    );

    return dateObject;
  }

  Case.inRange = function (caseDatetime, dateRange) {

    var caseDateObj = formatDate(moment(caseDatetime).format('DD.MM.YYYY / HH:mm'));

    var reggie = /(\d{2}).(\d{2}).(\d{4}) \/ (\d{1,2}):(\d{2}) - (\d{2}).(\d{2}).(\d{4}) \/ (\d{1,2}):(\d{2})/;
    var dateArray = reggie.exec(dateRange);

    var startDate = new Date(
      (dateArray[3]),
      (dateArray[2]) - 1, // Careful, month starts at 0!
      (dateArray[1]),
      (dateArray[4]),
      (dateArray[5])
    );
    var endDate = new Date(
      (dateArray[8]),
      (dateArray[7]) - 1, // Careful, month starts at 0!
      (dateArray[6]),
      (dateArray[9]),
      (dateArray[10])
    );

    return startDate < caseDateObj && caseDateObj < endDate;
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

    var msg = 'Добавено е ' + Case.newCase.info.type + ' дело № ' + Case.newCase.info.number + ' в ' + Case.newCase.info.court
      + ' на ' + Case.newCase.client.name;

    CaseService.create(Case.newCase, function (res) {
      Case.cases = res;
      Case.openForm = false;
      Case.newCase = null;

      NotyService.success(msg);
      HistoryService.create(msg, 'success');
    });
  };

  Case.getCase = function (id) {
    CaseService.find(id, function (res) {
      Case.currentCase = res;

      if (Case.currentCase.info.datetime) {
        Case.currentCase.info.datetime = moment(Case.currentCase.info.datetime).format('DD.MM.YYYY / HH:mm');
      }

      Case.openForm = false;
      Case.openCase = true;
    });
  };

  Case.editCase = function () {
    if (Case.currentCase.info.datetime) {
      Case.currentCase.info.datetime = formatDate(Case.currentCase.info.datetime);
    }

    var msg = 'Редактирано е ' + Case.currentCase.info.type + ' дело № ' + Case.currentCase.info.number + ' в ' + Case.currentCase.info.court
      + ' на ' + Case.currentCase.client.name;

    CaseService.update(Case.currentCase, function (res) {
      Case.cases = res;
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

    var msg = 'Архивирано е ' + Case.currentCase.info.type + ' дело № ' + Case.currentCase.info.number + ' в ' + Case.currentCase.info.court
      + ' на ' + Case.currentCase.client.name;

    CaseService.update(Case.currentCase, function (res) {
      Case.cases = res;
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
      FileService.remove(files[i].id, function () {

      });
    }

    var msg = 'Изтрито е ' + Case.currentCase.info.type + ' дело № ' + Case.currentCase.info.number + ' в ' + Case.currentCase.info.court
      + ' на ' + Case.currentCase.client.name;

    CaseService.remove(Case.currentCase._id, function (res) {

      Case.cases = res;
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
    var fileData = new FormData();
    fileData.append('file', file);
    var options = {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        filename: encodeURIComponent(Case.newFile.name),
        metadata: encodeURIComponent(JSON.stringify({
          type: Case.fileType,
          court: Case.currentCase.info.court
        }))
      }
    };

    var msg = 'Добавен файл ' + Case.newFile.name + ' - "' + Case.fileType + '" към дело № ' + Case.currentCase.info.number
      + ' в ' + Case.currentCase.info.court + ' на ' + Case.currentCase.client.name;

    FileService.upload(fileData, options, function (res) {
      var fileToCase = {
        id: res,
        name: Case.newFile.name,
        type: Case.fileType
      };

      Case.currentCase.files.push(fileToCase);

      CaseService.updateFiles(Case.currentCase);
      NotyService.success(msg);
      HistoryService.create(msg, 'success');

      Case.newFile = null;
      Case.fileType = null;
      $('input[type="file"]').val('');
    });
  };

  Case.removeFile = function (file) {
    var msg = 'Изтрит файл ' + file.name + ' - "' + file.type + '" към дело № ' + Case.currentCase.info.number
      + ' в ' + Case.currentCase.info.court + ' на ' + Case.currentCase.client.name;
    var fileIndex = Case.currentCase.files.indexOf(file);

    FileService.remove(file.id, function () {
      Case.currentCase.files.splice(fileIndex, 1);

      CaseService.updateFiles(Case.currentCase);
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

  CaseService.findAll(function (response) {
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
