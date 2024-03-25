<script setup>
import {ref, computed, watch} from 'vue';
import Counter from "./Counter.vue";
import DescriptionSwitcher from "./DescriptionSwitcher.vue";
import Checkbox from "./Checkbox.vue";

const showContactManagerModal = ref(false);

const imageCount = ref(1);
const heightCount = ref(0);
const widthCount = ref(0);
const basePrice = 10000;
const additionalPricePerUnit = 10;
const pricePerImage = 2;
const showThankYouModal = ref(false);


const getImageUrl = (count) => {
  switch (count) {
    case 1:
      return "/images//window3.png";
    case 2:
      return "/images//window1.png";
    case 3:
      return "/images//window2.png";
    case 4:
      return "/images//window3.png";
    default:
      return "";
  }
};

const submitForm = () => {
  showContactManagerModal.value = false
  showThankYouModal.value = true;
};

const images = ref([{ src: getImageUrl(1), height: heightCount.value, width: widthCount.value }]);

const addImage = () => {
  if (imageCount.value < 4) {
    imageCount.value++;
    images.value.push({ src: getImageUrl(imageCount.value), height: heightCount.value, width: widthCount.value });
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
    <div class="modal-container" v-if="!showContactManagerModal">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="container">
          <div class="close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </div>
          <h1 class="title">Быстрый <br> расчёт окна</h1>
          <div class="img-container">
            <button class="img-button" @click="removeImage"><svg width="22" height="4" viewBox="0 0 22 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2H20" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>

            </button>
            <div v-for="(image, index) in images" :key="index">
              <img :src="image.src" alt="Image" />
            </div>
            <button class="img-button" @click="addImage"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11H20" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M11 20L11 2" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>

            </button>
          </div>
          <div class="window-params-container">
            <Counter title="Ширина створки, мм" />
            <Counter title="Высота створки, мм" />
          </div>
          <div class="window-option-container">
            <DescriptionSwitcher />
          </div>
          <br>
          <div class="price-container">
            <div class="price-total">{{ formattedTotalPrice }} ₽</div>
            <div class="get-sms">
              Получить расчёт по СМС <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_5266_755)">
                <mask id="mask0_5266_755" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                  <path d="M15.75 15.75V1.25005H1.25V15.75H15.75Z" fill="white" stroke="white" stroke-width="1.5"/>
                </mask>
                <g mask="url(#mask0_5266_755)">
                  <path d="M4.43749 1.12504H4.24999C2.52409 1.12504 1.125 2.52413 1.125 4.25004V12.75C1.125 14.4759 2.52409 15.875 4.24999 15.875H8.59373C10.3196 15.875 11.7187 14.4759 11.7187 12.75V11.7188" stroke="#135EE4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.8748 4.65939C15.8935 2.71849 14.3437 1.12502 12.375 1.12502H9.18749C7.25 1.12502 5.66906 2.71849 5.68769 4.65939L5.6875 9.25L5.744 9.1935C6.23725 8.70025 6.99059 8.57613 7.61506 8.88706C8.08243 9.11975 8.61071 9.25025 9.17186 9.25H12.3594C14.2859 9.25091 15.8563 7.71085 15.8748 5.78438V4.65939Z" stroke="#135EE4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 4.125H8.5625" stroke="#135EE4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.125 6.3125H8.5625" stroke="#135EE4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.46875 13.0938C6.486 13.0938 6.5 13.0798 6.5 13.0625C6.5 13.0452 6.486 13.0313 6.46875 13.0313C6.45149 13.0313 6.4375 13.0452 6.4375 13.0625C6.4375 13.0798 6.45149 13.0938 6.46875 13.0938Z" fill="#135EE4" stroke="#135EE4" stroke-width="1.5"/>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_5266_755">
                  <rect width="16" height="16" fill="white" transform="translate(0.5 0.5)"/>
                </clipPath>
              </defs>
            </svg>
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
          <div class="submit-button">
            <button @click="showContactManagerModal = true">Свяжитесь с менеджером</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-container" v-if="showContactManagerModal">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        <h1 class="title">Свяжитесь <br> с менеджером</h1>
        <div class="contact-form">
          <div class="inputs">
            <div class="input-container">
              <label for="name">Имя</label>
              <input type="text" id="name" placeholder="Ваше имя" />
            </div>
            <div class="input-container">
              <label for="phone">Телефон</label>
              <input type="text" id="phone" placeholder="Номер телефона" />
            </div>
          </div>
          <div class="submit-button">
            <button @click="submitForm">Отправить</button>
          </div>
          <div class="checkboxes">
            <Checkbox label="Отправляя контактные данные, выдаёте согласие наобработку ваших персональных данных" />
            <Checkbox label="Даю свое согласие на получение рекламных сообщений" />
          </div>
          <div class="back-button">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7072 14.8635C10.8947 14.6759 11 14.4216 11 14.1565C11 13.8913 10.8947 13.637 10.7072 13.4495L5.75721 8.49946L10.7072 3.54946C10.8894 3.36086 10.9902 3.10826 10.9879 2.84606C10.9856 2.58387 10.8804 2.33305 10.695 2.14764C10.5096 1.96224 10.2588 1.85707 9.99661 1.85479C9.73442 1.85251 9.48182 1.95331 9.29321 2.13546L3.63621 7.79246C3.44874 7.97999 3.34343 8.2343 3.34343 8.49946C3.34343 8.76463 3.44874 9.01894 3.63621 9.20646L9.29321 14.8635C9.48074 15.0509 9.73505 15.1562 10.0002 15.1562C10.2654 15.1562 10.5197 15.0509 10.7072 14.8635Z" fill="#222222"/>
            </svg>
            <button @click="showContactManagerModal = false"> Вернуться к расчёту
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-container" v-if="showThankYouModal">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </div>
      <h1 class="title">Спасибо!</h1>
      <div>Мы свяжемся с Вами в ближайшее время</div>
      <br>
      <br>
      <div class="submit-button">
        <button @click="showThankYouModal = false; showContactManagerModal = false">Вернуться к расчёту</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  max-height: 100vh;
  overflow-y: auto;
}

