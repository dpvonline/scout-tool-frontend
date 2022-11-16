<template>
  <StepFrame header="Basis" @click="onNextButtonClicked">
    <BaseField component="Text" :label="'Username*'" techName="username" v-model="state.username"
      :errors="errors.username?.$errors" />
    <BaseField component="Password" :label="'Password*'" techName="password" v-model="state.password"
      :errors="errors.password?.$errors" />
    <BaseField component="Password" :label="'Password wiederholen*'" techName="repeatPassword"
      v-model="state.repeatPassword" :errors="errors.repeatPassword?.$errors" />
    <BaseField component="EMail" :label="'E-Mail-Adresse*'" techName="email" v-model="state.email"
      :errors="errors.email?.$errors" />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import BaseField from "@/components/field/Base.vue"
import StepFrame from "@/components/stepper/StepFrame.vue"

import { useVuelidate } from "@vuelidate/core"
import { required, minLength, sameAs, email, helpers } from "@vuelidate/validators"
import { useRouter } from "vue-router"
import { useCommonStore } from "@/modules/common/store/index"
import { useRegisterStore } from "@/modules/auth/store/index"

const registerStore = useRegisterStore()

const initialState = registerStore.basics

const state = reactive({
  username: initialState.username,
  password: initialState.password,
  repeatPassword: initialState.repeatPassword,
  email: initialState.email,
})

const reactivePassword = computed(() => {
  return state.password
})

const usernameIsUnique = async function () {
  if (state.username === '') {
    return false
  }
  return !(await registerStore.usernameAlreadyTaken(state.username))
}

const rules = {
  username: {
    required: helpers.withMessage("Dieses Feld muss angegeben werden.", required),
    isUnique: helpers.withMessage("Dieser Username ist bereits vergeben.", helpers.withAsync(usernameIsUnique)),
  },
  password: {
    required: helpers.withMessage("Dieses Feld muss angegeben werden.", required),
    minLength: helpers.withMessage("Das Password muss mindestens 8 Zeichen lang sein.", minLength(8)),
  },
  repeatPassword: {
    required: helpers.withMessage("Dieses Feld muss angegeben werden.", required),
    sameAs: helpers.withMessage("Die Passwörter stimmen nicht überein.", sameAs(reactivePassword)),
  },
  email: {
    required: helpers.withMessage("Dieses Feld muss angegeben werden", required),
    email: helpers.withMessage("Die E-Mail ist ungültig.", email),
  },
}

const router = useRouter()

const v$ = useVuelidate(rules, state)
const errors = reactive(v$)

const commonStore = useCommonStore()

function onNextButtonClicked() {
  errors.value.$validate()
  console.log(errors)

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen")
    return
  }

  registerStore.updateBasics(state)

  router.push({
    name: "RegisterScoutDetails",
  })
}
</script>
