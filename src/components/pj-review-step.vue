<template>
  <div class="form-section">
    <h2 class="step-header">Revise suas informações</h2>
    <ua-input-email
      id="email"
      v-model="userEmail"
      label="Endereço de e-mail"
      size="medium"
      autocomplete
      required
      @input="dispatchEvent('update', { email: userEmail })"
    />
    <ua-input-text
      id="name"
      v-model="userName"
      label="Razão Social"
      size="medium"
      autocomplete="name"
      required
      @input="dispatchEvent('update', { name: userName })"
    />
    <ua-input-text
      id="cnpj"
      v-model="userCnpj"
      label="CNPJ"
      size="medium"
      autocomplete="on"
      required
      @input="dispatchEvent('update', { cnpj: userCnpj })"
    />
    <ua-input-date
      id="foundationdate"
      v-model="userFoundationdate"
      label="Data de abertura"
      size="medium"
      autocomplete="bday"
      required
      @input="dispatchEvent('update', { foundationdate: userFoundationdate })"
    />
    <ua-input-tel
      id="phone-number"
      v-model="userPhone"
      label="Telefone"
      size="medium"
      autocomplete="tel-national"
      required
      @input="dispatchEvent('update', { phone: userPhone })"
    />
    <ua-input-password
      id="password"
      v-model="userPassword"
      size="medium"
      label="Sua senha"
      autocomplete="new-password"
      required
      @input="dispatchEvent('update', { password: userPassword })"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uaInputEmail, uaInputPassword, uaInputText, uaInputDate, uaInputTel } from 'sanhaua'

const emit = defineEmits(['update'])

const props = defineProps({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  foundationdate: {
    type: String,
    required: true
  }
})

const userEmail = ref(props.email)
const userName = ref(props.name)
const userCnpj = ref(props.cnpj)
const userFoundationdate = ref(props.foundationdate)
const userPhone = ref(props.phone)
const userPassword = ref(props.password)

const dispatchEvent = (eventName, eventObject) => {
  emit(eventName, eventObject)
}
</script>
