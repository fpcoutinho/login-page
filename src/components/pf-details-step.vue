<template>
  <div class="form-section">
    <h2 class="step-header">Pessoa Física</h2>
    <ua-input-text
      id="name"
      v-model="userName"
      label="Nome"
      size="medium"
      autocomplete="name"
      required
      @input="dispatchEvent('update', { name: userName })"
    />
    <ua-input-text
      id="cpf"
      v-model="userCpf"
      label="CPF"
      size="medium"
      autocomplete="on"
      required
      @input="dispatchEvent('update', { cpf: userCpf })"
    />
    <ua-input-date
      id="birthdate"
      v-model="userBirthdate"
      label="Data de nascimento"
      size="medium"
      autocomplete="bday"
      required
      @input="dispatchEvent('update', { birthdate: userBirthdate })"
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uaInputText, uaInputDate, uaInputTel } from 'sanhaua'

const emit = defineEmits(['update'])

const props = defineProps({
  name: {
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
  },
  phone: {
    type: String,
    required: true
  }
})

const userName = ref(props.name)
const userCpf = ref(props.cpf)
const userBirthdate = ref(props.birthdate)
const userPhone = ref(props.phone)

const dispatchEvent = (eventName, eventObject) => {
  emit(eventName, eventObject)
}
</script>
