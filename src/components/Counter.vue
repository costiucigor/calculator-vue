<script setup>
import {ref} from 'vue';

defineProps({title: String})

const count = ref(1500);
const error = ref(false);
const errorText = ref('');

const increment = () => {
  if (count.value < 1800) {
    count.value = Math.min(1800, count.value + 10);
    error.value = false;
  } else {
    error.value = true;
    errorText.value = 'Максимальный размер';
  }
};

const decrement = () => {
  if (count.value > 500) {
    count.value = Math.max(500, count.value - 10);
    error.value = false;
  } else {
    error.value = true;
    errorText.value = 'Минимальный размер';
  }
};

const validateInput = () => {
  if (count.value < 500 || count.value > 1800) {
    error.value = true;
    errorText.value = count.value < 500 ? 'Минимальный размер' : 'Максимальный размер';
  } else {
    error.value = false;
    errorText.value = '';
  }
  count.value = Math.min(1800, Math.max(500, Math.floor(Number(count.value) / 10) * 10));
};
</script>

<template>
  <div class="container-counter">
    <div class="title">
      {{ title }}
    </div>
    <div class="number" :class="{ 'invalid': error }">
      <div class="minus" @click="decrement">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18H27" stroke="#135EE4" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>
      <input ref="input" type="text" v-model="count" @input="validateInput"/>
      <div class="plus" @click="increment">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18H27" stroke="#135EE4" stroke-width="3" stroke-linecap="round"/>
          <path d="M18 27L18 9" stroke="#135EE4" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <div v-if="error" class="warning-text">{{ errorText }}</div>
  </div>
</template>

<style scoped>
.number {
  width: 150px;
  height: 42px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.number.invalid {
  border-color: red;
}

.minus,
.plus {
  color: #135EE4;
  width: 21px;
  margin-top: 8px;
  border-radius: 4px;
  justify-content: center;
  padding: 8px 5px;
  cursor: pointer;
}

.invalid {
  border-color: red;
}

input {
  height: 38px;
  width: 64px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  margin: 0 5px;
}

.warning-text {
  margin-left: 14px;
  position: absolute;
  color: red;
  font-size: 12px;
  margin-top: 1px;
}

.title {
  margin-bottom: 4px;
  font-size: 14px;
}
</style>
