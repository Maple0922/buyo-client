<template>
  <v-bottom-navigation
    :elevation="4"
    grow
    :bg-color="color"
    v-model="tabName"
    @update:modelValue="onTabChange"
    mandatory
    :height="80"
  >
    <v-btn value="list">
      <v-icon>mdi-calendar-range</v-icon>
      一覧
    </v-btn>
    <v-btn value="reserve">
      <v-icon>mdi-calendar-edit</v-icon>
      予約
    </v-btn>
    <v-btn value="schedule">
      <v-icon>mdi-calendar-clock</v-icon>
      日調
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

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

const onTabChange = (tabName: TabColor["name"]) => {
  router.push({ name: tabName });
};
</script>
