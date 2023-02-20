<template>
  <div>
    <router-link
      v-for="item in props.navigation"
      :key="item.name"
      :to="{ name: item.linkName }"
      class="
        text-cyan-100 text-sm
        font-medium
        rounded-md
        bg-white bg-opacity-0
        px-3
        py-2
        hover:bg-opacity-10
      "
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  navigation: { type: Array, required: true },
});
</script>
