module.exports = function($http, ArchiveService, CourtService, NotyService, SoundService, HistoryService) {

  var Archive = this;

  Archive.currentCase = null;
  Archive.openCase = false;

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

  Archive.inRange = function (caseDatetime, dateRange) {

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

  Archive.getCase = function (id) {
    ArchiveService.find(id, function (res) {
      Archive.currentCase = res;
      Archive.openCase = true;
    });
  };

  Archive.extractCase = function () {
    var msg = 'Раз-архивирано е ' + Archive.currentCase.info.type + ' дело № ' + Archive.currentCase.info.number + ' в ' + Archive.currentCase.info.court
      + ' на ' + Archive.currentCase.client.name;

    ArchiveService.update(Archive.currentCase, function (res) {
      Archive.cases = res;
      Archive.openCase = false;
      Archive.currentCase = null;

      SoundService.extract();
      NotyService.info(msg);
      HistoryService.create(msg, 'info');
    });

  };

  Archive.removeCase = function () {
    var files = Archive.currentCase.files;
    for (var i = 0; i < files.length; i++) {
      $http.delete('/admin/file/' + files[i].id);
    }

    var msg = 'Изтрито е ' + Archive.currentCase.info.type + ' дело № ' + Archive.currentCase.info.number + ' в ' + Archive.currentCase.info.court
      + ' на ' + Archive.currentCase.client.name;

    ArchiveService.remove(Archive.currentCase._id, function (res) {

      Archive.cases = res;
      Archive.openCase = false;
      Archive.currentCase = null;

      SoundService.deleteCase();
      NotyService.error(msg);
      HistoryService.create(msg, 'danger');
    });
  };

  Archive.cancelCase = function () {
    Archive.openCase = false;
    Archive.currentCase = null
  };

  ArchiveService.findAll(function (res) {
    var casesLength = res.length;
    if(casesLength){
      casesLength > 1 ? NotyService.info('Заредени са ' + res.length + ' архивирани дела') : NotyService.info('Заредено е 1 архивирано дело');
    }else{
      NotyService.info('Няма архивирани дела');
      NotyService.success('Архивирайте дело чрез бутона [Архивирай] в секция <i class="fa fa-book"> Дела</i>');
    }
    Archive.cases = res;
  });

  CourtService.findAll(function (res) {
    Archive.courts = res;
  });

};