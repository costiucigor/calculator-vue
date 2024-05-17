<template>
  <div class="container-counter">
    <div class="title">
      {{ title }}
    </div>
    <div class="number" :class="{ 'invalid': error }">
      <div class="minus" @click="decrement">
        <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.3999 14.4999H23.9999" stroke="#B5BBC2" stroke-width="2.39066" stroke-linecap="round"/>
        </svg>
      </div>
      <input ref="input" type="text" v-model="count" @input="handleInput" @blur="validateInput" :style="{ maxWidth: maxWindowWidth + 'px' }"/>
      <div class="plus" @click="increment">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 9H16" stroke="#B5BBC2" stroke-width="3" stroke-linecap="round"/>
          <path d="M9 16L9 2" stroke="#B5BBC2" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <div v-if="error && !maxError" class="warning-text">{{ errorText }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

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
  watch(() => props.maxCount, (newValue) => {
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
    count.value = Math.max(50, count.value - 10);
    validateInput(); // Validate input after decrementing count
  } else {
    error.value = true;
    errorText.value = 'Минимальный размер';
    hideErrorMessage();
  }
};

// Calculate max window width based on quantity of sashes
watch(() => props.maxCount, (newValue) => {
  console.log('maxCount updated:', newValue);
  count.value = newValue; // Update count when maxCount changes
});

// Calculate max window width based on quantity of sashes

// Validate input on initial load
</script>

<style scoped>
.container-counter {
  position: relative;
}

.number {
  display: flex;
  align-items: center;
  border-radius: 5px;
  background: #f4f4f4;
}

.number.invalid {
  border-color: red;
}

.minus,
.plus {
  width: 32px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

input {
  width: 58px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background: #f4f4f4;
  margin: 0 5px;
}

@media not all and (min-resolution:.001dpcm) {
  @supports (-webkit-appearance:none) {
    input {
      width: 50px;
    }
  }
}

.warning-text {
  margin-left: 2px;
  position: absolute;
  color: red;
  font-size: 12px;
  width: 150px;
  margin-top: 1px;
}

.title {
  margin-bottom: 4px;
  font-size: 14px;
}
</style>
