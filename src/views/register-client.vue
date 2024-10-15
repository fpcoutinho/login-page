<template>
  <main>
    <form class="register-client-form" method="post" @submit.prevent="next()">
      <p class="step-indicator">
        Etapa
        <span class="current-section">{{ steps.current }}</span>
        de {{ totalSteps }}
      </p>
      <Suspense>
        <component :is="currentSection.component" v-bind="clientData" @update="updateData" />

        <template #fallback>
          <ua-skeleton format="square" style="width: 150px; height: 32px" />
          <br />
          <br />
          <ua-skeleton format="square" style="width: 50px; height: 15px" />
          <ua-skeleton format="round" style="width: 350px; height: 35px" />
          <ua-skeleton format="square" style="width: 50px; height: 15px" />
          <ua-skeleton format="round" style="width: 350px; height: 35px" />
          <ua-skeleton format="circle" style="width: 200px; height: 35px" />
          <ua-skeleton format="round" style="width: 350px; height: 35px" />
        </template>
      </Suspense>
      <div id="form-section-buttons" class="button-section">
        <ua-button
          v-if="!isFirstStep"
          type="button"
          size="medium"
          appearance="secondary"
          width-behavior="full"
          @click.prevent="prev()"
        >
          Voltar
        </ua-button>
        <ua-button
          v-if="!isLastStep"
          type="submit"
          size="medium"
          appearance="primary"
          width-behavior="full"
        >
          Continuar
        </ua-button>
        <ua-button
          v-else
          type="button"
          size="medium"
          appearance="primary"
          width-behavior="full"
          @click.prevent="submit()"
        >
          Cadastrar
        </ua-button>
      </div>
    </form>
  </main>
</template>

<script setup>
import { uaButton, uaSkeleton } from 'sanhaua'
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

const submit = () => {
  let client = {}

  if (clientData.value.type === 'pf') {
    client = {
      email: clientData.value.email,
      name: clientData.value.name,
      cpf: clientData.value.cpf,
      birthdate: clientData.value.birthdate,
      phone: clientData.value.phone,
      password: clientData.value.password
    }
  } else if (clientData.value.type === 'pj') {
    client = {
      email: clientData.value.email,
      name: clientData.value.name,
      cnpj: clientData.value.cnpj,
      foundationdate: clientData.value.foundationdate,
      phone: clientData.value.phone,
      password: clientData.value.password
    }
  } else {
    alert('Erro! Tipo de cliente não selecionado.')
    return
  }

  let hasEmptyFields = false

  for (let key in client) {
    if (client[key].length === 0) {
      hasEmptyFields = true
    }
  }

  if (hasEmptyFields) {
    alert('Formulário com campos em branco.')
    return
  } else {
    alert('Cliente cadastrado com sucesso!')
    steps.current.value = 1
    resetClientData()
    return
  }
}
</script>

<style lang="scss">
@import '../styles/register-client.scss';
</style>
