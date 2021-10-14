import http from "../http-common";

class UserDataService {
	getAll(page = 0) {
		//return http.get(`restaurants?page=${page}`);
		return http.get(`?page=${page}`);
	}

	get(id) {
		//return http.get(`/restaurant?id=${id}`);
		return http.get(`/id/${id}`);
	}

	createUser(data) {
		//return http.post("/review-new", data);
		return http.post("", data);
	}

	updateUser(data) {
		//return http.put("/review-edit", data);
		return http.put("", data);
	}

	deleteUser(id) {
		//return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
		return http.delete("", {data:{_id: id}});
	}	
}

export default new UserDataService();