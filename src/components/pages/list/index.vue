<template>
  list
  <span>{{ days }}</span>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Day } from "@/types";
import axios from "axios";

const days = ref<Day[]>([]);
onMounted(async () => {
  const { data } = await axios.get<Day[]>("/reserve");
  days.value = data;
});
</script>
