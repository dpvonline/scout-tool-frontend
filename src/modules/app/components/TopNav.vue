<template>
  <div>
    <router-link
      v-for="item in props.navigation"
      :key="item.name"
      :to="{ name: item.linkName }"
      class="
        text-sm
        rounded-md
        bg-white bg-opacity-0
        px-3
        py-2
        hover:bg-opacity-10
      "
      :class="[
        currentRoute.includes(item.route)
          ? 'font-bold text-white '
          : 'font-medium text-blue-100',
      ]"
    >
      {{ item.name }}
      <span
        v-if="item.count & (item.count > 0)"
        :class="[
          item.current ? 'bg-white' : 'bg-red-600 group-hover:bg-gray-200',
          'ml-1 inline-block py-0.5 px-3 text-xs font-medium rounded-full',
        ]"
        >{{ item.count }}</span
      >
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  navigation: { type: Array, required: true },
});

const route = useRoute();

const currentRoute = computed(() => {
  return route.fullPath;
});
</script>
