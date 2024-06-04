<script setup>
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  watch,
  onMounted,
  onUnmounted,
  onActivated,
  nextTick,
  onBeforeUnmount
} from 'vue';
import Counter from "./Counter.vue";
import DescriptionSwitcher from "./DescriptionSwitcher.vue";
import store from "../store/index.js";
import {vMaska} from "maska"

const props = defineProps({
  showModal: Boolean,
  showContactManagerModal: Boolean,
  showGetCalculationModal: Boolean,
  showThankYouModal: Boolean
});

const showIcons = ref(true);

const isFingerIconActive = computed(() => {
  return showIcons.value;
});

const showModalRef = ref(props.showModal);
const showContactManagerModalRef = ref(props.showContactManagerModal);
const showGetCalculationModalRef = ref(props.showGetCalculationModal);
const showThankYouModalRef = ref(props.showThankYouModal);

watch(() => props.showModal, (value) => {
  showModalRef.value = value;
});

watch(() => props.showContactManagerModal, (value) => {
  showContactManagerModalRef.value = value;
});

watch(() => props.showGetCalculationModal, (value) => {
  showGetCalculationModalRef.value = value;
});

watch(() => props.showThankYouModal, (value) => {
  showThankYouModalRef.value = value;
});

const emits = defineEmits(['update:showModal']);

const updateShowModal = (value) => {
  emits('update:showModal', value);
};

const imageCount = ref(1);
const currentImageState = ref(1);
const heightCount = ref(0);
const widthCount = ref(0);
const basePrice = store.getters.getPrice;
const additionalPricePerUnit = 10;
const pricePerImage = 2;
const windowType = ref('');

const name = ref('')
const phone = ref('');
const checked1 = ref(true);
const checked2 = ref(true);

const isPhoneFilled = computed(() => {
  return phone.value.trim() !== '';
});


const getImageUrl = (count) => {
  switch (count) {
    case 1:
      return "/images/Gluhaia.svg";
    case 2:
      return "/images/Откидная.svg";
    case 3:
      return "/images/Откидная 2.svg";
    case 4:
      return "/images/Поворотная.svg";
    case 5:
      return "/images/Поворотная 2.svg";
    case 6:
      return "/images/Поворотно-откидная.svg";
    case 7:
      return "/images/Поворотно-откидная 2.svg";
    default:
      return "";
  }
};

const images = ref([
  {src: getImageUrl(1), height: heightCount.value, width: widthCount.value},
]);

const addImage = () => {
  if (imageCount.value < 4) {
    imageCount.value++;
    images.value.push({src: getImageUrl(1), height: heightCount.value, width: widthCount.value});
    store.commit('updateQuantity', imageCount.value);
  }
};

const formattedTotalPrice = computed(() => {
  const price = totalPrice.value;
  if (price > 9999) {
    const priceString = price.toString();
    return priceString.slice(0, 2) + ' ' + priceString.slice(2);
  } else {
    return price.toString();
  }
});

const removeImage = () => {
  if (imageCount.value > 1) {
    imageCount.value--;
    images.value.pop();
    store.commit('updateQuantity', imageCount.value);
  }
};

const totalPrice = computed(() => {
  let additionalPrice = Math.max(0, imageCount.value - 4) * pricePerImage;
  switch (imageCount.value) {
    case 1:
      additionalPrice += 0;
      break;
    case 2:
      additionalPrice += 1000;
      break;
    case 3:
      additionalPrice += 1500;
      break;
    case 4:
      additionalPrice += 2000;
      break;
    default:
      break;
  }
  return basePrice + additionalPrice;
});

const quantity = computed(() => store.getters.getQuantity);

const windowTypes = ref(Array(images.value.length).fill(''));

let currentOpenIndex = null;

const hideHints = () => {
  for (let i = 0; i < images.value.length; i++) {
    if (i !== currentOpenIndex) {
      windowTypes.value[i] = '';
    }
  }
};

const selectedImageIndex = ref(null);
const showParameter = ref(false);

let timeoutId = null;

