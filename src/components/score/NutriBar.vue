<template>
  <div>
    <span
      :class="nutriClass === 1 ? 'active_nutri' : ''"
      class="py-4 nutri"
      style="background-color: #017f3d"
    >
      A
    </span>
    <span
      :class="nutriClass === 2 ? 'active_nutri' : ''"
      class="py-4 nutri"
      style="background-color: #86bc20"
    >
      B
    </span>
    <span
      :class="nutriClass === 3 ? 'active_nutri' : ''"
      class="py-4 nutri"
      style="background-color: #ffcc00"
    >
      C
    </span>
    <span
      :class="nutriClass === 4 ? 'active_nutri' : ''"
      class="py-4 nutri"
      style="background-color: #f07b00"
    >
      D
    </span>
    <span
      :class="nutriClass === 5 ? 'active_nutri' : ''"
      class="py-4 nutri"
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
  width: 40px !important;
}
.active_nutri {
  font-size: 28px !important;
  font-weight: 700 !important;
  color: rgb(255, 255, 255);
}
</style>