<template>
  <div class="">
    <List
      :name="'Heimabend der Woche'"
      :items="activitiesOfTheWeek"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="AllMessages"
      detailPageLink="MessageDetail"
      :isLoading="isLoading"
    >
      <template #listitem="{ item }">
        <ActivityOfTheWeekListItem :item="item"/>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, watch, onMounted, computed } from "vue";
import List from "@/components/base/list/Main.vue";
import ActivityOfTheWeekListItem from "@/modules/inspi/components/ActivityOfTheWeekListItem.vue";
import { useRoute } from "vue-router";
import { useInspiStore } from "@/modules/inspi/store";

const inspiStore = useInspiStore();

const searchValue = ref();

const route = useRoute();

const isLoading = computed(() => {
  return inspiStore.isLoading;
});

const activitiesOfTheWeek = computed(() => {
  return inspiStore.activitiesOfTheWeek;
});

onMounted(() => {
  inspiStore.fetchActivitiesOfTheWeek(route.query);
});


const sortOptions = [];

const filters = [];

const buttonList = [{ name: "Neue Nachricht", linkName: "MessageNew" }];
</script>