const changeImage = (index) => {
  selectedImageIndex.value = index;
  showParameter.value = true;
  console.log('Changing image to index:', index);
  const currentImageUrl = images.value[index].src;
  let newImageUrl = "";
  let newWindowType = "";

  switch (currentImageUrl) {
    case getImageUrl(1):
      newImageUrl = getImageUrl(2);
      newWindowType = 'Откидная';
      break;
    case getImageUrl(2):
      newImageUrl = getImageUrl(3);
      newWindowType = 'Откидная';
      break;
    case getImageUrl(3):
      newImageUrl = getImageUrl(4);
      newWindowType = 'Поворотная';
      break;
    case getImageUrl(4):
      newImageUrl = getImageUrl(5);
      newWindowType = 'Поворотная';
      break;
    case getImageUrl(5):
      newImageUrl = getImageUrl(6);
      newWindowType = 'Поворотно-откидная';
      break;
    case getImageUrl(6):
      newImageUrl = getImageUrl(7);
      newWindowType = 'Поворотно-откидная';
      break;
    case getImageUrl(7):
      newImageUrl = getImageUrl(1);
      newWindowType = 'Глухая';
      break;
    default:
      newImageUrl = getImageUrl(1);
      newWindowType = '';
      break;
  }

  images.value[index].src = newImageUrl;
  windowTypes.value[index] = newWindowType;

  currentOpenIndex = index;

  console.log(windowTypes.value[index]);

  hideHints();

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    windowTypes.value[index] = '';
    showParameter.value = false;
  }, 800);
  showIcons.value = false;
};

let count = store.getters.getQuantity

let maxCount = ref(150);

watch(() => imageCount, (newValue, oldValue) => {
  maxCount.value = newValue * 150;
});

const showShadow = ref(true);
const scrollY = ref(0);
const screenHeight = ref(window.innerHeight);

const handleScroll = (event) => {
  scrollY.value = event.target.scrollTop;
  showShadow.value = scrollY.value <= 10;
};

