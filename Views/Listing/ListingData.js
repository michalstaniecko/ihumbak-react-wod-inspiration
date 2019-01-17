
const ADRES_API = "http://staging.wod-inspiration.com/wp-json/wp/v2";

function kodUrl(offset, items, id = 1, status='publish') {

	return `${ADRES_API}/wod?author=${id}&per_page=${items}&offset=${offset}&status=${status}`;
}

function getListingWOD(offset = 0, items = 10, user = false) {
	var options;
	var userID = 1;
	var status = 'publish';
	if (user && user.userID != 1) {
		options = {
			headers: {
				'Authorization': 'Bearer ' + user.authToken
			}
		};
		userID= user.userID;
		status = 'private';
	}

	return fetch(kodUrl(offset, items + 1, userID,status), options)
		.then(response => response.json())
		.then(responseJSON => {
			return {
				data: responseJSON,
				isLoading: false,
				offset: offset + 10
			}
		})
		.catch(error => {
			console.error(error);
		});
}

function getSingleWOD(id, status='publish', user=null) {
	var options;
	var url = `${ADRES_API}/wod/${id}`;
	if (status=='private') {
		//url = url+`&status=${status}`;
		options = {
			headers: {
				'Authorization': 'Bearer ' + user.authToken
			}
		};
	}
	return fetch(url, options)
		.then(response=>response.json())
		.then(responseJSON => {
			return {
				data: responseJSON,
				isLoading: false,
			}
		})
		.catch(error=> {
			console.error(error);
		});
}

export default {
	getListingWOD: getListingWOD,
	getSingleWOD: getSingleWOD
};