'use strict';

function Password(){
  let _self = this;

  let _$form = $('.form-password');
  let _$email = $('.form-password #email');
  let _$error = $('.error');

  $.extend(_$form, {
    "checkValid":function () {
      return _$email.is(":valid");
    },
    "focus": function (event) {
      event.stopPropagation();
      event.preventDefault();
      _$error.toggle(false);
    }
  });

  _self.init = function () {
    _self.initHandlers();
  };

  _self.initHandlers = function(){
    _$form.on("focus", "#email", _$form.focus);
  };
}

$((new Password()).init);
