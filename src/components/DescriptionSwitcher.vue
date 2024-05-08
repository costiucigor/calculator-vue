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
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5039 4.80007L9.16502 11.139C8.41641 11.8876 8.41641 13.1126 9.16502 13.8612L15.5039 20.2001" stroke="#B5BBC2" stroke-width="1.793" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
    <div class="name">{{ currentName }}</div>
    <div class="arrow right" @click="switchName(1)">
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.49609 4.80008L15.835 11.139C16.5836 11.8876 16.5836 13.1126 15.835 13.8612L9.49609 20.2001" stroke="#B5BBC2" stroke-width="1.793" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
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
  width: 325px;
  height: 44px;
}

.content {
  margin-top: 12px;
  width: 100%;
  max-width: 325px;
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
  height: 35px;
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
  font-size: 22px;
  font-family: "Roboto Bold";
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  width: 280px;
  height: 35px;
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
