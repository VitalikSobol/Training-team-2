"use strict";

function Application() {
	
	let _self = this;
	
	let _$navMenu = $("#nav-menu");
	
	let _$totalRows = $("#total");

	let _$buttonVacancies = $(".button-save-vacancies");
	
	let _$rows = $("#count-items").data({
		"model": {
			"currentRowsNumber": 10,
			"getCurrentRowsNumber": function () {
				return _$rows.data("model").currentRowsNumber;
			},
			"setCurrentRowsNumber": function (number) {
				_$rows.data("model").currentRowsNumber = number;
			}
		}
	});
	
	let _$table = $(".table").data({
		"model": {
			"getModel": function (item) {
				item = item || {};
				item.position = item.position || "";
				item.description = item.description || "";
				item.salary = item.salary || "";
				return item;
			}
		}
	});
	
	let _$filter = $(".filters").data({
		"model": {
			"position": "none",
			"description": "none",
			"salary": "none"
		}
	});
	
	let _$buttonGroup = $("#table-control").data({
		"model": {
			"current": 0,
			"page": 1
		}
	});
	
	$.extend(_$buttonGroup, {
		"onPressed": function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			if ($(event.target).hasClass("button-next")) {
				if (_$buttonGroup.hasNext(_$totalRows.html(), _$rows.data("model").currentRowsNumber,
						_$buttonGroup.data("model").current)) {
					
					_$buttonGroup.data("model").current += Number.parseInt(_$rows.data("model").currentRowsNumber);
					
					_$buttonGroup.data("model").page = _$buttonGroup.data("model").page + 1;
					
					_$table.loadItems(event, {
						begin: _$buttonGroup.data("model").current,
						page: _$buttonGroup.data("model").page
					});
				}
			} else {
				if (_$buttonGroup.hasPrevious(_$totalRows.html(), _$rows.data("model").currentRowsNumber,
						_$buttonGroup.data("model").current)) {
					
					_$buttonGroup.data("model").current -= Number.parseInt(_$rows.data("model").currentRowsNumber);
					
					_$buttonGroup.data("model").page = _$buttonGroup.data("model").page - 1;
					
					_$table.loadItems(event, {
						begin: _$buttonGroup.data("model").current,
						page: _$buttonGroup.data("model").page
					});
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
	
	$.extend(_$filter, {
		"onKeyUp": function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			let element = $(event.target).attr("id");
			
			_$filter.addFilter(_$filter.getInputValue(element), element);
			
			_$buttonGroup.data("model").current = 0;
			_$buttonGroup.data("model").page = 1;
			
			_$table.loadItems();
			
			return false;
		},
		"addFilter": function (value, id) {
			
			if (id === "position") {
				_$filter.data("model").position = value;
				
			} else if (id === "description") {
				_$filter.data("model").description = value;
				
			} else if (id === "salary") {
				_$filter.data("model").salary = value;
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
	
	$.extend(_$table, {
		"addItems": function (items) {
			
			items.forEach($.proxy(this, "addItem"));
			
		},
		"addItem": function (item) {
			
			item = this.data("model").getModel(item);
			
			this.append(
				"<tr><td>" + item.position + "</td>" +
				"<td class='mobile-device'>" + item.description + "</td>" +
				"<td class='mobile-device'>" + item.salary + "</td>" +
				"<td><a href='#'>View Candidates</a></td></tr>"
			);
			
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
		"loadItems": function (event, data) {
			data = data || {};
			
			let query = {};
			query.rows = _$rows.data("model").getCurrentRowsNumber();
			query.begin = data.begin || 0;
			query.page = data.page || 1;
			
			$.ajax({
				type: 'GET',
				url : '/vacancies/',
				data: {
					rows : query.rows,
					begin: query.begin,
					page: query.page,
					filter: {
							position: _$filter.data("model").position,
							description: _$filter.data("model").description,
							salary: _$filter.data("model").salary
					}
				},
				success : (json) => {
						_$table.clear();

						json.status === 200 && Array.isArray(json.data) && _$table.addItems(json.data);

						_$totalRows.html(json.total);

						_$table.isEmpty();

						$("#range").html(json.range);
				}
			});
		}
	});

	$.extend(_$buttonVacancies, {
		"addVacancies": function () {
			let model = {
				"position": $('.add-vacancy').val().trim(),
				"salary": $('.add-salary').val().trim(),
				"description": $('.add-description').val().trim()
			};
			if(model.position !== "" && model.description !== ""){
				$.ajax({
					url: "/vacancies",
					type: 'POST',
					data: JSON.stringify(model),
          success: function (data) {
            _$table.loadItems();
          }
				});
			}
    }
	});
	
	$.extend(_$rows, {
		"changeRowsNumber": function (event) {
			event.stopPropagation();
			event.preventDefault();
			
			_$rows.data("model").setCurrentRowsNumber(this.text);
			
			$("#current-items-count").html(_$rows.data("model").getCurrentRowsNumber());
			_$buttonGroup.data("model").current = 0;
			_$buttonGroup.data("model").page = 1;
			
			_$table.loadItems();
			
			return false;
		}
	});
	
	$.extend(_$navMenu, {
		"onClick": function () {
      if ($('.navigation').hasClass('show')){
        $('.navigation').removeClass('show');
      }else {
        $('.navigation').addClass('show');
      }
		}
	});
	
	_self.init = function () {
		_self.setEvent();
		_$table.trigger("loadItems");
	};
	
	_self.setEvent = function () {
		_$table.on("loadItems", _$table.loadItems);
		_$table.on("click", _$table.onClick);
    _$buttonVacancies.on("click", _$buttonVacancies.addVacancies);
		_$rows.on("click", ".dropdown-content a", _$rows.changeRowsNumber);
		_$filter.on("keyup", "input", _$filter.onKeyUp);
		_$buttonGroup.on("click", _$buttonGroup.onPressed);
		_$navMenu.on("click", _$navMenu.onClick);
	};
}

$((new Application()).init);

