<template>
  <main>
    <form class="register-client-form" method="post" @submit.prevent="next()">
      <p class="step-indicator">
        Etapa
        <span class="current-section">{{ steps.current }}</span>
        de {{ totalSteps }}
      </p>
      <component :is="currentSection.component" v-bind="clientData" @update="updateData" />
      <div class="button-section" id="form-section-buttons">
        <ua-button v-if="!isFirstStep" type="button" width-behavior="full" @click.prevent="prev()">
          Voltar
        </ua-button>
        <ua-button v-if="!isLastStep" type="submit" width-behavior="full"> Continuar </ua-button>
        <ua-button v-else type="button" width-behavior="full" @click.prevent="submit()">
          Cadastrar
        </ua-button>
      </div>
    </form>
  </main>
</template>

<script setup>
import { uaButton } from 'sanhaua'

import { ref, computed, defineAsyncComponent } from 'vue'

const clientData = ref({
  email: '',
  type: '',
  name: '',
  cpf: '',
  cnpj: '',
  birthdate: '',
  foundationdate: '',
  phone: '',
  password: ''
})

const steps = {
  total: 4,
  current: ref(1),
  start: {
    component: defineAsyncComponent(() => import('../components/email-step.vue'))
  },
  // order of steps follow order of array elements
  pf: [
    {
      component: defineAsyncComponent(() => import('../components/pf-details-step.vue'))
    },
    {
      component: defineAsyncComponent(() => import('../components/password-step.vue'))
    },
    {
      component: defineAsyncComponent(() => import('../components/pf-review-step.vue'))
    }
  ],
  pj: [
    {
      component: defineAsyncComponent(() => import('../components/pj-details-step.vue'))
    },
    {
      component: defineAsyncComponent(() => import('../components/password-step.vue'))
    },
    {
      component: defineAsyncComponent(() => import('../components/pj-review-step.vue'))
    }
  ]
}

const totalSteps = computed(() => {
  if (clientData.value.type.length === 0) {
    return steps.total
  }

  return steps[clientData.value.type].length + 1
})

const currentSection = computed(() => {
  if (steps.current.value === 1) {
    return steps.start
  }

  return steps[clientData.value.type][steps.current.value - 2]
})

const isFirstStep = computed(() => steps.current.value === 1)

const isLastStep = computed(() => steps.current.value === totalSteps.value)

const next = () => {
  steps.current.value = steps.current.value + 1
}

const prev = () => {
  steps.current.value = steps.current.value - 1
}

const updateData = (event) => {
  clientData.value = { ...clientData.value, ...event }
}

const resetClientData = () => {
  clientData.value = {
    email: '',
    type: '',
    name: '',
    cpf: '',
    cnpj: '',
    birthdate: '',
    foundationdate: '',
    phone: '',
    password: ''
  }
}

const submit = async () => {
  const url = 'http://localhost:3000/registration'
  let res = ''
  try {
    res = await fetch(url, {
      method: 'POST',
      mode: 'same-origin',
      body: JSON.stringify(clientData.value),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      alert('Cliente cadastrado com sucesso!')
      steps.current.value = 1
      resetClientData()
    }
  } catch (err) {
    alert('Erro ao cadastrar cliente')
    console.log(err)
  }
}
</script>

<style lang="scss">
@import '../styles/register-client.scss';
</style>
