<template>
  <div>
    <BaseField
      component="Text"
      label="Gruppenname"
      techName="name"
      v-model="state.name"
      :errors="errors.name?.$errors"
    />
    <BaseField
      component="Select"
      label="Typ"
      techName="type"
      :items="createGroupChoise"
      v-model="state.type"
      :errors="errors.type?.$errors"
    />
    <PrimaryButton
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Untergruppe erstellen"
    />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();
import moment from "moment";

import { reactive, onMounted, ref, watch, computed } from "vue";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { useMessageStore } from "@/modules/message/store/index";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

import { useAuthStore } from "@/modules/auth/store/index";
const authStore = useAuthStore();

import { useGroupStore } from "@/modules/group/store/index";
const groupStore = useGroupStore();

const state = reactive({
  name: '',
  type: 1,

});

const rules = {
  name: {
    required,
  },
  type: {
    required,
  },
};


const isAuth = computed(() => {
  return authStore.isAuth;
});

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);

const createGroupChoise = computed(() => {
  return groupStore.createGroupChoise;
});

function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  groupStore
    .createGroup({
      name: state.name,
      type: state.type?.value,
      parentId: route.params.id,
    })
    .then((response) => {
      if (response && response.status === 201) {
        goToRoute(response.data.id)
        commonStore.showSuccess("Nachricht erfolgreich angelegt");
      } else if (response && response.status === 400) {
        debugger;
        commonStore.showSuccess(`Die Anfrage ist Fehlerhaft.${response.data}`);
      } else {
        console.log(response);
      }
    })
    .finally(() => {
      isLoading.value = false;
    });

  isLoading.value = true;
}

function goToRoute(id: number) {
  router.push({
    name: "GroupOverview",
    params: {
      id: id,
    },
  });
  if (router.currentRoute.value.name === "GroupOverview") {
    router.go(router.currentRoute.value);
  }
}

import { useRoute } from "vue-router";
const route = useRoute();

import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  groupStore.fetchCreateGroupChoise();
});
</script>
