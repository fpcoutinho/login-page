<template>
  <main>
    <form class="register-client-form" method="post" @submit.prevent="next()">
      <p class="step-indicator">
        Etapa
        <span class="current-section">{{ steps.current }}</span>
        de {{ totalSteps }}
      </p>
      <Suspense timeout="500000">
        <template #default>
          <component :is="currentSection.component" v-bind="clientData" @update="updateData" />
        </template>

        <template #fallback>
          <div class="form-section">
            <ua-skeleton format="square" style="width: 150px; height: 32px" />
            <ua-skeleton format="square" style="width: 50px; height: 15px" />
            <ua-skeleton format="round" style="width: 350px; height: 35px" />
            <ua-skeleton format="square" style="width: 50px; height: 15px" />
            <ua-skeleton format="round" style="width: 350px; height: 35px" />
            <ua-skeleton format="circle" style="width: 200px; height: 35px" />
            <ua-skeleton format="round" style="width: 350px; height: 35px" />
          </div>
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
    <div v-show="$toasts.queue.length > 0" class="toast-container">
      <ua-toast
        v-for="toast in $toasts.queue"
        :key="toast.id"
        :appearance="toast.appearance"
        :message="toast.message"
        :title="toast.title"
      />
    </div>
  </main>
</template>

<script setup>
import { uaButton, uaSkeleton, uaToast } from 'sanhaua'
import { ref, computed, defineAsyncComponent, inject } from 'vue'

const $toasts = inject('toasts')

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
    $toasts.enqueue({
      title: 'Erro!',
      message: 'Tipo de cliente não selecionado.',
      appearance: 'danger'
    })
    return
  }

  let hasEmptyFields = false

  for (let key in client) {
    if (client[key].length === 0) {
      hasEmptyFields = true
    }
  }

  if (hasEmptyFields) {
    $toasts.enqueue({
      title: 'Erro!',
      message: 'Formulário com campos em branco.',
      appearance: 'danger'
    })
    return
  } else {
    $toasts.enqueue({
      title: 'Sucesso!',
      message: 'Cliente cadastrado com sucesso!',
      appearance: 'success'
    })
    steps.current.value = 1
    resetClientData()
    return
  }
}
</script>

<style lang="scss">
@import '../styles/register-client.scss';
</style>