const handleResize = () => {
  screenHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const containerStyle = computed(() => {
  if (screenHeight.value <= 630) {
    return {
      width: '105%',
      position: 'sticky',
      background: 'white',
      boxShadow: showShadow.value ? '0px -5px 10px rgba(0, 0, 0, 0.1)' : 'none'
    };
  } else {
    return {};
  }
});

const closeModal = () => {
  props.showContactManagerModal = false;
  store.state.showModal = false;
  props.showGetCalculationModal = false;
  props.showThankYouModal = false
}

window.addEventListener('click', (event) => {
  const modal = document.querySelector('.modal-overlay');

  if (event.target === modal) {
    closeModal();
  }
});

window.addEventListener('keydown', (event) => {
  const modal = document.getElementById('modal');

  if (event.key === 'Escape') {
    closeModal();
  }
});

watch(imageCount, () => {
  totalPrice.value;
});

</script>

<template>
  <div>
    <div class="modal-container" v-if="showModal && !showContactManagerModal">
      <div class="modal-overlay"></div>
      <div class="modal-content"  @scroll="handleScroll">
        <div class="container">
          <div class="close"
               @click="closeModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#222222" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="title">Оконный калькулятор</h1>
          <div class="img-container">
            <button class="img-button" @click="removeImage">
              <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2H16" stroke="#B5BBC2" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="images">
              <div v-for="(image, index) in images" :key="index" :class="{ 'first-index': index === 0 }">
                <img @click="changeImage(index)" v-if="index === 0 && showIcons" src="/images/finger.svg" class="finger-icon finger-icon-flash" alt="Finger Icon">
                <img :src="image.src" @click="changeImage(index)" class="window-img" alt="Image"/>
                <div class="param" v-if="selectedImageIndex === index && showParameter === true">
                  {{ windowTypes[index] }}
                </div>
              </div>
            </div>
            <button class="img-button plus" @click="addImage">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 9H16" stroke="#B5BBC2" stroke-width="3" stroke-linecap="round"/>
                <path d="M9 16L9 2" stroke="#B5BBC2" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="window-params-container">
            <Counter title="Ширина окна, см" :maxCount="imageCount * 150"/>
            <Counter title="Высота окна, см" :maxCount="180"/>
          </div>
          <div class="window-option-container">
            <DescriptionSwitcher/>
          </div>
          <div class="overflow-container" :style="containerStyle" @scroll="handleScroll">
            <div class="price-container">
              <div class="price-total">{{ formattedTotalPrice }} <span style="font-family: Roboto Bold,serif;">₽</span></div>
              <br>
            </div>
            <div class="warning-description">
              Стоимость оконного изделия <br> без учёта скидок, монтажа и внешних деталей
            </div>
            <br>
            <div class="submit-button showModalButton">
              <button @click="showContactManagerModal = true; showModal = false;">Заказать бесплатный замер</button>
            </div>
            <div class="get-sms" @click="showGetCalculationModal = true; showModal = false">
              Получить ссылку на расчёт в СМС
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-container" v-if="showGetCalculationModal">
      <div class="modal-overlay"></div>
      <div class="modal-content" style="overflow: hidden" id="modal">
        <div class="contact-form">
          <h1 class="title-link">Получить ссылку</h1>
          <div class="description-phone">
            Мы пришлём вам ссылку на этот расчёт по СМС
          </div>
          <div class="input-container">
            <label for="phone">Номер телефона</label>
            <input id="phone" v-model="phone" v-maska data-maska="+7 (###) ###-##-##" placeholder="Номер телефона"
                   class="masked-input" oninput="this.value = this.value.replace(/[^0-9+() -]/g, '')"/>
          </div>
          <div class="submit-button">
            <button :disabled="!isPhoneFilled || !checked1" @click="sendCalculationSMS">Отправить</button>
          </div>
          <div class="back-button">
            <button @click="showGetCalculationModal = false; showModal = true"> Вернуться к расчёту</button>
          </div>
          <div class="checkboxes">
            <div class="agreement">
              <input type="checkbox" v-model="checked1" class="custom-checkbox" id="agreement_checkbox" name="agreement_checkbox" required="" checked="">
              <label for="agreement_checkbox">
                <div>Отправляя контактные данные, вы даёте <a href="https://new.okonti.ru/company/privacy-policy/" target="_blank">согласие на&nbsp;обработку ваших
                  персональных данных</a></div>
              </label>
            </div>
            <div class="agreement mt-1">
              <input type="checkbox" v-model="checked2" class="custom-checkbox" id="agreement_subscribe" name="agreement_subscribe" checked="">
              <label for="agreement_subscribe">
                <div>Даю свое <a href="https://new.okonti.ru/company/privacy-policy/" target="_blank">согласие на получение рекламных
                  сообщений</a></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-container" v-if="showContactManagerModal">
      <div class="modal-overlay"></div>
      <div class="modal-content" id="modal" style="overflow-y: hidden">
        <div class="contact-form">
          <h1 class="title">Записаться на бесплатный замер</h1>
          <div class="inputs">
            <div class="input-container">
              <label for="name">Имя</label>
              <input type="text" id="name" placeholder="Ваше имя" v-model="name"
                     oninput="this.value = this.value.replace(/[^a-zA-Zа-яёА-ЯЁ -]/g, '')">
            </div>
            <div class="input-container">
              <label for="phone">Телефон</label>
              <input id="phone" v-model="phone" v-maska data-maska="+7 (###) ###-##-##" placeholder="Номер телефона"
                     class="masked-input" oninput="this.value = this.value.replace(/[^0-9+() -]/g, '')"/>
            </div>
          </div>
          <div class="submit-button">
            <button :disabled="name === '' || phone === '' || !checked1"
                    @click="showContactManagerModal = false; showThankYouModal = true">Отправить
            </button>
          </div>
          <div class="back-button">
            <button @click="showContactManagerModal = false; showModal = true"> Вернуться к расчёту
            </button>
          </div>
          <div class="checkboxes">
            <div class="agreement">
              <input type="checkbox" v-model="checked1" class="custom-checkbox" id="agreement_checkbox" name="agreement_checkbox" required="" checked="">
              <label for="agreement_checkbox">
                <div>Отправляя контактные данные, вы даёте <a href="https://new.okonti.ru/company/privacy-policy/" target="_blank">согласие на&nbsp;обработку ваших
                  персональных данных</a></div>
              </label>
            </div>
            <div class="agreement mt-1">
              <input type="checkbox" v-model="checked2" class="custom-checkbox" id="agreement_subscribe" name="agreement_subscribe" checked="">
              <label for="agreement_subscribe">
                <div>Даю свое <a href="https://new.okonti.ru/company/privacy-policy/" target="_blank">согласие на получение рекламных
                  сообщений</a></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-container" v-if="showThankYouModal">
    <div class="modal-overlay"></div>
    <div class="modal-content" id="modal">
      <h1 class="title">Спасибо!</h1>
      <div class="message">Ссылка на расчёт выслана <br> по СМС на указанный номер телефона</div>
      <br>
      <br>
      <div class="submit-button">
        <button
            @click="store.state.showModal = true; showThankYouModal = false; showContactManagerModal = false; showModal = true">
          Вернуться к расчёту
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 348px;
  overflow-x: hidden;
  height: 700px;
  max-height: 120vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 20px;
  justify-items: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 780px) {
  .modal-content {
    padding-top: 200px;
    padding-bottom: 200px;
    width: 110vw;
  }
}

