<template>
  <v-bottom-navigation
    :elevation="0"
    grow
    color="indigo-darken-4"
    v-model="tabName"
    @update:modelValue="onTabChange"
    mandatory
    height="72"
  >
    <v-btn value="list">
      <v-icon>mdi-calendar-range</v-icon>
      <span class="mb-3">一覧</span>
    </v-btn>
    <v-btn value="reserve">
      <v-icon>mdi-calendar-edit</v-icon>
      <span class="mb-3">予約</span>
    </v-btn>
    <v-btn value="schedule">
      <v-icon>mdi-calendar-clock</v-icon>
      <span class="mb-3">日調</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

type TabName = "list" | "reserve" | "schedule";

const tabName = ref<TabName>("list");

const onTabChange = (tabName: TabName) => {
  router.push({ name: tabName });
};
</script>
