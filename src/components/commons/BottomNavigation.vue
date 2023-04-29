<template>
  <v-bottom-navigation :elevation="4" grow :bg-color="color" v-model="tabName">
    <v-btn value="list">
      <v-icon>mdi-history</v-icon>
      一覧
    </v-btn>
    <v-btn value="reserve">
      <v-icon>mdi-heart</v-icon>
      予約
    </v-btn>
    <v-btn value="schedule">
      <v-icon>mdi-map-marker</v-icon>
      日調
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
const tabName = ref<TabColor["name"]>("list");

interface TabColor {
  name: "list" | "reserve" | "schedule";
  color: "blue-grey" | "teal" | "indigo";
}

const tabColors: TabColor[] = [
  { name: "list", color: "blue-grey" },
  { name: "reserve", color: "teal" },
  { name: "schedule", color: "indigo" },
];

const color = computed<TabColor["color"]>(
  () =>
    tabColors.find((tab) => tab.name === tabName.value)?.color ?? "blue-grey"
);
</script>
