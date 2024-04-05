<script setup>
import {ref, computed, defineProps, defineEmits, watch} from 'vue';
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
const basePrice = 10000;
const additionalPricePerUnit = 10;
const pricePerImage = 2;

const name = ref('')
const phone = ref('');
const checked1 = ref(true);
const checked2 = ref(true);

const isPhoneFilled = computed(() => {
  return phone.value.trim() !== '';
});

const changeImage = (index) => {
  console.log('Changing image to index:', index);
  const currentImageUrl = images.value[index].src;
  let newImageUrl = "";
  switch (currentImageUrl) {
    case getImageUrl(1):
      newImageUrl = getImageUrl(2);
      break;
    case getImageUrl(2):
      newImageUrl = getImageUrl(3);
      break;
    case getImageUrl(3):
      newImageUrl = getImageUrl(1);
      break;
    case getImageUrl(4):
    default:
      newImageUrl = getImageUrl(1);
      break;
  }
  images.value[index].src = newImageUrl;
};


const getImageUrl = (count) => {
  switch (count) {
    case 1:
      return "/images/window1.svg";
    case 2:
      return "/images/window3.svg";
    case 3:
      return "/images/window2.svg";
    case 4:
      return "/images/window3.svg";
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

watch(imageCount, () => {
  totalPrice.value;
});
</script>

<template>
  <div>
    <div class="modal-container" v-if="showModal && !showContactManagerModal">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="container">
          <div class="close"
               @click="showContactManagerModal = false; store.state.showModal = false; showGetCalculationModal = false; showThankYouModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#222222" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="title">Быстрый <br> расчёт окна</h1>
          <div class="img-container">
            <button class="img-button" @click="removeImage">
              <svg width="22" height="4" viewBox="0 0 22 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2H20" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>

            </button>
            <div class="images">
              <div v-for="(image, index) in images" :key="index">
                <img :src="image.src" @click="changeImage(index)" alt="Image"/>
                <div class="param" v-if="image.src === getImageUrl(2) || image.src === getImageUrl(3)">Поворотно <br>
                  откидная
                </div>
              </div>
            </div>
            <button class="img-button" @click="addImage">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11H20" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <path d="M11 20L11 2" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>

            </button>
          </div>
          <div class="window-params-container">
            <Counter title="Ширина створки, см" :maxCount="150"/>
            <Counter title="Высота створки, см" :maxCount="180"/>
          </div>
          <div class="window-option-container">
            <DescriptionSwitcher/>
          </div>
          <div class="price-container">
            <div class="price-total">{{ formattedTotalPrice }} <span style="font-family: Roboto Bold,serif;">₽</span></div>
            <div class="get-sms" @click="showGetCalculationModal = true; showModal = false">
              Получить расчёт по СМС <span class="icon"><img src="/images/sms.svg" alt=""></span>
            </div>
            <br>
          </div>
          <div class="warning-description">
            Стоимость не включает доставку, монтаж,<br> подоконник, ручку и другие детали
          </div>
          <div class="warning-description-2">
            Для получения точно расчета:
          </div>
          <br>
          <div class="submit-button showModalButton">
            <button @click="showContactManagerModal = true; showModal = false;">Свяжитесь с менеджером</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-container" v-if="showGetCalculationModal">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="close"
             @click="showContactManagerModal = false; store.state.showModal = false; showModal = false; showGetCalculationModal = false; showThankYouModal = false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#222222" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="title">Расчёт по СМС</h1>
        <div class="contact-form">
          <div class="input-container">
            <label for="phone">Номер телефона</label>
            <input id="phone" v-model="phone" v-maska data-maska="+# (###) ###-##-##" placeholder="Номер телефона"
                   class="masked-input" oninput="this.value = this.value.replace(/[^0-9+() -]/g, '')"/>
          </div>
          <div class="submit-button">
            <button :disabled="!isPhoneFilled" @click="sendCalculationSMS">Отправить</button>
          </div>
          <div class="back-button">
            <img src="/images/arrow.svg" alt="">
            <button @click="showGetCalculationModal = false; showModal = true"> Вернуться к расчёту</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-container" v-if="showContactManagerModal">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="close"
             @click="store.state.showModal = false; showContactManagerModal = false; showModal = false; showGetCalculationModal = false; showThankYouModal = false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#222222" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="title">Свяжитесь <br> с менеджером</h1>
        <div class="contact-form">
          <div class="inputs">
            <div class="input-container">
              <label for="name">Имя</label>
              <input type="text" id="name" placeholder="Ваше имя" v-model="name"
                     oninput="this.value = this.value.replace(/[^a-zA-Zа-яёА-ЯЁ -]/g, '')">
            </div>
            <div class="input-container">
              <label for="phone">Телефон</label>
              <input id="phone" v-model="phone" v-maska data-maska="+# (###) ###-##-##" placeholder="Номер телефона"
                     class="masked-input" oninput="this.value = this.value.replace(/[^0-9+() -]/g, '')"/>
            </div>
          </div>
          <div class="submit-button">
            <button :disabled="name === '' || phone === '' || !checked1"
                    @click="showContactManagerModal = false; showThankYouModal = true">Отправить
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
          <div class="back-button">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M10.7072 14.8635C10.8947 14.6759 11 14.4216 11 14.1565C11 13.8913 10.8947 13.637 10.7072 13.4495L5.75721 8.49946L10.7072 3.54946C10.8894 3.36086 10.9902 3.10826 10.9879 2.84606C10.9856 2.58387 10.8804 2.33305 10.695 2.14764C10.5096 1.96224 10.2588 1.85707 9.99661 1.85479C9.73442 1.85251 9.48182 1.95331 9.29321 2.13546L3.63621 7.79246C3.44874 7.97999 3.34343 8.2343 3.34343 8.49946C3.34343 8.76463 3.44874 9.01894 3.63621 9.20646L9.29321 14.8635C9.48074 15.0509 9.73505 15.1562 10.0002 15.1562C10.2654 15.1562 10.5197 15.0509 10.7072 14.8635Z"
                  fill="#222222"/>
            </svg>
            <button @click="showContactManagerModal = false; showModal = true"> Вернуться к расчёту
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-container" v-if="showThankYouModal">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="close"
           @click="store.state.showModal = false; showContactManagerModal = false; showModal = false; showGetCalculationModal = false; showThankYouModal = false">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="#222222" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 class="title">Спасибо!</h1>
      <div class="message">Мы свяжемся с Вами в ближайшее время</div>
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
.modal-content {
  max-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.submit-button button:disabled {
  cursor: not-allowed;
  background-color: cornflowerblue;
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

.submit-button,
.showModalButton {
  margin-bottom: 20px;
}

.close {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-left: 338px;
  margin-top: 20px;
  transition: opacity 0.3s ease;
}

.close:hover {
  opacity: 0.5;
}

.param {
  text-align: center;
  width: 62px; /* Changed from 62,36px */
  font-family: Roboto;
  font-size: 11px;
  position: absolute;
  color: #0e4fae;
}

.get-sms {
  cursor: pointer;
  text-align: center;
  font-family: "Roboto Bold";
  font-weight: bold;
  color: #135EE4;
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

.title {
  margin-top: 4px;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 35px;
  line-height: 42px;
  align-items: center;
}

.message {
  margin-top: -6px;
}

.img-button {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #134EE4;
  border-radius: 100%;
  font-size: 1px;
}

.rouble {
  font-family: ALSRubl, serif;
}

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

.window-option-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
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
  position: relative;
  width: 390px;
  height: 872px;
  border-radius: 12px;
  justify-items: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.window-params-container {
  display: flex;
  flex-direction: row;
  margin-top: 44px;
  gap: 20px;
}

.img-container {
  margin-top: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: -5px;
}

.img-button {
  margin: 10px;
}

.images {
  display: flex;
  gap: 0;
  flex-direction: row;
  margin: 0 auto;
}

.img-container img {
  margin: 0; /* Reset margin */
  padding: 0;
  width: calc(64px - 2.4px);
  height: 88.61px;
  object-fit: cover;
}

.button-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  width: 325px;
  height: 406px;
  margin-top: 20px;
}

.input-container {
  display: flex; /* Add this line */
  justify-content: space-between; /* Add this line */
  align-items: flex-start; /* Add this line */
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
  width: 325px;
  height: 50px;
  padding: 14px;
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 400;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: left;
  margin-top: 2px;
}

.input-container input::placeholder {
  font-family: Roboto, serif;
  color: #B5BBC2;
  font-size: 16px;
  line-height: 24px;
}

.submit-button button {
  width: 325px;
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

.text-blue {
  color: #2F79FF;
}

.submit-button button:hover {
  background-color: #0e4fae;
}

.checkboxes {
  display: flex;
  flex-direction: column;
  width: 325px;
  height: 78px;
  margin-top: 16px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 22px;
}

.checkboxes input[type="checkbox"],
.check1 input[type="checkbox"],
.check2 input[type="checkbox"] {
  width: 18.19px;
  height: 18px;
  accent-color: #76BC21;
  color: #fafafa;
  margin-right: 10px;
}

.agreement {
  position: relative;
}

.mt-1 {
  margin-top: 12px;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
  height: 20rem !important;
}

.custom-checkbox+label {
  position: relative;
  display: inline-flex;
  font-size: 12px;
  color: #707C8B;
  user-select: none;
}

.custom-checkbox+label a {
  color: #135EE4;
}

.custom-checkbox+label a:hover {
  color: #7FA3E7FF;
}

.custom-checkbox+label div {
  line-height: 140%;
  text-align: left;
}

.custom-checkbox+label::before {
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

.custom-checkbox:checked+label::before {
  border-color: #76BC21;
  background-color: #76BC21;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}


.checkboxes input[type="checkbox"]::before,
.check1 input[type="checkbox"]::before,
.check2 input[type="checkbox"]::before {
  color: #fafafa;
}

.warning-description {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  text-align: center;

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

.back-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: -122px;
  margin-top: 14px;
}

.back-button button {
  line-height: 2;
  text-align: left;
  background-color: #fff;
  padding-left: 8px;
  color: #222222;
  border: 0 solid #135EE4;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
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

.get-sms {
  font-size: 14px;
  margin-top: -8px;
  justify-content: center;
  text-align: center;
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
}

.checkbox label {
  margin-top: 12px;
  color: #707C8B;
  text-align: left;
  font-size: 12px;
}
</style>