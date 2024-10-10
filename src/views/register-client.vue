<template>
  <main>
    <form class="register-client-form" method="post" @submit.prevent="next()">
      <p class="step-indicator">
        Etapa
        <span class="current-section">{{ steps.current }}</span>
        de {{ totalSteps }}
      </p>
      <email-step
        v-if="currentSection === 'emailStep'"
        :email="client.email"
        :type="client.type"
        @update="updateData"
      />
      <pf-details-step
        v-if="currentSection === 'pfDetails'"
        :name="client.name"
        :cpf="client.cpf"
        :birthdate="client.birthdate"
        :phone="client.phone"
        @update="updateData"
      />
      <pj-details-step
        v-if="currentSection === 'pjDetails'"
        :name="client.name"
        :cnpj="client.cnpj"
        :foundationdate="client.foundationdate"
        :phone="client.phone"
        @update="updateData"
      />
      <password-step
        v-if="currentSection === 'password'"
        :password="client.password"
        @update="updateData"
      />
      <pf-review-step
        v-if="currentSection === 'pfReview'"
        :email="client.email"
        :password="client.password"
        :name="client.name"
        :cpf="client.cpf"
        :birthdate="client.birthdate"
        :phone="client.phone"
        @update="updateData"
      />
      <pj-review-step
        v-if="currentSection === 'pjReview'"
        :email="client.email"
        :password="client.password"
        :name="client.name"
        :cnpj="client.cnpj"
        :foundationdate="client.foundationdate"
        :phone="client.phone"
        @update="updateData"
      />
      <div class="button-section" id="form-section-buttons">
        <ua-button 
          v-if="!(currentSection === steps.start)"
          type="button"
          width-behavior="full"
          @click.prevent="prev()"
        >
          Voltar
        </ua-button>
        <ua-button 
          v-if="steps.current !== totalSteps"
          type="submit"
          width-behavior="full"
        >
          Continuar
        </ua-button>
        <ua-button 
          v-else
          type="button"
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
  import EmailStep from '../components/email-step.vue'
  import PasswordStep from '../components/password-step.vue'
  import PjDetailsStep from '../components/pj-details-step.vue'
  import PfDetailsStep from '../components/pf-details-step.vue'
  import PfReviewStep from '../components/pf-review-step.vue'
  import PjReviewStep from '../components/pj-review-step.vue'
  import { uaButton } from 'sanhaua'

  import { ref, computed } from 'vue'

  const client = ref({
    email: '',
    type: '',
    name: '',
    cpf: '',
    cnpj: '',
    birthdate: '',
    foundationdate: '',
    phone: '',
    password: '',
  })

  const steps = ref({
    total: 4,
    current: 1,
    start: 'emailStep',
    // order of steps follow order of array elements
    pf: ['pfDetails', 'password', 'pfReview'],
    pj: ['pjDetails', 'password', 'pjReview'],
  })

  const totalSteps = computed(() => {
    if (client.value.type.length === 0) {
      return steps.value.total
    }

    return steps.value[client.value.type].length + 1
  })

  const currentSection = computed(() => {
    if (steps.value.current === 1) {
      return steps.value.start
    }

    return steps.value[client.value.type][steps.value.current - 2]
  })

  const next = () => {
    steps.value.current = steps.value.current + 1
  }

  const prev = () => {
    steps.value.current = steps.value.current - 1
  }

  const updateData = (event) => {
    client.value = { ...client.value, ...event }
  }

  const submit = async () => {
    const url = 'http://localhost:3000/registration'
    let res = ''
    try {
      res = await fetch(url, {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify(client.value),
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (err) {
      console.log(err)
    }
    console.log(res.json())
  }
</script>

<style lang="scss">
  @import '../styles/register-client.scss';
</style>
