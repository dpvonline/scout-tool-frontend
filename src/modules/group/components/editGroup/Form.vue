<template>
  <div>
    <!-- <BaseField
      component="Text"
      label="Gruppenname"
      techName="name"
      v-model="state.name"
      :errors="errors.name?.$errors"
    />
    <PrimaryButton
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Gruppe bearbeiten"
    /> -->
    <PrimaryButton
      class="mx-2"
      color="red"
      @click="onDeleteClicked"
      :isLoading="!!isLoading"
      label="Gruppe löschen"
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
  id: null,
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

const group = computed(() => {
  return groupStore.group;
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

function goToRoute(id: any) {
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

function onDeleteClicked() {
  groupStore
    .deleteGroup(route.params.id).then((response) => {
      goToRoute(group?.value?.parent?.id);
    });
}

import { useRoute } from "vue-router";
const route = useRoute();

import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  groupStore.fetchCreateGroupChoise();
});
</script>
