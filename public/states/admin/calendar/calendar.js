'use strict';

angular
  .module('app')
  .controller('CalendarController', CalendarController);

function CalendarController($http, CaseService, NotyService, HistoryService) {
  var Calendar = this;

  Calendar.current = null;
  Calendar.events = [];

  CaseService.findAll(function (response) {
    response.forEach(c=>(Calendar.events.push({
      editable: true,
      startEditable: true,
      durationEditable: false,
      allDay: false,
      title: '\n' + c.client.name,
      start: c.info.datetime,
      _id: c._id
    })));

    $('#calendar').fullCalendar({
      timezone: 'local',
      timeFormat: 'H:mm',
      axisFormat: 'H(:mm)',
      columnFormat: {
        month: 'ddd',
        week: 'ddd DD'
      },
      titleFormat: {
        month: 'MMM YYYY',
        week: 'DD MMM YYYY',
        day: 'dd.mm.yyyy'
      },
      header: {center: 'month,agendaWeek'}, // buttons for switching between views
      events: Calendar.events,
      editable: true,
      eventDrop: function (calEvent, delta, revertFunc) {
        var newDate = moment(calEvent.start._d).format('DD.MM.YYYY / HH:mm');
        var msg = 'Преместване на ' + newDate + ' дело на клиент ' + calEvent.title;
        //$('input').val(calEvent.title + ' - ' + newDate);
        var event = {
          id: calEvent._id,
          datetime: formatDate(newDate)
        };

        NotyService.changeDate(msg, event, revertFunc);
      }
    });
  });

}