@media screen and (max-height: 400px), (max-width: 500px) {
  .modal-content {
    max-height: 100vh;
  }
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.title {
  margin-top: 38px;
  max-width: 300px;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 30px;
  line-height: 30px;
  align-items: center;
}

.contact-form {
  align-items: center;
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 406px;
  margin-top: 10px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 22px;
}

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 10px;
}

.input-container label {
  font-family: "Roboto Bold";
  font-weight: bold;
  font-size: 14px;
  color: #222222;
}

.input-container input {
  width: 290px;
  height: 50px;
  padding: 14px;
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 400;
  border: 1px solid #f4f4f4;
  background: #f4f4f4;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: left;
  margin-top: 2px;
}

.input-container input::placeholder {
  font-family: Roboto, serif;
  color: #707C8B;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.custom-checkbox + label::before {
  background-color: #f4f4f4;
}

.submit-button {
  margin-bottom: 10px;
}

.submit-button button {
  width: 290px;
  height: 50px;
  background-color: #135EE4;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button button:disabled {
  cursor: not-allowed;
  background-color: cornflowerblue;
}

.submit-button button:hover {
  background-color: #0e4fae;
}

.back-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
}

.back-button button {
  color: #135EE4;
  line-height: 2;
  text-align: left;
  background-color: #fff;
  padding-left: 8px;
  border: 0 solid #135EE4;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.checkboxes {
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 78px;
  margin-top: 16px;
}

.agreement {
  position: relative;
}

.agreement input {
  width: 18.19px;
  height: 18px;
  accent-color: #76BC21;
  color: #fafafa;
  margin-right: 10px;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
  height: 20rem !important;
}

.custom-checkbox + label {
  position: relative;
  display: inline-flex;
  font-size: 12px;
  color: #707C8B;
  user-select: none;
}

.custom-checkbox + label a {
  color: #135EE4;
}

.custom-checkbox + label a:hover {
  color: #7FA3E7FF;
}

.custom-checkbox + label div {
  line-height: 140%;
  text-align: left;
}

.custom-checkbox + label::before {
  content: '';
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 3.79px;
  margin-right: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 70% 70%;
}

.custom-checkbox:checked + label::before {
  border-color: #76BC21;
  background-color: #76BC21;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.mt-1 {
  margin-top: 12px;
}

