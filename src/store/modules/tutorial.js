const module = `Tutorial`;
const path = `tutorials`;

export const state = {

};

export const getters = {
	dummytut : () => 'du,,y '
};

export const mutations = {
};

export const actions = {
	findByTitle(store, {title}) {
    return this._vm.$http.get(`/tutorials?title=${title}`)
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
