'use strict';

function Profile() {

  let _self = this;
  let _$content = $('.candidates-information');
  let _$skills = $('.skills');
  let _$experiences = $('.experience');
  let _$buttonEdit = $('.button-edit');
  let _$buttonSkill = $('.button-skill');
  let _$buttonExperience = $('.button-experience');


  $.urlParam = function(name){
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
  };

  $.extend(_$skills, {
    "addSkills": function (skills) {
      this.empty();
      skills.forEach($.proxy(this, "addSkill"));
    },
    "addSkill": function (skill) {
      let template = "<span>" + skill.name + "</span>";
      this.append(template);
    }
  });


  $.extend(_$experiences, {

    "addExperiences": function (experiences) {
      this.empty();
      experiences.forEach($.proxy(this, "addExperience"));
    },

    "addExperience": function (experience) {

      let template = "<div class=\"experience-item\">" +
        "<div class=\"experience-info\">" +
        "<p class=\"info-period\">" + experience.period+ "</p>" +
        "<p class=\"text-muted info-position\">"+ experience.position +"</p>" +
        "<p class=\"text-muted info-location\">"+ experience.location +"</p></div>" +
        "<div class=\"experience-company\">" +
        "<div class=\"experience-map\">" +
        "<div class=\"experience-point\"></div>" +
        "<div class=\"experience-line\"></div></div>" +
        "<div class=\"company-info\">" +
        "<p class=\"company-name\">"+ experience.company +"</p>" +
        "<p class=\"experience-description\">"+ experience.description +"</p></div></div></div>";

      this.append(template);
    }
  });


  $.extend(_$buttonSkill, {
    "addSkill": function () {
      let name = $('.name-skill').val().trim();
      if(name!== ""){
        $.ajax({
          url: "/candidates/skill/"+ $.urlParam("id"),
          type: 'POST',
          data: name,
          success: function(data) {
            _$content.loadInformation();
          }
        });
      }
    }
  });


  $.extend(_$buttonExperience, {
    "addExperience": function () {
      let model = {
        "period": $('.exp-period').val().trim(),
        "position": $('.exp-position').val().trim(),
        "location": $('.exp-location').val().trim(),
        "company": $('.exp-company').val().trim(),
        "description": $('.exp-description').val().trim()
      };
      if(model.period!== "" && model.company !== "") {
        $.ajax({
          url: "/candidates/experience/" + $.urlParam("id"),
          type: 'POST',
          data: JSON.stringify(model),
          success: function (data) {
            _$content.loadInformation();
          }
        });
      }
    }
  });

  $.extend(_$buttonEdit, {

    "changeButton": function () {

      let _$buttonSpan = $('.button-edit span');
      _$buttonEdit.blur();

      if (_$buttonSpan.hasClass('glyphicon-pencil')) {
        _$buttonSpan.removeClass('glyphicon-pencil').addClass('glyphicon-ok');
        let fields = [$('.name'), $('.last-name'), $('.position'), $('.salary'), $('.number-info'), $('.email'), $('.address')];
        _$buttonEdit.startEdit(fields);
      }
      else {
        let fields = [$('.name'), $('.last-name'), $('.position'), $('.salary'), $('.number-info'), $('.email'), $('.address')];
        _$buttonEdit.sendChanges();
        _$buttonEdit.endEdit(fields);
      }
    },

    "changeField": function (tag, field) {
      if (tag === "input")
        field.replaceWith(function(){
          return '<'+tag+' class=\"'+this.className+'\" value = \"'+field.text()+'\">'
        });
      else field.replaceWith(function(){
        return '<span class=\"'+this.className+'\" >'+field.val()+'</span>'
      });
    },

    "startEdit": function (fields) {
      fields.forEach($.proxy(this, "changeField", 'input'));
    },

    "endEdit": function (fields) {
      fields.forEach($.proxy(this, "changeField", 'span'));
      $('.button-edit span').removeClass('glyphicon-ok').addClass('glyphicon-pencil');
    },

    "sendChanges": function (fields) {
      let getDate = function () {
        let fullDate = new Date();
        let twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) :(fullDate.getMonth()+1);
        return fullDate.getFullYear()+ "-" + twoDigitMonth + "-" +  fullDate.getDate();
      };

      let model = {
        "id": $.urlParam("id"),
        "name": $('.name').val(),
        "lastName": $('.last-name').val(),
        "position": $('.position').val(),
        "salary": $('.salary').val().replace('$',''),
        "phone": $('.number-info').val(),
        "email": $('.email').val(),
        "address": $('.address').val(),
        "datePublishing": getDate()
      };

      $.ajax({
        url: "/candidates/"+ $.urlParam("id"),
        type: 'PUT',
        data: JSON.stringify(model),
        success: function(data) {
        }
      });
    }
  });


  $.extend(_$content, {

    "showInformation": function (candidate, experiences, skills) {

      let fullName = candidate.name + " " + candidate.lastName;

      $(".profile-fullName").text(fullName);
      $(".candidates-information .status").text(candidate.status);
      $(".candidates-information .img-responsive").attr("src",candidate.image);
      $(".position").text(candidate.position);
      $(".name").text(candidate.name);
      $(".last-name").text(candidate.lastName);
      $(".salary").text(candidate.payment+"$");
      $(".change-date").text(candidate.date +" day later");
      $(".number-info").text(candidate.phone);
      $(".email").text(candidate.email);
      $(".address").text(candidate.address);

      _$skills.addSkills(skills);
      _$experiences.addExperiences(experiences);
    },

    "loadInformation": function () {
      $.getJSON("/candidates/"+$.urlParam("id"), function (json) {
        if (json.status === 200)
          _$content.showInformation(json.contact[0], json.experience, json.skills);
      }).done(function () {

      });
    }
  });

  _self.init = function () {
    _self.initHandler();
    _$content.trigger("loadInformation");
  };

  _self.initHandler = function () {
    _$content.on("loadInformation", _$content.loadInformation);
    _$buttonEdit.on("click", _$buttonEdit.changeButton);
    _$buttonSkill.on("click", _$buttonSkill.addSkill);
    _$buttonExperience.on("click", _$buttonExperience.addExperience);
  };
}

$(new Profile().init);