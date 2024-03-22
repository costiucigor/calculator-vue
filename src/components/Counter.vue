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
      <input type="text" v-model="count" @input="validateInput" />
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

<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      count: 1500,
      error: false,
      errorText: ''
    };
  },
  methods: {
    increment() {
      if (this.count < 1800) {
        this.count = Math.min(1800, this.count + 10);
        this.error = false;
      } else {
        this.error = true;
        this.errorText = 'Максимальный размер';
      }
    },
    decrement() {
      if (this.count > 500) {
        this.count = Math.max(500, this.count - 10);
        this.error = false; // Reset error flag
      } else {
        this.error = true;
        this.errorText = 'Минимальный размер';
      }
    },
    validateInput() {
      if (this.count < 500 || this.count > 1800) {
        this.error = true;
        this.errorText = this.count < 500 ? 'Минимальный размер' : 'Максимальный размер';
      } else {
        this.error = false;
        this.errorText = '';
      }
      this.count = Math.min(1800, Math.max(500, Math.floor(Number(this.count) / 10) * 10));
    }
  }
};
</script>

<style>
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
  font-size: 26px;
  border: none;
  border-radius: 4px;
  margin: 0 5px;
}

.warning-text {
  margin-left: 14px;
  position: absolute;
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>