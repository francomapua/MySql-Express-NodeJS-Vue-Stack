import axios from "axios"

const module = `User`;
const path = `users`;

export const state = {
	token: null,
	status: "",
};

export const getters = {
  token: (state) => state.token,
  isAuthenticated: state => !!state.token,
};

export const mutations = {
	token: function(state, tokenObj = null){
		
		// Ensure tokenObj is an object
		if(typeof tokenObj == 'string'){
			tokenObj = JSON.parse(tokenObj)
		}
		
		tokenObj
			? sessionStorage.setItem("token", JSON.stringify(tokenObj))
      : sessionStorage.removeItem("token")
    const base = axios.create({
      baseURL: "http://localhost:8080/api",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-type": "application/json",
        "Authorization": (tokenObj ? `Basic ${tokenObj.token}` : 'null') 
      }
    });
    this._vm.$http = base
		state.token = tokenObj;
	},
	status: (state, status = "idle") => (state.status = status),
};

export const actions = {
	login({ commit }, data) {
		return this._vm.$http
			.post(`/${path}/login`, data)
			.then((response) => {
				const token = response.data ? response.data.token : null;
				if (token) {
					commit(`user`, {username : data.username} )
					commit(`token`, {username : data.username, token});
				}
			})
			.catch((err) => {
				const status = err.response ? err.response.status : null;
        var errorMessage
        switch (status) {
					case 401:
						errorMessage = "Invalid Username or Password";
						break;
					case 500:
						errorMessage =
							"Internal Server Error. Please inform maintenance";
						break;
					default:
						errorMessage = "Something went wrong";
						break;
        }
        console.log('err :>> ', err);
        throw new Error(errorMessage)
			});
	},
	logout({ commit, getters }) {
		var username = getters.token ? getters.token.username : null 
		return this._vm.$http
			.post(`/${path}/logout`, {username})
			.then(() => {
				commit(`token`, null);
			})
			.catch((err) => {
        const status = err.response ? err.response.status : null;
        var errorMessage
        switch (status) {
					case 400:
						errorMessage = "User is already logged out";
						break;
					case 500:
						errorMessage =
							"Internal Server Error. Please inform maintenance";
						break;
					default:
						errorMessage = "Something went wrong";
						break;
        }
        throw new Error(errorMessage)
			});
	},

	// --- Generic Methods
	[`getAll${module}s`]() {
		return this._vm.$http.get(`/${path}`);
	},
	[`get${module}`](store, { id }) {
		return this._vm.$http.get(`/${path}/${id}`);
	},
	[`create${module}`](store, data) {
		return this._vm.$http.post(`/${path}`, data);
	},
	[`update${module}`](store, { id, data }) {
		return this._vm.$http.put(`/${path}/${id}`, data);
	},
	[`delete${module}`](store, { id }) {
		return this._vm.$http.delete(`/${path}/${id}`);
	},
	[`deleteAll${module}s`]() {
		return this._vm.$http.delete(`/${path}`);
	},
};
