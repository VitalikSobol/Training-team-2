'use strict';

function Notify() {
  let _self = this;

  let _$buttonShowNotifBlock = $("#interview-show-element");

  $.extend(_$buttonShowNotifBlock, {
    "onClick": function (event) {
      event.stopPropagation();
      event.preventDefault();
      $(".notification-block-interview").toggle();
      $("#interview-show-element").toggleClass("invert");
    }
  });

  let _$buttonShowCandidateBlock = $("#candidates-show-element");
  $.extend(_$buttonShowCandidateBlock, {
    "onClick": function (event) {
      event.stopPropagation();
      event.preventDefault();
      $(".notification-block-candidates").toggle();
      $("#candidates-show-element").toggleClass("invert");
    }
  });

  let _$notificationEvent = $('.notification-body-interview').data({
    "model": {
      "getModel": function (item) {
        item = item || {};
        item.title = item.title || "";
        item.start = item.start || "";
        return item;
      }
    }
  });

  $.extend(_$notificationEvent, {
    "addEvents": function (items) {
      items.forEach($.proxy(this, "addEvent"));
    },
    "addEvent": function (item) {
      item = this.data("model").getModel(item);

      let template = "<div class='notification-card-interview'>" +
        "<p>" + item.title + "</p>" +
        "<span>" + item.start + "</span></div>";

      this.append(template);
    },
    "isEmpty": function () {
    },
    "clear": function () {
      this.html("");
    },
    "loadEvents": function () {
      $.ajax({
        url: "/notification/",
        type: 'GET',
        success: function (json) {
          _$notificationEvent.clear();

          json.status === 200 && Array.isArray(json.events) && _$notificationEvent.addEvents(json.events);

          _$notificationEvent.isEmpty();
        }
      });
    }
  });

  let _$showAllEvent = $('#all-interview-natification');

  $.extend(_$showAllEvent, {
    "onClick": function (event) {
      event.stopPropagation();
      event.preventDefault();

      _$notificationEvent.toggleClass('js-all-interview');
    }
  });

  let _$notificationCandidates = $('.notification-body-candidates').data({
    "model": {
      "getModel": function (item) {
        item = item || {};
        item.name = item.name || "";
        item.email = item.email || "";
        item.poition = item.position || "";
        item.image = item.image || "";
        return item;
      }
    }
  });

  let _$showAllCandidates = $('#all-candidates-notification');

  $.extend(_$showAllCandidates, {
    "onClick": function (event) {
      event.stopPropagation();
      event.preventDefault();
      _$notificationCandidates.toggleClass('js-all-candidates');
      return false;
    }
  });

  $.extend(_$notificationCandidates, {
    "addCandidates": function (items) {
      items.forEach($.proxy(this, "addCandidate"));
    },
    "addCandidate": function (item) {
      item = this.data("model").getModel(item);
      let template = "<div class='notification-card-candidates'>" +
        "<div class='candidates-notif-photo'>" +
        "<div><img src='" + item.image + "' alt='' width='100'></div>" +
        "</div><div>" +
        "<p>" + item.name + "</p>" +
        "<p>" + item.email + "</p>" +
        "<p>" + item.position + "</p></div></div>";

      this.append(template);
    },
    "isEmpty": function () {
    },
    "clear": function () {
      this.html("");
    },
    "loadCandidates": function () {
      let query = {};
      query.status = 'New';
      $.ajax({
        url: "/candidates/status/" + query.status,
        type: 'GET',
        success: function (json) {
          _$notificationCandidates.clear();

          json.status === 200 && Array.isArray(json.data) && _$notificationCandidates.addCandidates(json.data);
          _$notificationCandidates.isEmpty();
        }
      });
    }
  });

  let _$buttonBell = $('.button-bell');

  $.extend(_$buttonBell, {
    "clickButton": function (event) {
      event.stopPropagation();
      event.preventDefault();

      if($('.notification-block').hasClass('show-notification')){
        $('.notification-block').addClass('hide-notification');
        $('.notification-block').removeClass('show-notification');
      } else {
        $('.notification-block').removeClass('hide-notification');
        $('.notification-block').addClass('show-notification');
      }
    }
  });


  _self.init = function () {
    _self.initHandler();
    _$notificationCandidates.trigger("loadCandidates");
    _$notificationEvent.trigger("loadEvents");
  };

  _self.initHandler = function () {
    _$buttonBell.on('click', _$buttonBell.clickButton);
    _$notificationCandidates.on("loadCandidates", _$notificationCandidates.loadCandidates);
    _$notificationEvent.on("loadEvents", _$notificationEvent.loadEvents);
    _$showAllCandidates.on("click", _$showAllCandidates.onClick);
    _$showAllEvent.on("click", _$showAllEvent.onClick);
    _$buttonShowCandidateBlock.on("click", _$buttonShowCandidateBlock.onClick);
    _$buttonShowNotifBlock.on("click", _$buttonShowNotifBlock.onClick);

  };
}

$(new Notify().init);
