/**
 * Created by Denis on 07.03.2018.
 */
'use strict';

function Candidates() {
	let _self = this;
	let _$navMenu = $("#nav-menu");
	
	$.extend(_$navMenu, {
		"onClick": function () {
			$('.navigation').toggleClass('show');
		}
	});
	
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
		"model":{
			"getModel" : function (item) {
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
											"<p>"+ item.title +"</p>" +
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
			"model":{
				"getModel" : function (item) {
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
										 "<div class='candidates-photo'>" +
			               "<div><img src='"+ item.image +"' alt='' width='100'></div>" +
				             "</div><div>" +
										 "<p>" + item.name + "</p>" +
										 "<p>"+ item.email + "</p>" +
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
	
	let _$content = $('#candidates').data({
		"model": {
			"getModel": function(item) {
				item = item || {};
				item.name = item.name || "";
				item.lastName = item.lastName || "";
				item.position = item.position || "";
				item.status = item.status || "";
				item.payment = item.payment || "";
				item.image = item.image || "";
				item.date = item.date || "";
				return item;
			}
		}
	});
	
	let _$button = $('#control').data({
		"model": {
			"current": 0,
			"page": 1
		}
	});
	
	let _$rows = $('#count-items').data({
		"model": {
			"currentRowsNumber": 10
		}
	});
	
	$.extend(_$button, {
		"onPressed": function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			if ($(event.target).hasClass("button-next")) {
				if (_$button.hasNext($('#total').html(), _$rows.data("model").currentRowsNumber,
						_$button.data("model").current)) {
					
					_$button.data("model").current += Number.parseInt(_$rows.data("model").currentRowsNumber);
					
					_$button.data("model").page = _$button.data("model").page + 1;
					
					_$content.loadItems();
				}
			} else {
				if (_$button.hasPrevious($('#total').html(), _$rows.data("model").currentRowsNumber,
						_$button.data("model").current)) {
					
					_$button.data("model").current -= Number.parseInt(_$rows.data("model").currentRowsNumber);
					
					_$button.data("model").page = _$button.data("model").page - 1;
					
					_$content.loadItems();
				}
			}
			return false;
		},
		"hasNext": function (total, rows, current) {
			return Number.parseInt(total) - current - rows > 0;
		},
		"hasPrevious": function (total, rows, current) {
			return current - rows >= 0;
		}
	});
	
	let _$inputField = $('.search-input').data({
		"model": {
			"fullName": "none"
		}
	});
	
	$.extend(_$inputField, {
		"changeInputState": function (event) {
			event.stopPropagation();
			event.preventDefault();
		
			_$inputField.data('model').fullName = _$inputField.val() || "none";
			
			_$button.data("model").current = 0;
			_$button.data("model").page = 1;
			
			_$content.loadItems();
			
			return false;
		}
	});
	
	let _$filter = $(".filters").data({
		"model": {
			"value": ["name=none", "email=none", "position=none", "date=none", "status=none"]
		}
	});
	
	$.extend(_$filter, {
		"onKeyUp": function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			let element = $(event.target).attr("id");
			
			_$filter.addFilter(_$filter.getInputValue(element), element);
			
			_$button.data("model").current = 0;
			_$button.data("model").page = 1;
			
			_$content.loadItems();
			
			return false;
		},
		"addFilter": function (value, id) {
			switch (id){
				case ("name"):{
					_$filter.data("model").value[0] = "name=" + value;
					break;
				}
				case ("email") :{
					_$filter.data("model").value[1] = "email=" + value;
					break;
				}
				case ("position"):{
					_$filter.data("model").value[2] = "position=" + value;
					break;
				}
				case ("date"):{
					_$filter.data("model").value[3] = "date=" + value;
					break;
				}
				case ("status"):{
					_$filter.data("model").value[4] = "status=" + value;
					break;
				}
			}
		},
		"getInputValue": function (elementId) {
			let id = "#" + elementId;
			/*replace with template for regexp*/
			if ($(id).val() === "") {
				return "none";
			}
			return $(id).val();
		}
	});
	$.extend(_$rows, {
		"changeRowsNumber": function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			_$rows.data('model').currentRowsNumber = this.text;
			
			$("#current-items").html(_$rows.data('model').currentRowsNumber);
			
			_$button.data('model').current = 0;
			_$button.data('model').page = 1;
			
			_$content.loadItems();
			
			return false;
		}
	});
	
	
	$.extend(_$content, {
		"addItems": function (items) {
			items.forEach($.proxy(this, "addItem"));
		},
		"addItem": function (item) {
			item = this.data("model").getModel(item);
			let template  = "<tr id='" + item.id + "'>" +
											"<td class='candidates-photo'>"+
											"<div><img src='"+item.image + "'alt='' width='100'></div>"+
											"</td>"+
											"<td class='candidates-name'>" + item.name +"</td>"+
											"<td class='candidates-mail'>" + item.email +"</td>" +
											"<td class='candidates-position'>" + item.position +"</td>"+
											"<td class='candidates-date'>"+ item.date + " day ago</td>"+
											"<td class='candidates-stage'>" + item.status + "</td>" +
											"<td><a href='/views/profile.html?id="+ item.id+"'>Show Profile</a></td></tr>";
				this.append(template);
		},
		"isEmpty": function () {
			if (!$("tr td", this).length) {
				this.append($('<tr class="no-result text-center">' +
					'<td colspan="' + $('.filters th').length + '">' +
					'No result found</td></tr>'));
			}
		},
		"clear": function () {
			this.find("tbody").empty();
		},
		"loadItems": function () {
			
			let query = {};
			query.rows = _$rows.data("model").currentRowsNumber;
			query.begin = _$button.data("model").current;
			query.page = _$button.data("model").page;
			query.filter = _$filter.data("model").value.join("&");
			
			$.getJSON("/candidates/", query, function (json) {
				_$content.clear();
				
				json.status === 200 && Array.isArray(json.data) && _$content.addItems(json.data);
				
				$("#total").html(json.total);
				$("#range").html(json.range);
				_$content.isEmpty();
				
			}).done(function () {
				
			});
		},
		"clickItem": function (event) {
				event.stopPropagation();
				event.preventDefault();
				$(location).attr('href','/views/profile.html?id=' + $(this).attr("id"));
				return false;
		}
	});
		let _$buttonBell = $('.button-bell');
		
		$.extend(_$buttonBell, {
			"clickButton": function (event) {
				event.stopPropagation();
				event.preventDefault();
				
				$('.notification-block').toggleClass('hide-notification');
			}
		});
	
	
	_self.init = function () {
		_self.initHandler();
		_$content.trigger("loadItems");
		_$notificationCandidates.trigger("loadCandidates");
		_$notificationEvent.trigger("loadEvents");
	};
	
	_self.initHandler = function () {
		_$rows.on("click", ".dropdown-content a", _$rows.changeRowsNumber);
		// _$filter.on("click",".dropdown-content a", _$filter.changeFilterState);
		_$filter.on("keyup", "input", _$filter.onKeyUp);
		_$button.on("click", _$button.onPressed);
		_$inputField.on("keyup",_$inputField.changeInputState);
		_$content.on("loadItems", _$content.loadItems);
		_$content.on("click", ".candidates-item", _$content.clickItem);
		_$buttonBell.on('click', _$buttonBell.clickButton);
		_$notificationCandidates.on("loadCandidates", _$notificationCandidates.loadCandidates);
		_$notificationEvent.on("loadEvents", _$notificationEvent.loadEvents);
		_$showAllCandidates.on("click", _$showAllCandidates.onClick);
		_$showAllEvent.on("click", _$showAllEvent.onClick);
		_$navMenu.on("click", _$navMenu.onClick);
		_$buttonShowCandidateBlock.on("click", _$buttonShowCandidateBlock.onClick);
		_$buttonShowNotifBlock.on("click", _$buttonShowNotifBlock.onClick);
		
	};
}

$(new Candidates().init);

// (function ($) {
//   $(document).ready(function () {
//     $('#all-candidates-notification').on('click', function () {
//       $('.notification-body-candidates').toggleClass('js-all-candidates');
//     });
//
//     $('#all-interview-natification').on('click', function () {
//       $('.notification-body-interview').toggleClass('js-all-interview');
//     });
//
//   });
// })(jQuery)
