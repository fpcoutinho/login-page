<template>
  <div class="form-section">
    <h2 class="step-header">Pessoa Jurídica</h2>
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
  cnpj: {
    type: String,
    required: true
  },
  foundationdate: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})

const userName = ref(props.name)
const userCnpj = ref(props.cnpj)
const userFoundationdate = ref(props.foundationdate)
const userPhone = ref(props.phone)

const dispatchEvent = (eventName, eventObject) => {
  emit(eventName, eventObject)
}
</script>
