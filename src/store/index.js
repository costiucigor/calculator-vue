// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            showModal: false,
            // Other state properties here
        };
    },
    mutations: {
        setShowModal(state, value) {
            state.showModal = value;
        },
        // Other mutations here
    },
    actions: {
        setShowModal(context, value) {
            context.commit('setShowModal', value);
        },
        // Other actions here
    },
    getters: {
        showModal: state => state.showModal,
        // Other getters here
    }
});

export default store;
