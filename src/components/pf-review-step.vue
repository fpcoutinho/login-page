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
    <label for="name">Nome</label>
    <input
      id="name"
      v-model="userName"
      class="register-client-input-field"
      type="text"
      autocomplete="name"
      required
      @input="dispatchEvent('update', { name: userName })"
    />
    <label for="cpf">CPF</label>
    <input
      id="cpf"
      v-model="userCpf"
      class="register-client-input-field"
      type="text"
      autocomplete="on"
      required
      @input="dispatchEvent('update', { cpf: userCpf })"
    />
    <label for="birthdate">Data de nascimento</label>
    <input
      id="birthdate"
      v-model="userBirthdate"
      class="register-client-input-field"
      type="date"
      autocomplete="bday"
      required
      @input="dispatchEvent('update', { birthdate: userBirthdate })"
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
  cpf: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  }
})

const userEmail = ref(props.email)
const userName = ref(props.name)
const userCpf = ref(props.cpf)
const userBirthdate = ref(props.birthdate)
const userPhone = ref(props.phone)
const userPassword = ref(props.password)

const dispatchEvent = (eventName, eventObject) => {
  emit(eventName, eventObject)
}
</script>