.param {
  text-align: center;
  width: 57px;
  height: 24px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 8px;
  position: absolute;
  color: #222222;
  background: #f2f2f2;
  box-shadow: 0px 4px 4px 0px #00000040;
  margin-top: -102px;
  margin-left: -0.8px;
  border-radius: 4px;
  line-height: 8px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.get-sms {
  cursor: pointer;
  position: relative;
  text-align: center;
  font-family: "Roboto Bold";
  font-weight: bold;
  color: #135EE4;
  font-size: 16px;
  top: 4px;
  justify-content: center;
  text-align: center;
}

.price-container {
  height: 66px;
}

.price-total {
  font-family: "Roboto Bold";
  font-weight: bold;
  font-size: 42px;
}

.price-total img {
  width: 32px;
  height: 32px;
}

.close {
  margin-left: 286px;
  margin-top: 18px;
  position: absolute;
}

@media (max-width: 400px) {
  .close {
    margin-top: 45px;
    margin-left: 250px;
  }
}

.title-link {
  margin-top: 38px;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 30px;
  line-height: 42px;
  align-items: center;
}

.first-index img.finger-icon {
  margin-top: -31px;
}

.description-phone {
  font-family: Roboto;
  font-size: 14px;
  line-height: 16.8px;
  margin-bottom: 20px;
}

.nav-window {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.nav-item {
  cursor: pointer;
  font-size: 16px;
  line-height: 19.2px;
}

.uper-container {
  margin-top: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 100px;
}

.subscribe-to-count button {
  width: 210px;
  height: 44px;
  color: #fafafa;
  font-size: 16px;
  line-height: 19.2px;
  font-family: "Roboto Bold";
  text-align: center;
  background: #76BC21;
}

.message {
  width: 305px;
  margin-top: -6px;
}

.img-button {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #F6F6F6;
  border-radius: 6px;
  font-size: 1px;
}

.rouble {
  font-family: ALSRubl, serif;
}

.window-option-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.window-params-container {
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  gap: 20px;
}

.img-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: -5px;
}

.img-button {
  margin: 10px;
}

.img-button,
.plus {
  margin-left: 14px;
}

.images {
  cursor: pointer;
  display: flex;
  gap: 0;
  flex-direction: row;
  margin: 0 auto;
}

.img-container .window-img {
  margin: 0 -4px 0 0;
  padding: 0;
  width: 55.45px;
  height: 79.92px;
  object-fit: cover;
}

.button-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.finger-icon {
  position: relative;
  width: 20x;
  height: 31px;
  top: 56px;
  left: 17px;
  display: block;
  z-index: 1;
}

.warning-description {
  width: 290px;
  font-family: Roboto;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 16.8px;
  text-align: center;
}

.warning-description-2 {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  text-align: center;
  margin-top: 10px;
}

.check1,
.check2 {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.check1,
.check2 label {
  color: #707C8B;
  text-align: left;
  font-size: 12px;
}

.check1 input,
.check2 input {
  width: 12.12px;
  height: 12.12px;
}

.checkbox {
  display: flex;
  align-items: center;
}

input[type='checkbox']:checked {
  background: #76BC21;
  border: 0.5px solid #76BC21;
}

input[type='checkbox']:checked:after {
  position: relative;
  bottom: 1px;
  content: '\2713';
  color: white;
}

.get-sms img {
  width: 16px;
  height: 16px;
}

.icon {
  position: relative;
  top: 4px;
}

input[type='checkbox'] {
  cursor: pointer;
  border: 0.5px solid #707C8B;
  text-align: center;
  appearance: none;
  border-radius: 4px;
  box-shadow: none;
}

.text-blue {
  cursor: pointer;
  color: #2F79FF;
}

.checkbox label {
  margin-top: 12px;
  color: #707C8B;
  text-align: left;
  font-size: 12px;
}

@media (max-height: 625px) {
  .get-sms {
    padding-bottom: 40px;
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000000s ease-in-out 0s;
}

.showModalButton {
  margin-bottom: 10px;
}

.shadow-hidden {
  box-shadow: none;
}

.overflow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0;
}

@keyframes flash {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.finger-icon-flash {
  animation: flash 1.2s infinite;
}
</style>