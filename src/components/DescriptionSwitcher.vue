<template>
  <div class="name-switcher">
    <div class="arrow left" @click="switchName(-1)"><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 0H5C2.23857 0 0 2.23858 0 5V39C0 41.7614 2.23857 44 5 44H44V0Z" fill="#135EE4"/>
      <path d="M25.7766 12.3202L17.8077 20.2891C16.8666 21.2302 16.8666 22.7702 17.8077 23.7113L25.7766 31.6802" stroke="white" stroke-width="2.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </div>
    <div class="name">{{ currentName }}</div>
    <div class="arrow right" @click="switchName(1)"><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H39C41.7614 0 44 2.23858 44 5V39C44 41.7614 41.7614 44 39 44H0V0Z" fill="#135EE4"/>
      <path d="M18.2234 12.3202L26.1923 20.2891C27.1334 21.2302 27.1334 22.7702 26.1923 23.7113L18.2234 31.6802" stroke="white" stroke-width="2.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </div>
  </div>
  <br>
  <div class="description">{{ currentDescription }}</div>
  <div class="description-2">
    Увеличеная жесткость конструкции
  </div>
  <div class="read-more">
    Подробности
  </div>
</template>

<script>
export default {
  data() {
    return {
      names: ['Комфорт Люмо', 'Комфорт Люмо2', 'Комфорт Люмо3'],
      descriptions: ['Улучшенные характеристики для более комфортного проживния', 'Улучшенные характеристики для более комфортного проживния2', 'Улучшенные характеристики для более комфортного проживния3'],
      currentIndex: 0
    };
  },
  computed: {
    currentName() {
      return this.names[this.currentIndex];
    },
    currentDescription() {
      return this.descriptions[this.currentIndex];
    }
  },
  methods: {
    switchName(direction) {
      this.currentIndex = (this.currentIndex + direction + this.names.length) % this.names.length;
    }
  }
};
</script>

<style scoped>
.name-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 325px;
  height: 44px;
}

.read-more {
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
  font-weight: 700;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f9ff;
  width: 324px;
  height: 44px;
}

.description-2 {
  margin-top: 6px;
  font-size: 16px;
}
</style>
