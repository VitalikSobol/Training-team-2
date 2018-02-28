(function ($) {
  $(document).ready(function () {

    /* open or close navigation menu <992px*/

    $('#nav-menu').on('click', function () {
      $('.navigation').toggleClass('show');
    });

  });
})(jQuery);

$(document).ready(function () {

  $.getJSON('http://localhost:63342/Training-team-2/assets/content/vacancies_data.json', function (data) {
    var vacancies_data = '';
    for(var i = 0; i < data.vacancies.length; i++) {
      console.log(data.vacancies.length);
      vacancies_data += '<tr>';
      vacancies_data += '<td>' + data.vacancies[i].position + '</td>';
      vacancies_data += '<td>' + data.vacancies[i].name + '</td>';
      vacancies_data += '<td><a href="#">' + '---' + '</a></td>';
      vacancies_data += '<td>' + 'View Candidates' + '</td>';
      vacancies_data += '</tr>';
    }
    $('#vacancies_table').append(vacancies_data);
  });

});
/*

$(function () {
  $.getJSON('vacancies_data.json', function (data) {
    for(var i = 0; i < data.vacancies.length; i++){
      $('#vacancies_table').append('<tr><td>' + data.vacancies[i].position + '</td><td>' + data.vacancies[i].name +
        '</td><td>---</td><td>View Candidates</td><tr>');
    }
  });

});*/