@media screen and (max-height: 400px) {
  .modal-content {
    max-height: 180vh;
  }
}

@media (max-width: 500px) {
  .modal-content {
    max-height: 180vh;
  }
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1; /* Set a light background color for the track */
}

/* Handle */
.modal-content::-webkit-scrollbar-thumb {
  background: #888; /* Set a darker color for the scrollbar handle */
  border-radius: 3px; /* Round the scrollbar handle */
}

/* Handle on hover */
.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555; /* Darker color when hovered */
}

.close {
  display: flex;
  flex-direction: row;
  margin-left: 338px;
  margin-top: 20px;
}

.get-sms {
  text-align: center;
  font-family: Arial;
  font-weight: bold;
  color: #135EE4;
}

.price-total {
  font-family: Arial;
  font-weight: bold;
  font-size: 42px;
}

.title {
  margin-top: 4px;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 35px;
  line-height: 42px;
  align-items: center;
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
  height: 860px;
  border-radius: 12px ;
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
  margin-top: 20px;
  gap: 20px;
}

.img-container {
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.img-button {
  margin: 10px;
}

.img-container img {
  width: 62.36px;
  height: 88.61px;
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
  margin-bottom: 10px;
}

.input-container label {
  font-family: Arial;
  font-weight: bold;
  font-size: 14px;
  color: #222222;
  margin-left: 4px;
}

.input-container input {
  width: 325px;
  height: 50px;
  padding: 14px;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: left;
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

.submit-button button:hover {
  background-color: #0e4fae;
}

.checkboxes {
  display: flex;
  flex-direction: column;
  width: 325px;
  height: 78px;
  margin-top: 20px;
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

.checkboxes input[type="checkbox"]::before,
.check1 input[type="checkbox"]::before,
.check2 input[type="checkbox"]::before {
  color: #fafafa;
}

.warning-description {
  text-align: center;
}

.warning-description-2 {
  margin-top: 10px;
}

.back-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: -122px;
  margin-top: 26px;
}

.back-button button {
  line-height: 2;
  text-align: justify;
  background-color: #fff;
  color: #222222;
  border: 0 solid #135EE4;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.input-container {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

.check1 input {
  width: 12.12px;
  height: 12.12px;
}

.check2 input {
  width: 12.12px;
  height: 12.12px;
}

</style>
