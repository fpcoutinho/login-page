<template>
  <div class="form-section">
    <h2 class="step-header">Senha de acesso</h2>
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
import { uaInputPassword } from 'sanhaua'

const emit = defineEmits(['update'])

const props = defineProps({
  password: {
    type: String,
    required: true
  }
})

const userPassword = ref(props.password)

const dispatchEvent = (eventName, eventObject) => {
  emit(eventName, eventObject)
}
</script>
