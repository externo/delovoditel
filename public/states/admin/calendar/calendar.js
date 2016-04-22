'use strict';

angular
  .module('app')
  .controller('CalendarController', CalendarController);

function CalendarController($http, CaseService) {
  var Calendar = this;

  Calendar.current = null;
  Calendar.events = [
    {
      editable: true,
      startEditable: true,
      allDay: false, // will show the time
      title: 'event1\nalsdjas\n!@$@!$!@#6876',
      start: '2016-04-09T08:11:00',
      id: 'dsfsdf'
    },
    {
      editable: true,
      startEditable: true,
      title: 'event2',
      start: '2016-04-23T08:22:00',
      allDay: false // will show the time
    },
    {
      editable: true,
      startEditable: true,
      title: 'event3',
      start: '2016-04-05T19:55:00',
      allDay: false // will show the time
    }
  ];

  CaseService.findAllPending(function (response) {
    response.forEach(c=>(Calendar.events.push({
      editable: true,
      startEditable: true,
      allDay: false,
      title: '\n'+c.client.name,
      start: c.info.datetime,
      _id: c._id
    })));
    console.log(Calendar.events);

    $('#calendar').fullCalendar({
      timezone: 'local',
      header: {center: 'month,agendaWeek'}, // buttons for switching between views
      views: {
        basic: {
          titleFormat: 'DD MMM YYYY'
        }
      },
      events: Calendar.events,
      editable: true,
      eventDrop: function (calEvent) {

        if (!confirm("Are you sure about this change?")) {
          revertFunc();
        } else {
          var newDate = calEvent.start._d;

          $('input').val(calEvent.title + ' - ' + newDate);

          var event = {
            datetime: formatDate(moment(newDate).format('DD.MM.YYYY / HH:mm'))
          };

          // ajax PUT request for edit case datetime
          $http.put('/admin/case/' + calEvent._id + '/datetime', event);
        }
      }
    });
  });

}
