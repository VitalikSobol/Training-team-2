/**
 * Created by Denis on 02.04.2018.
 */
'use strict';
function UtilController() {
	let _self = this;
	
	_self.computeRange = (rows, page, total)=>{
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
}

module.exports = new UtilController();