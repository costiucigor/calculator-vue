<template>
  <div>
    <!-- Main modal -->
    <div class="modal-container" v-if="!showContactManagerModal">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <input type="text">
        <button class="submit-button" @click="showContactManagerModal = true">Свяжитесь с менеджером</button>
      </div>
    </div>

    <!-- Contact manager modal -->
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showContactManagerModal = ref(false);
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  width: 390px;
  height: auto;
  border-radius: 12px 0px 0px 0px;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-family: "Montserrat Black";
  font-weight: 700;
  font-size: 35px;
  line-height: 42px;
  align-items: center;
}

.contact-form {
  /* Styles for contact form inputs */
}

.submit-button {
  /* Styles for submit button */
}
</style>
