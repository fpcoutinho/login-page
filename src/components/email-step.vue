<template>
  <div class="form-section">
    <h2 class="step-header">Seja bem vindo(a)</h2>
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
    <div class="form-group">
      <input
        class="register-client-input-radio"
        type="radio"
        id="pessoa-fisica"
        name="client-type"
        value="pf"
        v-model="userType"
        @change="dispatchEvent('update', { type: userType })"
        required
      />
      <label class="register-client-input-radio-label" for="pessoa-fisica"
        >Pessoa Física</label
      >
      <input
        class="register-client-input-radio"
        type="radio"
        id="pessoa-juridica"
        name="client-type"
        value="pj"
        v-model="userType"
        @change="dispatchEvent('update', { type: userType })"
        required
      />
      <label class="register-client-input-radio-label" for="pessoa-juridica"
        >Pessoa Jurídica</label
      >
    </div>
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
    type: {
      type: String,
      required: true,
    },
  })

  const userEmail = ref(props.email)
  const userType = ref(props.type)

  const dispatchEvent = (eventName, eventObject) => {
    emit(eventName, eventObject)
  }
</script>
