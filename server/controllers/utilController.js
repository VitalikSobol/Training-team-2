/**
 * Created by Denis on 02.04.2018.
 */
'use strict';

function UtilController() {
  let _self = this;

  _self.computeRange = (rows, page, total) => {
    if (total % rows === 0) {
      if (page === 1) {
        return page + "-" + page * rows;
      }
      else {
        return (page * rows - rows + 1) + "-" + page * rows;
      }
    } else {
      let delta = total % rows;
      let diff = rows - delta;

      if (page * rows > total) {
        return ((page * rows - rows + 1) + "-" + (page * rows - diff));
      } else {
        return (page * rows - rows + 1) + "-" + (page * rows);
      }

    }
  };

  _self.addFilterForCandidates = (filter) => {
    let query = 'HAVING ';

    if (filter.name !== "") {
      query += 'first_name LIKE ';
      query += '\'%' + filter.name + '%\'';
      query += ' AND ';
    }
    if (filter.position !== "") {
      query += 'position LIKE ';
      query += '\'%' + filter.position + '%\'';
      query += ' AND ';
    }
    if (filter.email !== "") {
      query += 'email LIKE ';
      query += '\'%' + filter.email + '%\'';
      query += ' AND ';
    }
    if (filter.date !== "") {
      query += 'date LIKE';
      query += '\'' + filter.date + '%\'';
      query += ' AND ';
    }
    if (filter.status !== "") {
      query += 'status LIKE';
      query += '\'%' + filter.status + '%\'';
      query += ' AND ';
    }
    query = query.substring(0, (query.length - 'AND '.length));

    return (query === 'HAV') ? ' ' : query;
  };

  _self.addFilterForVacancies = (filter) => {
    let query = 'WHERE ';

    if (filter.position !== "") {
      query += 'position LIKE ';
      query += '\'%' + filter.position + '%\'';
      query += 'AND ';
    }
    if (filter.description !== "") {
      query += 'description LIKE ';
      query += '\'%' + filter.description + '%\'';
      query += 'AND ';
    }
    if (filter.status !== "") {
      query += 'vacancy_status.name LIKE ';
      query += '\'%' + filter.status + '%\'';
      query += 'AND ';
    }
    if (filter.salary1 !== "" || filter.salary2 !== "") {
      if (filter.salary1 !== "" && filter.salary2 !== "") {
        query += " salary >=" + filter.salary1 + " AND salary <= " + filter.salary2;
        query += 'AND ';
      }
      else if (filter.salary1 !== "") {
        query += " salary >=" + filter.salary1;
        query += ' AND ';
      }
      else {
        query += " salary <=" + filter.salary2;
        query += 'AND ';
      }
    }

    query = query.substring(0, (query.length - 'AND '.length));

    return (query === 'WH') ? ' ' : query;

  };
}

module.exports = new UtilController();
