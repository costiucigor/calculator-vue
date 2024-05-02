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
      <input ref="input" type="text" v-model="count" @input="handleInput" @blur="validateInput" :style="{ maxWidth: maxWindowWidth + 'px' }"/>
      <div class="plus" @click="increment">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18H27" stroke="#135EE4" stroke-width="3" stroke-linecap="round"/>
          <path d="M18 27L18 9" stroke="#135EE4" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <div v-if="error && !maxError" class="warning-text">{{ errorText }}</div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue';

// Define props
const props = defineProps({
  title: String,
  maxCount: {
    type: Number,
  },
});

// Destructure props
const { title, maxCount } = props;

onMounted(() => {
  console.log('Initial maxCount:', props.maxCount);

  // Watch for updates to props.maxCount
  watch(() => props.maxCount, (newValue, oldValue) => {
    console.log('maxCount updated:', newValue);
    // You can perform any necessary actions here when maxCount changes
  });
});

// Define reactive variables
let count = ref(props.maxCount);
const error = ref(false);
const errorText = ref('');
const maxError = ref(false);

// Define functions

const validateInput = () => {
  let inputNumber = count.value;
  if (inputNumber < 50) {
    count.value = '50'; // Adjust input to minimum value
    error.value = true;
    errorText.value = 'Минимальный размер';
    hideErrorMessage();
  } else if (inputNumber > props.maxCount) { // Adjusted condition
    count.value = props.maxCount; // Adjust input to maximum value
    error.value = true;
    errorText.value = 'Максимальный размер';
    hideErrorMessage();
  } else {
    // No error if the input number is within the valid range
    error.value = false;
    errorText.value = '';
  }
};

const hideErrorMessage = () => {
  setTimeout(() => {
    error.value = false;
    errorText.value = '';
    maxError.value = false; // Reset maxError flag after hiding error message
  }, 3000);
};

const handleInput = () => {
  // Remove non-numeric characters
  count.value = count.value.replace(/\D/g, '');
};

const increment = () => {
  const currentValue = parseInt(count.value);
  const incrementedValue = Math.min(currentValue + 10, props.maxCount); // Increment while respecting maxCount
  count.value = incrementedValue;

  if (currentValue === 50) {
    error.value = false;
  }

  if (incrementedValue === props.maxCount) {
    error.value = true;
    errorText.value = 'Максимальный размер';
    hideErrorMessage();
  } else {
    validateInput();
  }
};


const decrement = () => {
  maxError.value = false;
  if (count.value > 50) {
    count.value = Math.max(50, count.value - 10)
    validateInput(); // Validate input after decrementing count
  } else {
    error.value = true;
    errorText.value = 'Минимальный размер';
    hideErrorMessage();
  }
};

// Calculate max window width based on quantity of sashes
watch(() => props.maxCount, (newValue, oldValue) => {
  console.log('maxCount updated:', newValue);
  count.value = newValue; // Update count when maxCount changes
});

// Calculate max window width based on quantity of sashes

// Validate input on initial load
</script>

<style scoped>
.number {
  max-width: 1800px;
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
  margin-right: 10px;
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
  width: 64px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
}

.input-invalid {
  border-color: red;
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
