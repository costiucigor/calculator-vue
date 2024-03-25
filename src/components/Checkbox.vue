<script setup>
import { ref } from 'vue';

defineProps({
  label: String
});

const isChecked = ref(false);
const id = 'checkbox-' + Math.random().toString(36).substring(7);
</script>

<template>
  <div class="checkbox">
    <div class="checkbox-input">
      <input type="checkbox" v-model="isChecked" :id="id" />
    </div>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
}

.checkbox-input input {
  accent-color: #76bc21;
  cursor: pointer;
  width: 19px;
  height: 19px;
  background-color: #76BC21;
}

.checkbox label {
  margin-top: 12px;
  color: #707C8B;
  text-align: left;
  font-size: 12px;
}
</style>
