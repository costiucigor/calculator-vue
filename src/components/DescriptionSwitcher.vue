<script setup>
import {computed, ref} from 'vue';

const names = ref(['Стандарт Эконо', 'Стандарт Ларго', 'Комфорт Евро', 'Комфорт Люмо', 'Комфорт Браво', 'Премиум Примо']);
const descriptions = ref(['Базовый стандарт как для жилых, так и нежилых помещений, балконов, лоджий.', 'Базовый стандарт с улучшенной теплоизоляцией.', 'Стандарт комфортной и удобной жизни.', "Комфортабельные окна, идеальные для жилых помещений с недостаточным освещением.", "Комфортабельные и крепкие окна, идеальное решение для больших оконных проёмов.", "Бескомпромиссное решение для тех, кто привык к лучшему."]);
const current_url = ref(['https://new.okonti.ru/p/system/econo/', 'https://new.okonti.ru/p/system/largo/', 'https://new.okonti.ru/p/system/euro/', 'https://new.okonti.ru/p/system/lumo/', 'https://new.okonti.ru/p/system/bravo/', 'https://new.okonti.ru/p/system/primo/'])
const currentIndex = ref(0);

const currentName = computed(() => names.value[currentIndex.value]);
const currentDescription = computed(() => descriptions.value[currentIndex.value]);
const currentUrl = computed(() => current_url.value[currentIndex.value]);

const switchName = (direction) => {
  currentIndex.value = (currentIndex.value + direction + names.value.length) % names.value.length;
};
</script>

<template>
  <div class="name-switcher">
    <div class="arrow left" @click="switchName(-1)">
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 4L6.56957 10.1742C5.81014 10.9034 5.81014 12.0966 6.56957 12.8258L13 19" stroke="#B5BBC2" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="name">{{ currentName }}</div>
    <div class="arrow right" @click="switchName(1)">
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4L16.4304 10.1742C17.1899 10.9034 17.1899 12.0966 16.4304 12.8258L10 19" stroke="#B5BBC2" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <div class="content">
    <div class="description">{{ currentDescription }}</div>
    <div class="read-more-container">
      <a class="read-more" :href="currentUrl" target="_blank">Подробнее о системе</a>
    </div>
  </div>
</template>

<style scoped>
.name-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 290px;
  height: auto;
}

.content {
  position: relative;
  margin-top: 12px;
  width: 100%;
  max-width: 290px;
  min-width: 290px;
  max-height: 86px;
  min-height: 86px;
  padding: 0 20px;
  text-align: center;
}

.read-more-container {
  margin-bottom: 18px;
}

.read-more {
  font-size: 14px;
  cursor: pointer;
  color: #135EE4;
}

.arrow {
  cursor: pointer;
  font-size: 20px;
  width: 35px;
  height: 44px;
  background-color: #f4f4f4;
}

.arrow.right {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 5px 5px 0;
}

.arrow.left {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 0 0 5px;
}

.name {
  cursor: default;
  font-weight: bold;
  font-size: 18px;
  font-family: "Roboto Bold";
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  width: 240px;
  height: 44px;
}

.description,
.description-2 {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  text-align: center;
  margin-top: 6px;
}
</style>
