<template>
  <div class="form-section">
    <h2 class="step-header">Seja bem vindo(a)</h2>
    <label for="email">Endereço de e-mail</label>
    <input
      id="email"
      v-model="userEmail"
      class="register-client-input-field"
      type="email"
      autocomplete="email"
      required
      @input="dispatchEvent('update', { email: userEmail })"
    />
    <div class="form-group">
      <ua-input-radio
        v-model="userType"
        name="client-type"
        value="pf"
        label="Pessoa Física"
        size="medium"
        required
        @change="dispatchEvent('update', { type: userType })"
      />
      <ua-input-radio
        v-model="userType"
        name="client-type"
        value="pj"
        label="Pessoa Jurídica"
        size="medium"
        required
        @change="dispatchEvent('update', { type: userType })"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uaInputRadio } from 'sanhaua'

const emit = defineEmits(['update'])

const props = defineProps({
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const userEmail = ref(props.email)
const userType = ref(props.type)

const dispatchEvent = (eventName, eventObject) => {
  emit(eventName, eventObject)
}
</script>
