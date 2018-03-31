/**
 * Created by Denis on 28.03.2018.
 */
'use strict';

function LoginPage(){
	let _self = this;
	
	let _$form = $('.form-login');
	let _$email = $('.form-login #email');
	let _$password = $('.form-login #password');
	let _$error = $('.error');
	
	$.extend(_$form, {
		"login": function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			if(_$form.checkValid()){
				$.ajax({
					url: "/login",
					type: "POST",
					data: JSON.stringify({
						"email": _$email.val(),
						"password": _$password.val()
					}),
					success: (json, textStatus, xhr) =>{
						let token = xhr.getResponseHeader('Authorization');
						localStorage.setItem("token", token);
						window.location.href = 'views/candidates.html';
					},
					error : (xhr) =>{
						_$error.html(	xhr.responseJSON.message);
						_$error.toggle(true);
					}
				});
			}
		},
    "registration": function (event) {
      event.stopPropagation();
      event.preventDefault();

      if(_$form.checkValid()){
        $.ajax({
          url: "/registration",
          type: "POST",
          data: JSON.stringify({
            "email": _$email.val(),
            "password": _$password.val()
          }),
          success: (json, textStatus, xhr) =>{
            let token = xhr.getResponseHeader('Authorization');
            localStorage.setItem("token", token);
            window.location.href = 'interview.html';
          },
          error : (xhr) =>{
            _$error.html(	xhr.responseJSON.message);
            _$error.toggle(true);
          }
        });
      }
    },
		"checkValid":function () {
			return _$password.is(":valid") && _$email.is(":valid");
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
		_$form.on("click", "#login", _$form.login);
		_$form.on("focus", "#password", _$form.focus);
		_$form.on("focus", "#email", _$form.focus);
		_$form.on("click", "#registration", _$form.registration);
	};
}

$((new LoginPage()).init);
