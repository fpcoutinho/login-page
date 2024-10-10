<template>
  <div class="form-section">
    <h2 class="step-header">Senha de acesso</h2>
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
    password: {
      type: String,
      required: true,
    },
  })

  const userPassword = ref(props.password)

  const dispatchEvent = (eventName, eventObject) => {
    emit(eventName, eventObject)
  }
</script>
