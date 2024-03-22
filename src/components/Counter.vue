<template>
  <div class="container-counter">
    <div class="title">
      {{ title }}
    </div>
    <div class="number" :class="{ 'invalid': count < 500 || count > 1800 }">
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
    <div v-if="count < 500 || count > 1800" class="warning-text">Value should be between 500mm and 1800mm</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
      count: 1500
    };
  },
  methods: {
    increment() {
      if (this.count < 1800) { // Update maximum value check
        this.count = Math.min(1800, this.count + 10); // Update maximum value
      }
    },
    decrement() {
      if (this.count > 500) {
        this.count = Math.max(500, this.count - 10);
      }
    },
    validateInput() {
      this.count = Math.min(1800, Math.max(500, Math.floor(Number(this.count) / 10) * 10)); // Update maximum value
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
  display: flex; /* Add display flex */
  align-items: center; /* Center vertically */
}

.minus,
.plus {
  color: #135EE4;
  width: 21px;
  margin-top: 8px;
  border-radius: 4px;
  justify-content: center;
  padding: 8px 5px; /* Adjust padding */
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
  border: #fafafa;
  border-radius: 4px;
  margin: 0 5px; /* Add margin for spacing */
}
</style>