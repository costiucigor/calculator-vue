<script setup>
import {ref, watch} from 'vue';
import WindowChoosing from './components/WindowChoosing.vue';
import store from "./store/index.js";

const toggleModal = () => {
  store.commit('setShowModal', !store.state.showModal);
};
</script>

<template>
  <WindowChoosing :showModal="store.state.showModal"/>
  <div class="submit-button">
    <button @click.prevent="toggleModal">Получите расчёт</button>
  </div>
</template>


<style scoped>
</style>
