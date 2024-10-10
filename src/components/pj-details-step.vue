<template>
  <div class="form-section">
    <h2 class="step-header">Pessoa Jurídica</h2>
    <label for="name">Razão Social</label>
    <input
      class="register-client-input-field"
      type="text"
      id="name"
      autocomplete="name"
      v-model="userName"
      @input="dispatchEvent('update', { name: userName })"
      required
    />
    <label for="cnpj">CNPJ</label>
    <input
      class="register-client-input-field"
      type="text"
      id="cnpj"
      autocomplete="on"
      v-model="userCnpj"
      @input="dispatchEvent('update', { cnpj: userCnpj })"
      required
    />
    <label for="foundation-date">Data de abertura</label>
    <input
      class="register-client-input-field"
      type="date"
      id="foundation-date"
      autocomplete="bday"
      v-model="userFoundationdate"
      @input="dispatchEvent('update', { foundationdate: userFoundationdate })"
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
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const emit = defineEmits(['update'])

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true,
    },
    foundationdate: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  })

  const userName = ref(props.name)
  const userCnpj = ref(props.cnpj)
  const userFoundationdate = ref(props.foundationdate)
  const userPhone = ref(props.phone)

  const dispatchEvent = (eventName, eventObject) => {
    emit(eventName, eventObject)
  }
</script>
