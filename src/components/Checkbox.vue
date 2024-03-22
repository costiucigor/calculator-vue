<template>
  <div class="checkbox">
    <div class="checkbox-input">
      <input type="checkbox" v-model="isChecked" :id="id" />
    </div>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  label: String
})

const isChecked = ref(false);
const id = 'checkbox-' + Math.random().toString(36).substring(7);
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  border-radius: 4px;
}

.checkbox input[type="checkbox"] {
  cursor: pointer;
  width: 18.19px;
  height: 18px;
  accent-color: #76BC21;
  color: #fafafa;
  margin-right: 10px;
}

.checkbox input[type="checkbox"]::before {
  color: #fafafa;
}

.checkbox label {
  margin-top: 12px;
  color: #707C8B;
  text-align: left;
  font-size: 12px;
}
</style>