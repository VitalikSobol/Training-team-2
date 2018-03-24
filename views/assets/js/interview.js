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
			"candidates": new Set(),
			"interviewers": new Set()
		}
	});
	
	$.extend(_$modal, {
		"selectParticipants": function (event) {
			event.stopPropagation();
			event.preventDefault();
			return false;
		},
		"loadParticipants": function () {
			_$candidates.loadCandidates();
			_$interviewers.loadInterviewers();
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
				interviewers: Array.from(_$modal.data("elements").interviewers),
				candidates: Array.from(_$modal.data("elements").candidates),
				allDay: false
			};
			
			
			$.ajax({
				url : "/events/",
				type : 'POST',
				data : JSON.stringify(currentEvent),
				success: function () {
					_$modal.data("elements").interviewers.clear();
					_$modal.data("elements").candidates.clear();
					_$interviewers.find("input").prop('checked',false);
					_$candidates.find("input").prop('checked',false);
					
					
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

  // Candidates

	let _$butShowSelectCand = $("#show-body-select");

	$.extend(_$butShowSelectCand,{
    "onClick": function (event) {
      event.stopPropagation();
      event.preventDefault();
      $(".select-candidates-block").toggle();
      $("#show-body-select").toggleClass("turn");
    }
	});

	let _$buttonHideCandidates = $("#all-candidates-select");
	
	let _$candidates = $("#select-block-candidates").data({
		"model":{
			"getModel": function (item) {
					item = item || {};
					item.id = item.id || "";
					item.name = item.name + " " + item.lastName || "";
					return item;
			}
		}
	});
	
	
	$.extend(_$candidates, {
		"selectCandidate":function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			if(this.checked){
				_$modal.data("elements").candidates.add($(this).attr("id"));
			}else {
				_$modal.data("elements").candidates.delete($(this).attr("id"));
			}
			
		},
		"addCandidates": function (items) {
			items.forEach($.proxy(this, "addCandidate"));
		},
		"addCandidate": function (item) {
			item = this.data("model").getModel(item);
			let template = "<div class='select-body-candidates'>" +
				"<input type='checkbox' id='" + item.id + "'>" +
				"<label for='" + item.id + "'> <span>" +
				item.name + "</span> </label></div>";
			
			this.append(template);
		},
		"isEmpty": function () {
		},
		"clear": function () {
			this.html("");
		},
		"loadCandidates": function () {
			$.ajax({
				url: "/interviewee",
				type: 'GET',
				success: function (json) {
					_$candidates.clear();
					console.log(json);
					json.status === 200 && Array.isArray(json.data) && _$candidates.addCandidates(json.data);
					
				}
			});
		}
	});
	
	let _$interviewers = $("#select-block-interviewers").data({
		"model":{
			"getModel": function (item) {
				item = item || {};
				item.id = item.id || "";
				item.name = item.name + " " + item.lastName || "";
				return item;
			}
		}
	});
	
	$.extend(_$interviewers, {
		"selectInterviewer":function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			if(this.checked){
				_$modal.data("elements").interviewers.add($(this).attr("id"));
			}else {
				_$modal.data("elements").interviewers.add($(this).attr("id"));
			}
		},
		"addInterviewers": function (items) {
			items.forEach($.proxy(this, "addInterviewer"));
		},
		"addInterviewer": function (item) {
			item = this.data("model").getModel(item);
			let template = "<div class='select-body-interviewers'>" +
				"<input type='checkbox' id='" + item.id + "'>" +
				"<label for='" + item.id + "'> <span>" +
				item.name + "</span> </label></div>";
			
			this.append(template);
		},
		"isEmpty": function () {
		},
		"clear": function () {
			this.html("");
		},
		"loadInterviewers": function () {
			$.ajax({
				url: "/interviewers",
				type: 'GET',
				success: function (json) {
					_$interviewers.clear();
					console.log(json);
					json.status === 200 && Array.isArray(json.data) && _$interviewers.addInterviewers(json.data);
					
				}
			});
		}
	});
	
	
	$.extend(_$buttonHideCandidates,{
		"onClick": function () {
      $("#select-block-candidates").toggleClass("js-select-hide-candidates");
		}
	});

	//Interviewers

  let _$butShowSelectInt = $("#show-body-select-2");

  $.extend(_$butShowSelectInt,{
    "onClick": function (event) {
      event.stopPropagation();
      event.preventDefault();
      $(".select-interviewers-block").toggle();
      $("#show-body-select-2").toggleClass("turn");
    }
  });

  let _$buttonHideInterviewers = $("#all-interviewers-select");

  $.extend(_$buttonHideInterviewers,{
    "onClick": function () {
      $("#select-block-interviewers").toggleClass("js-select-hide-interviewers");
    }
  });


	_self.init = function(){
		 _self.initHandlers();
		 _$modal.trigger("loadParticipants");
	};
	_self.initHandlers = function () {
		_$modal.on("click", "#addTime", _$modal.selectTime);
		_$modal.on("loadParticipants", _$modal.loadParticipants);
		_$modal.on("click", "#save", _$modal.saveEvent);
		_$modal.on("click", "#participants", _$modal.selectParticipants);
		_$navMenu.on("click",_$navMenu.Onclick);
    _$butShowSelectCand.on("click",_$butShowSelectCand.onClick);
    _$butShowSelectInt.on("click",_$butShowSelectInt.onClick);
    _$buttonHideCandidates.on("click",_$buttonHideCandidates.onClick);
    _$buttonHideInterviewers.on("click", _$buttonHideInterviewers.onClick);
		_$interviewers.on("change", "input", _$interviewers.selectInterviewer);
		_$candidates.on("change", "input", _$candidates.selectCandidate);

	};
	
}

$(new Calendar().init);
