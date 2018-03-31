'use strict';

function Cabinet() {

  let _self = this;
  let _$navMenu = $("#nav-menu");

  $.extend(_$navMenu, {
    "onClick": function () {
      $('.navigation').toggleClass('show');
    }
  });

  let _$butShowRole = $(".select-header span ");
  $.extend(_$butShowRole, {
    "onClick": function () {
      if ($('.select-role-block').hasClass('hide-block')) {
        $('.select-role-block').removeClass('hide-block');
        $('.select-role-block').addClass('show-block');
      } else {
        $('.select-role-block').removeClass('show-block');
        $('.select-role-block').addClass('hide-block');
      }
      $('#show-body-select').toggleClass('turn');
    }
  });

  //не уверен в этой функции
  let _$butSave = $(".save");

  $.extend(_$butSave, {
    "onClick": function () {
      $(location).attr('href', '/views/interview.html');
    }
  });

  _self.init = function () {
    _self.initHandler();
  };

  _self.initHandler = function () {
    _$navMenu.on("click", _$navMenu.onClick);
    _$butShowRole.on("click", _$butShowRole.onClick);
    _$butSave.on("click",_$butSave.onClick);
  };

}

$(new Cabinet().init);