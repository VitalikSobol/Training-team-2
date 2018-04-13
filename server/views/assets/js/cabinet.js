'use strict';

function Cabinet() {

  let _self = this;
  let _$navMenu = $("#nav-menu");
  let _$cabinetInfo = $(".cabinet-info");

  $.extend(_$navMenu, {
    "onClick": function () {
      $('.navigation').toggleClass('show');
    }
  });

  let _$butShowRole = $(".select-header span ");
  let _$roleBlock = $(".select-role-block");

  $.extend(_$butShowRole, {
    "onClick": function () {
      if (_$roleBlock.hasClass('hide-block')) {
        _$roleBlock.removeClass('hide-block').addClass('show-block');
      } else {
        _$roleBlock.removeClass('show-block').addClass('hide-block');
      }
      $('#show-body-select').toggleClass('turn');
    }
  });

  let _$roleButton = $('.role');

  $.extend(_$roleButton, {
    "changeRole": function () {
      $('#role').text($(this).val());
    }
  });

  let user = {};

  $.extend(_$cabinetInfo, {
    "loadInformation": function () {
      if (typeof localStorage.token !== "undefined") {
        $.ajax({
          url: "/user",
          type: "GET",
          headers: {
            "Authorization" : window.localStorage.getItem("token")
          },
          success: (json) => {
            user = json;
            _$cabinetInfo.showInformation(user);
          }
        });
      } else {
        window.location.href = '/';
      }
    },

    "showInformation": function (user) {
      _$phone.val(user.phone);
      _$name.val(user.first_name);
      _$lastName.val(user.last_name);
      _$email.val(user.email);
      _$cabinetInfo.find('#role').text(user.role);
    }
  });

  let _$butSave = $(".save");
  let _$error = $(".error");

  let _$email = $("#email");
  let _$phone = $("#phone");
  let _$name = $("#firstName");
  let _$lastName = $("#lastName");

  $.extend(_$butSave, {
    "saveChanges": function (event) {
      event.stopPropagation();
      event.preventDefault();

      if (checkValid()) {
        let userInfo = {
          "phone": _$phone.val(),
          "name": _$name.val(),
          "lastName": _$lastName.val(),
          "email": _$email.val(),
          "role": _$cabinetInfo.find('#role').text()
        };

        $.ajax({
          url: "/user/" + user.id,
          type: 'PUT',
          data: JSON.stringify(userInfo),
          success: () => {
            window.location.href = '/server/views/interview.html';
          },
          error: (error) => {
            _$error.html(error.responseJSON.message);
            _$error.toggle(true);
          }
        });
      }
    }
  });

  let checkValid = function () {
    return _$email.is(":valid") && _$phone.is(":valid") && _$name.is(":valid") && _$lastName.is(":valid");
  };

  _self.init = function () {
    _self.initHandler();
    _$cabinetInfo.trigger("loadInformation");
  };

  _self.initHandler = function () {
    _$cabinetInfo.on("loadInformation", _$cabinetInfo.loadInformation);
    _$navMenu.on("click", _$navMenu.onClick);
    _$butShowRole.on("click", _$butShowRole.onClick);
    _$butSave.on("click", _$butSave.saveChanges);
    _$roleButton.on("click", _$roleButton.changeRole);
  };

}

$(new Cabinet().init);