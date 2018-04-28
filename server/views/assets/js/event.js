'use strict';

function Event() {
  let _self = this;

  let _$color = $('.color').data({
    "model": {
      "code": "1D3557"
    }
  });

  $.extend(_$color, {
    "setColor": function () {

      _$color.data('model').code = this.id;
      $('.button-color a').attr("class", this.className);

    },

    "setColorByCode": function (code) {
      _$color.data('model').code = code;

      let idColor = "#" + code;
      $('.button-color a').attr("class", $(idColor).attr('class'));
    }
  });


  $.urlParam = function(name){
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
  };

  let _$event = $('.event');

  $.extend(_$event, {
    "loadInformation": function () {

      $.ajax({
        url: '/events/' + $.urlParam("id"),
        type: 'GET',
        dataType: 'json',
        success: function (json) {
          _$event.showEvent(json);
        }
      });

    },

    "showEvent": function (json) {
      _$event.showInformation(json.data);
      _$candidates.showCandidates(json.candidates);
      _$users.showUsers(json.users);
    },

    "showInformation": function (event) {
      $("#title").val(event.title);
      $("#place").val(event.place);
      $("#description").val(event.description);
      $(".date-start").val(moment(event.start).format("YYYY-MM-DD"));
      $(".date-end").val(moment(event.end).format("YYYY-MM-DD"));
      $(".time-start").val(moment(event.start).format("HH:mm"));
      $(".time-end").val(moment(event.end).format("HH:mm"));

      _$color.setColorByCode(event.color);
    },
    
    "setTime": function () {
      if($(this).hasClass("time-start")){
        $(".time-start").val($(this).val());
      }
      else{
        $(".time-end").val($(this).val());
      }
    },

    "setDate": function () {
      if($(this).hasClass("date-start")){
        $(".date-start").val($(this).val());
      }
      else{
        $(".date-end").val($(this).val());
      }
    },

    "saveEvent": function () {

      let currentEvent  ={
        start: _$event.find("#start").val() + " " + _timeStart.val(),
        end: 	_$event.find("#end").val() +  " " + _timeEnd.val(),
        title: _$event.find("#title").val(),
        description: _$event.find("#description").val(),
        place: _$event.find("#place").val(),
        color: _$color.data('model').code
      };

      $.ajax({
        url : "/events/"+ $.urlParam("id"),
        type : 'PUT',
        data : JSON.stringify(currentEvent),
        success: function () {
          location.href='/server/views/interview.html';
        }
      });
    },
    "exit": function () {
      location.href='/server/views/interview.html';
    }
  });

  let _$candidates = $(".candidates");

  $.extend(_$candidates, {

    "showCandidates": function (candidates) {
      this.empty();
      if (candidates.length === 0){
        $(".candidate").remove();
        return;
      }
      candidates.forEach($.proxy(this, "showCandidate"));
    },

    "showCandidate": function (candidate) {

      let template = "<span>" + candidate.first_name+" "+candidate.last_name+ "</span>";
      this.append(template);
    }
  });

  let _$users = $(".users");

  $.extend(_$users, {

    "showUsers": function (users) {
      this.empty();
      if (users.length === 0){
        $(".interview").remove();
        return;
      }
      users.forEach($.proxy(this, "showUser"));
    },

    "showUser": function (user) {

      let template = "<span>" + user.first_name+" "+user.last_name+ "</span>";
      this.append(template);
    }
  });

  let _timeStart = $('.time-start').timepicker({
    minuteStep: 1,
    secondStep: 5,
    minTime: '08:00',
    maxTime: '17:00',
    timeFormat: 'H:i:s'
  });

  let _timeEnd = $('.time-end').timepicker({
    minuteStep: 1,
    secondStep: 5,
    minTime: '08:00',
    maxTime: '17:00',
    timeFormat: 'H:i:s'
  });


  _self.init = function () {
    _self.initHandlers();
    _$event.trigger("loadInformation");
  };
  _self.initHandlers = function () {
    _$event.on("loadInformation", _$event.loadInformation);
    _$color.on("click", ".dropdown-menu a", _$color.setColor);
    _$event.on("change", ".time-event", _$event.setTime);
    _$event.on("change", ".date-event", _$event.setDate);
    _$event.on("click", "#save", _$event.saveEvent);
    _$event.on("click", "#exit", _$event.exit);
  };
}

$(new Event().init);