/**
 * Created by Denis on 07.03.2018.
 */
'use strict';

function Candidates() {
	let _self = this;
	
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
	
	// let _$filter = $('.filter').data({
	// 	"model": {
	// 		"state": "Empty",
	// 	}
	// });
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
			// if (id === "position") {
			//
			// 	_$filter.data("model").value[0] = "position=" + value;
			//
			// } else if (id === "description") {
			//
			// 	_$filter.data("model").value[1] = "description=" + value;
			//
			// } else if (id === "salary") {
			//
			// 	_$filter.data("model").value[2] = "salary=" + value;
			//
			// }
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
	// $.extend(_$filter,{
	// 	"changeFilterState": function (event) {
	// 		event.stopPropagation();
	// 		event.preventDefault();
	//
	// 		_$filter.data('model').state = this.text;
	// 		$('#current-state').html(	_$filter.data('model').state);
	//
	// 		_$button.data('model').current = 0;
	// 		_$button.data('model').page = 1;
	//
	// 		_$content.loadItems();
	//
	// 		return false;
	// 	}
	// });
	
	
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
											"<div><img src='"+item.image + "'alt='' ></div>"+
											"</td>"+
											"<td class='candidates-name'>" + item.name +"</td>"+
											"<td class='candidates-mail'>" + item.email +"</td>" +
											"<td class='candidates-position'>" + item.position +"</td>"+
											"<td class='candidates-date'>"+ item.date + " day ago</td>"+
											"<td class='candidates-stage'>" + item.status + "</td>" +
											"<td><a href='/views/profile.html?id="+ item.id+"'>Show Profile</a></td></tr>";
			// let template =  "<div class='col-xs-6 col-sm-4 col-md-3 content-candidates-card'>"+
			// 	"<div id ='" + item.id + "'" + "  class='candidates-item'>"+
			// 	"<div class='candidates-image'>"+
			// 	"<span>" + item.status + "</span>"+
			// 	"<a href='profile.html?id="+ item.id+"' class='thumbnail'>" +
			// 	"<img src='"+ item.image +"' alt='...'>"+ "</a></div>"+
			// 	"<div class='caption'>"+
			// 	"<p class='candidates-item-job-position'>" + item.position + "</p>"+
			// 	"<p class='candidates-item-name'>" + item.name + " "+ item.lastName +"</p>"+
			// 	"<p class='candidates-item-salary'>" + item.payment + "\$" + "</p>"+
			// 	"<p class='candidates-item-time'>" + item.date + " day later</p></div></div></div>";
				this.append(template);
		},
		"isEmpty": function () {
			// if (!$("div", this).length) {
			// 	this.append($('<div class=" text-center">' +
			// 		'No result found</div>'));
			// }
			if (!$("tr td", this).length) {
				this.append($('<tr class="no-result text-center">' +
					'<td colspan="' + $('.filters th').length + '">' +
					'No result found</td></tr>'));
			}
		},
		"clear": function () {
			// this.empty();
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
		
	};
}

$(new Candidates().init);

// (function ($) {
//   $(document).ready(function () {
//
//     $('#nav-menu').on('click', function () {
//       $('.navigation').toggleClass('show');
//     });
//
//     $('.button-bell').on('click', function () {
//       $('.notification-block').toggleClass('hide-notification');
//     });
//
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
