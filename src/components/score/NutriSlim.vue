<template>
  <div>
    <span
      v-if="nutriClass === 1"
      class="py-2 nutri active_nutri"
      style="background-color: #017f3d"
    >
      A
    </span>
    <span
      v-if="nutriClass === 2"
      class="py-2 nutri active_nutri"
      style="background-color: #86bc20"
    >
      B
    </span>
    <span
      v-if="nutriClass === 3"
      class="py-2 nutri active_nutri"
      style="background-color: #ffcc00"
    >
      C
    </span>
    <span
      v-if="nutriClass === 4"
      class="py-2 nutri active_nutri"
      style="background-color: #f07b00"
    >
      D
    </span>
    <span
      v-if="nutriClass === 5"
      class="py-2 nutri active_nutri"
      style="background-color: #e72d10"
    >
      E
    </span>
  </div>
</template>

<script setup lang="ts">

  const props =  defineProps({
    nutriClass: Number,
  })
</script>

<style scoped>
.nutri {
  border-radius: 5px;
  color: rgb(209, 208, 208);
  text-align: center;
  display: inline-block;
  font-size: 20px;
  width: 20px !important;
}
.active_nutri {
  font-size: 20px !important;
  font-weight: 700 !important;
  color: rgb(255, 255, 255);
}
</style>