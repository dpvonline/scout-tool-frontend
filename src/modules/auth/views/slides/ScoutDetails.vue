<template>
  <StepFrame header="Basis" @click="onNextButtonClicked">
    <BaseField component="Text" :label="'Fahrtenname'" techName="scoutname" v-model="state.scoutName"
      :errors="errors.scoutname?.$errors" />
    <BaseField component="Select" :label="'Stamm'" techName="scoutgroup" v-model="state.scoutOrganisation"
      :errors="errors.scoutOrganisation?.$errors" :items="registerStore.scoutHierarchyMappings" />
    <BaseField component="Select" :label="'Stufe'" techName="scoutlevel" v-model="state.scoutLevel"
      :errors="errors.scoutlevel?.$errors" :items="registerStore.scoutLevelMappings" />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import BaseField from "@/components/field/Base.vue"
import StepFrame from "@/components/stepper/StepFrame.vue"
import { useVuelidate } from "@vuelidate/core"
import { useRouter } from "vue-router"
import { useCommonStore } from "@/modules/common/store/index"
import { useRegisterStore } from "../../store"

const registerStore = useRegisterStore()
const initialState = registerStore.scoutDetails

const state = reactive({
  scoutName: initialState.scoutName,
  scoutOrganisation: initialState.scoutOrganisation,
  scoutLevel: initialState.scoutLevel,
})

const rules = {
  scoutName: {},
  scoutOrganisation: {},
  scoutLevel: {},
}

const router = useRouter()

const v$ = useVuelidate(rules, state)
const errors = ref(v$)

const commonStore = useCommonStore()

function onNextButtonClicked() {
  errors.value.$validate()
  console.log(errors.value)

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen")
    return
  }

  registerStore.updateScoutDetails(state)

  router.push({
    name: "RegisterPersonalDetails",
  })
}
</script>
