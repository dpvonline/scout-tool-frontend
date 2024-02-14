<template>
  <div class="my-4 mx-4">
    <apexchart
      type="line"
      height="400"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { defaultNavigator } from "@vueuse/core";
import { defineComponent, ref, computed } from "vue";
import { Chart, Grid, Line } from "vue3-charts";

const props = defineProps({
  data: Object,
});

const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  );

const chartOptions = computed(() => {
  return {
    chart: {
      id: "vuechart-example",
    },
    title: {
      text: "Timeline - Angemeldete Personen",
      align: "left",
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "MM yyyy",
      },
    },
  };
});
const series = computed(() => {
  if (!props.data || props.data.length === 0) {
    return [];
  }
  return [
    {
      name: "Anmeldungen",
      data: props.data.map((ary) => ({ x: ary.createdAt_Date, y: ary.cumsum })),
    },
  ];
});
</script>

