<template>
  <div>
    <BaseField
      component="AutoComplete"
      :label="'Zugriff auf Persönliche Anmeldedaten'"
      techName="adminGroup"
      v-model="state.adminGroup"
      :errors="errors.adminGroup?.$errors"
      :items="shortGroups"
      hint="Diese Gruppe darf alle  persönlichen Daten der Anmeldenden sehen."
      :lookupListDisplay="['displayName']"
      :cols="12"
    />
    <BaseField
      component="AutoComplete"
      :label="'Zugriff auf aggrigierte Anmeldedaten'"
      techName="viewGroup"
      v-model="state.viewGroup"
      :errors="errors.viewGroup?.$errors"
      :cols="12"
      :items="shortGroups"
      hint="Diese Gruppe darf alle nicht persönlichen Daten der Anmeldenden sehen."
      :lookupListDisplay="['displayName']"
    />
    <BaseField
      component="AutoCompleteMulti"
      :label="'Eingeladene Gruppen'"
      techName="invitedGroups"
      v-model="state.invitedGroups"
      :errors="errors.invitedGroups?.$errors"
      :cols="12"
      :items="shortGroups2"
      hint="Suche nach deinem Stammesnamen aus, damit wir dich zuordnen können."
      :lookupListDisplay="['displayName']"
      valueField="value"
    />
    <BaseField
      component="AutoCompleteMulti"
      :label="'Verantwortliche Personen'"
      techName="responsiblePersons"
      v-model="state.responsiblePersons"
      :errors="errors.responsiblePersons?.$errors"
      :cols="12"
      :items="users2"
      hint="Suche nach deinem Stammesnamen aus, damit wir dich zuordnen können."
      :lookupListDisplay="['displayName']"
      valueField="value"
    />
    <BaseField
      component="AutoComplete"
      :label="'Einladene Gruppe'"
      techName="invitingGroup"
      v-model="state.invitingGroup"
      :errors="errors.invitingGroup?.$errors"
      :cols="12"
      :items="shortGroups"
      hint="Welche Gruppe lädt ein?"
      :lookupListDisplay="['displayName']"
    />
    <BaseField
      component="Select"
      :label="'Anmeldeebene'"
      techName="registrationLevel"
      v-model="state.registrationLevel"
      :errors="errors.registrationLevel?.$errors"
      :items="scoutOrgaLevels"
      hint="Die Ebene legt fest welche Ebene deine Anmeldung hat."
      :lookupListDisplay="['name']"
      :cols="12"
    />
    <BaseField
      component="Toggle"
      :label="'Öffentlich Sichtbar?'"
      techName="isPublic"
      v-model="state.isPublic"
      :errors="errors.isPublic?.$errors"
      :cols="12"
    />

    <PrimaryButton
      class="my-4"
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Speichern"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, watch, computed } from "vue";
import { useCommonStore } from "@/modules/common/store/index";
import { useEventEditStore } from "@/modules/event/store/edit";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute } from "vue-router";
import router from "@/router";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const commonStore = useCommonStore();
const eventEditStore = useEventEditStore();
const route = useRoute();

const format1 = "YYYY-MM-DDTHH:mm";

const state = reactive({
  adminGroup: null,
  viewGroup: null,
  invitedGroups: [],
  responsiblePersons: [],
  invitingGroup: null,
  registrationLevel: null,
  isPublic: null,
});

const rules = {
  adminGroup: {
    required,
  },
  viewGroup: {
    required,
  },
  invitingGroup: {
    required,
  },
  isPublic: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);
const data = ref({});

function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  isLoading.value = true;

  const returnObj = data.value;
  returnObj.adminGroup = state.adminGroup.id;
  returnObj.viewGroup = state.viewGroup.id;
  returnObj.invitedGroups = state.invitedGroups;
  returnObj.responsiblePersons = state.responsiblePersons;
  returnObj.invitingGroup = state.invitingGroup.id;
  returnObj.registrationLevel = state.registrationLevel.id;
  returnObj.isPublic = state.isPublic;

  eventEditStore
    .updateEvent(returnObj)
    .then((response) => goToRoute(response.data.id));
}

function goToRoute(id: number) {
  router.push({
    name: "EventDetail",
    params: {
      id: id,
    },
  });
  //todo
  if (router.currentRoute.value.name === "EventDetail") {
    router.go(router.currentRoute.value);
  }
}

import { useGroupStore } from "@/modules/group/store/index";
const groupStore = useGroupStore();

const shortGroups = computed(() => {
  return groupStore.shortGroups;
});

const shortGroups2 = computed(() => {
  if (groupStore.shortGroups && groupStore.shortGroups.length) {
    let arr = JSON.parse(JSON.stringify(groupStore.shortGroups));
    arr.forEach(function (data) {
      data["value"] = data["id"];
      data["label"] = data["displayName"];
      delete data["id"];
      delete data["displayName"];
      delete data["name"];
      delete data["keycloakId"];
    });
    return arr;
  } else {
    return [];
  }
});

const users2 = computed(() => {
  if (personStore.users && personStore.users.length) {
    let arr = JSON.parse(JSON.stringify(personStore.users));
    arr.forEach(function (data) {
      data["value"] = data["email"];
      data["label"] = data["username"];
      delete data["id"];
      delete data["displayName"];
      delete data["name"];
      delete data["djangoId"];
      delete data["keycloakId"];
      delete data["email"];
      delete data["scoutName"];
      delete data["stammBund"];
      delete data["username"];
    });
    return arr;
  } else {
    return [];
  }
});

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const scoutOrgaLevels = computed(() => {
  return eventStore.scoutOrgaLevels;
});

function setInitData(data) {
  state.adminGroup = shortGroups.value.find((a) => a["id"] === data.adminGroup);
  state.viewGroup = shortGroups.value.find((a) => a["id"] === data.viewGroup);
  state.invitingGroup = shortGroups.value.find(
    (a) => a["id"] === data.invitingGroup
  );
  state.invitedGroups = data.invitedGroups;

  state.responsiblePersons = data.responsiblePersons;

  state.registrationLevel = scoutOrgaLevels.value.find(
    (a) => a["id"] === data.registrationLevel
  );
  state.isPublic = data.isPublic;
}
import { usePersonStore } from "@/modules/person/store/index.ts";
const personStore = usePersonStore();

const users = computed(() => {
  return personStore.users;
});

onMounted(async () => {
  const id = route.params.id;
  await Promise.all([
    groupStore.fetchGroupsShort(),
    eventStore.fetchScoutOrgaLevel(),
    personStore.fetchUsers(),
  ]);
  if (id) {
    const response = await eventEditStore.fetchTechById(id);
    setInitData(response.data);
    data.value = response.data;
  }
});
</script>
