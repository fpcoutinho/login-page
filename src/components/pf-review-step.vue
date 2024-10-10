<template>
  <div class="form-section">
    <h2 class="step-header">Revise suas informações</h2>
    <label for="email">Endereço de e-mail</label>
    <input
      class="register-client-input-field"
      type="email"
      id="email"
      autocomplete="email"
      v-model="userEmail"
      @input="dispatchEvent('update', { email: userEmail })"
      required
    />
    <label for="name">Nome</label>
    <input
      class="register-client-input-field"
      type="text"
      id="name"
      autocomplete="name"
      v-model="userName"
      @input="dispatchEvent('update', { name: userName })"
      required
    />
    <label for="cpf">CPF</label>
    <input
      class="register-client-input-field"
      type="text"
      id="cpf"
      autocomplete="on"
      v-model="userCpf"
      @input="dispatchEvent('update', { cpf: userCpf })"
      required
    />
    <label for="birthdate">Data de nascimento</label>
    <input
      class="register-client-input-field"
      type="date"
      id="birthdate"
      autocomplete="bday"
      v-model="userBirthdate"
      @input="dispatchEvent('update', { birthdate: userBirthdate })"
      required
    />
    <label for="phone-number">Telefone</label>
    <input
      class="register-client-input-field"
      type="text"
      id="phone-number"
      autocomplete="tel-national"
      v-model="userPhone"
      @input="dispatchEvent('update', { phone: userPhone })"
      required
    />
    <label for="password">Sua senha</label>
    <input
      class="register-client-input-field"
      type="password"
      id="password"
      autocomplete="new-password"
      v-model="userPassword"
      @input="dispatchEvent('update', { password: userPassword })"
      required
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const emit = defineEmits(['update'])

  const props = defineProps({
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
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
