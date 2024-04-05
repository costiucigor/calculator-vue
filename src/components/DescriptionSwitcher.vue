<script setup>
import {computed, ref} from 'vue';

const names = ref(['Стандарт Эконо', 'Стандарт Ларго', 'Комфорт Евро', 'Комфорт Люмо', 'Комфорт Браво', 'Премиум Примо']);
const descriptions = ref(['Базовый стандарт как для жилых, так и нежилых помещений, балконов, лоджий.', 'Базовый стандарт с улучшенной теплоизоляцией.', 'Стандарт комфортной и удобной жизни.', "Комфортабельные окна, идеальные для жилых помещений с недостаточным освещением.", "Комфортабельные и крепкие окна, идеальное решение для больших оконных проёмов.", "Бескомпромиссное решение для тех, кто привык к лучшему."]);
const second_description = ref(['Качественное остекление за минимальные средства.', 'Универсальное решение как для жилых, так или нежилых помещений, балконов, лоджий.', 'Отличный вариант для жилых помещений с хорошим отоплением.', 'У этой системы самая узкая рама, за счет чего оконный проём зрительно кажется больше.', 'Надёжные, тёплые и тихие.', 'Многокамерная система с превосходными характеристиками гарантирует тишину и спокойствие в вашем доме.'])
const current_url = ref(['https://new.okonti.ru/p/system/econo/', 'https://new.okonti.ru/p/system/largo/', 'https://new.okonti.ru/p/system/euro/', 'https://new.okonti.ru/p/system/lumo/', 'https://new.okonti.ru/p/system/bravo/', 'https://new.okonti.ru/p/system/primo/'])
const currentIndex = ref(0);

const currentName = computed(() => names.value[currentIndex.value]);
const currentDescription = computed(() => descriptions.value[currentIndex.value]);
const currentDescriptionSecond = computed(() => second_description.value[currentIndex.value]);
const currentUrl = computed(() => current_url.value[currentIndex.value]);

const switchName = (direction) => {
  currentIndex.value = (currentIndex.value + direction + names.value.length) % names.value.length;
};
</script>

<template>
  <div class="name-switcher">
    <div class="arrow left" @click="switchName(-1)">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44 0H5C2.23857 0 0 2.23858 0 5V39C0 41.7614 2.23857 44 5 44H44V0Z" fill="#135EE4"/>
        <path d="M25.7766 12.3202L17.8077 20.2891C16.8666 21.2302 16.8666 22.7702 17.8077 23.7113L25.7766 31.6802" stroke="white" stroke-width="2.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="name">{{ currentName }}</div>
    <div class="arrow right" @click="switchName(1)">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H39C41.7614 0 44 2.23858 44 5V39C44 41.7614 41.7614 44 39 44H0V0Z" fill="#135EE4"/>
        <path d="M18.2234 12.3202L26.1923 20.2891C27.1334 21.2302 27.1334 22.7702 26.1923 23.7113L18.2234 31.6802" stroke="white" stroke-width="2.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <div class="content">
    <div class="description">{{ currentDescription }}</div>
    <div class="description-2">
      {{ currentDescriptionSecond }}
    </div>
    <div class="read-more-container">
      <a class="read-more" :href="currentUrl" target="_blank">Подробности</a>
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
  margin-top: 12px;
  margin-bottom: 18px;
}

.read-more {
  cursor: pointer;
  color: #135EE4;
}

.arrow {
  cursor: pointer;
  font-size: 20px;
  width: 44px;
  height: 44px;
  border: 1px solid #135EE4;
  background-color: #135EE4;
}

.arrow.right {
  border-radius: 0 5px 5px 0;
}

.arrow.left {
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
  background-color: #f4f9ff;
  width: 324px;
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
