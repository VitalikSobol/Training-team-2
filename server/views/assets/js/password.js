'use strict';

function Password() {
  let _self = this;

  let _$form = $('.form-password');
  let _$email = $('.form-password #email');
  let _$error = $('.error');
  let _$confirm = $('.confirm');
  let _$success = $('.success');
  let _$password = $('#password');
  let _$passwordConfirm = $('#confirm_password');


  let confirmPassword = function () {
    return _$password.val() === _$passwordConfirm.val();
  };

  $.urlParam = function(name){
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
  };

  $.extend(_$form, {
    "focus": function () {
      _$error.toggle(false);
      _$success.toggle(false);
    },

    "sendInstruction": function (event) {
      event.stopPropagation();
      event.preventDefault();
      if (_$email.is(":valid")) {
        $.ajax({
          url: "/email",
          type: "POST",
          data: JSON.stringify({
            "email": _$email.val()
          }),
          success: (json) => {
            _$success.toggle(true);
          },
          error: (error) => {
            _$error.html(error.responseJSON.message);
            _$error.toggle(true);
          }
        });
      }
    },

    "validatePassword": function () {
      if (confirmPassword()) {
        _$confirm.hide();
      } else {
        _$confirm.show();
      }
    },

    "setPassword": function (event) {
      event.stopPropagation();
      event.preventDefault();

      if (_$password.is(":valid") && _$passwordConfirm.is(":valid") && confirmPassword()){
        $.ajax({
          url: "/password",
          type: "POST",
          data: JSON.stringify({
            "token": $.urlParam('token'),
            "password": _$password.val()
          }),
          success: () => {
            window.location.href ='/';
          },
          error: (error) => {
            _$error.html(error.responseJSON.message);
            _$error.toggle(true);
          }
        });
      }
    }
  });

  _self.init = function () {
    _self.initHandlers();
  };

  _self.initHandlers = function () {
    _$form.on("focus", "#email", _$form.focus);
    _$form.on("focus", ".password", _$form.focus);
    _$form.on("click", "#sendInstruction", _$form.sendInstruction);
    _$form.on("keyup", "#password", _$form.validatePassword);
    _$form.on("keyup", "#confirm_password", _$form.validatePassword);
    _$form.on("click", "#setPassword", _$form.setPassword);
  };
}

$((new Password()).init);
