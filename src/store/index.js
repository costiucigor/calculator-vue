import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            showModal: false,
            price: 10000,
            quantity: 1,
        };
    },
    mutations: {
        setShowModal(state, value) {
            state.showModal = value;
        },
        setInitialPrice(state, price) {
            state.price = price;
        },
        incrementPrice(state, amount) {
            state.price += amount;
        },
        decrementPrice(state, amount) {
            state.price -= amount;
        },
        // Corrected mutation name to updateQuantity
        updateQuantity(state, quantity) {
            state.quantity = quantity;
        },
    },
    actions: {
        setShowModal(context, value) {
            context.commit('setShowModal', value);
        },
        setInitialPrice({ commit }, price) {
            commit('setInitialPrice', price);
        },
        incrementPrice({ commit }, amount) {
            commit('incrementPrice', amount);
        },
        decrementPrice({ commit }, amount) {
            commit('decrementPrice', amount);
        },
        // Corrected action name to setQuantity and mutation name to updateQuantity
        setQuantity({ commit }, quantity) {
            commit('updateQuantity', quantity);
        },
    },
    getters: {
        showModal: state => state.showModal,
        getPrice: state => state.price,
        // Corrected getter name to getQuantity
        getQuantity: state => state.quantity,
    }
});

export default store;
