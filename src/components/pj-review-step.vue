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
    <label for="name">Razão Social</label>
    <input
      id="name"
      v-model="userName"
      class="register-client-input-field"
      type="text"
      autocomplete="name"
      required
      @input="dispatchEvent('update', { name: userName })"
    />
    <label for="cnpj">CNPJ</label>
    <input
      id="cnpj"
      v-model="userCnpj"
      class="register-client-input-field"
      type="text"
      autocomplete="on"
      required
      @input="dispatchEvent('update', { cnpj: userCnpj })"
    />
    <label for="foundation-date">Data de abertura</label>
    <input
      id="foundation-date"
      v-model="userFoundationdate"
      class="register-client-input-field"
      type="date"
      autocomplete="bday"
      required
      @input="dispatchEvent('update', { foundationdate: userFoundationdate })"
    />
    <label for="phone-number">Telefone</label>
    <input
      id="phone-number"
      v-model="userPhone"
      class="register-client-input-field"
      type="text"
      autocomplete="tel-national"
      required
      @input="dispatchEvent('update', { phone: userPhone })"
    />
    <label for="password">Sua senha</label>
    <input
      id="password"
      v-model="userPassword"
      class="register-client-input-field"
      type="password"
      autocomplete="new-password"
      required
      @input="dispatchEvent('update', { password: userPassword })"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uaInputEmail } from 'sanhaua'

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
