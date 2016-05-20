module.exports = function(FileService, FileTypeService, CourtService, NotyService) {

  var File = this;

  FileService.findAll(function (response) {
    var filesLength = response.length;
    if(filesLength){
      filesLength > 1 ? NotyService.info('Заредени са ' + response.length + ' файла') : NotyService.info('Зареден е 1 файл');
    }else{
      NotyService.info('Няма файлове');
      NotyService.success('Добавете файл като влезете във висящо дело с бутона [Добави]');
    }
    File.files = response;
  });

  FileTypeService.findAll(function (response) {
    File.types = response;
  });

  CourtService.findAll(function (response) {
    File.courts = response;
  });

};