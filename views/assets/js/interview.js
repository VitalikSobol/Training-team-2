/**
 * Created by Denis on 17.03.2018.
 */
'use strict'; 

function Calendar() {
	let _self = this;
	let _timeStart = $('#time-start').timepicker({
		minuteStep: 1,
		secondStep: 5,
		minTime: '08:00',
		maxTime: '17:00',
		template: 'modal',
		timeFormat: 'H:i:s',
		modalBackdrop: true,
	});
	let _timeEnd = $('#time-end').timepicker({
		minuteStep: 1,
		secondStep: 5,
		minTime: '08:00',
		maxTime: '17:00',
		template: 'modal',
		timeFormat: 'H:i:s',
		modalBackdrop: true,
	});

	let _$modal = $("#myModal").data({
		"elements":{
			"participants": []
		}
	});
	
	$.extend(_$modal, {
		"selectParticipants": function (event) {
			event.stopPropagation();
			event.preventDefault();
			return false;
		},
		"loadParticipants": function () {
			
		},
		"selectTime": function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			$('.bootstrap-timepicker').toggle( "show" );
			
			return false;
		},
		"saveEvent": function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			let currentEvent  ={
				start: _$modal.find("#start").val() + " " + _timeStart.val(),
				end: 	_$modal.find("#end").val() +  " " + _timeEnd.val(),
				title: _$modal.find("#title-event").val(),
				allDay: false
			};
			
			$.ajax({
				url : "/events/",
				type : 'POST',
				data : JSON.stringify(currentEvent),
				success: function () {
					$('#calendar').fullCalendar('refetchEvents');
					_$modal.modal('hide');
				}
			});
			
		
			return false;
		}
	});
	
	let _$calendar = $('#calendar').fullCalendar({
		minTime: '08:00:00',
		maxTime: '17:00:00',
		timezone:'local',
		slotLabelFormat : 'h(:mm)a',
		buttonText: {
			month:    'month',
			week:     'week',
			day:      'day',
			list:     'schedule',
		},
		header: {
			left: 'prev,next, today',
			right: 'agendaDay, agendaWeek, month, list',
			center: 'title'
		},
		firstDay: 1,
		theme : false,
		height: "auto",
		weekends: false,
		dayClick: function (date) {
			_$modal.modal('show');
			let currentDate = new Date(date).toISOString();
			currentDate = currentDate.substring(0, currentDate.indexOf("T"));
			_$modal.find('#start').val(currentDate);
			_$modal.find('#end').val(currentDate);
		},
		events: function(start, end, timezone, callback){
			$.ajax({
				url: '/events/',
				type: 'GET',
				dataType: 'json',
				data: {
					from: new Date(start).toISOString(),
					till: new Date(end).toISOString()
				},
				success: function(json) {
					let events = [];
					if(!!json.events){
						$.map( json.events, function( item ) {
							events.push({
								id: item.id,
								title: item.title,
								start: item.start ,
								end: item.end
							});
						});
					}
					callback(events);
				}
			});
		}
		
	});

	let _$navMenu = $("#nav-menu");

	$.extend(_$navMenu,{
		"Onclick": function () {
			$('.navigation').toggleClass('show');
		}
	});

	_self.init = function(){
		 _self.initHandlers();
	};
	_self.initHandlers = function () {
		_$modal.on("click", "#addTime", _$modal.selectTime);
		_$modal.on("loadParticipants", _$modal.loadParticipants);
		_$modal.on("click", "#save", _$modal.saveEvent);
		_$modal.on("click", "#participants", _$modal.selectParticipants);
		_$navMenu.on("click",_$navMenu.Onclick);
	};
	
}

$(new Calendar().init);
