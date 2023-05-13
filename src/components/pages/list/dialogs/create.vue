<template>
  <v-dialog v-model="visible" transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar density="comfortable" color="indigo-darken-4">
        <v-toolbar-title>
          <v-icon icon="mdi-calendar-edit" size="small" />
          <span class="font-weight-bold text-body-1"> 予約</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col class="pb-0">
            <p class="font-weight-bold text-h6">
              {{ formatDate(createForm.date, "YYYY年M月D日 (ddd)") }}
            </p>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="2">
            <v-btn
              variant="text"
              density="comfortable"
              color="indigo-darken-4"
              @click="shiftTime(-30)"
              icon="mdi-chevron-left"
            />
          </v-col>
          <v-col cols="8" class="px-0">
            <p class="font-weight-bold text-h4 text-center">
              {{ displayDatetime }}
            </p>
          </v-col>
          <v-col cols="2">
            <v-btn
              variant="text"
              density="comfortable"
              color="indigo-darken-4"
              @click="shiftTime(30)"
              icon="mdi-chevron-right"
            />
          </v-col>
        </v-row>
        <v-row class="mb-2">
          <v-col align="center">
            <range-toggle />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="createForm.name"
              :counter="30"
              label="バンド名"
              required
              color="indigo-darken-4"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="6">
            <v-text-field
              v-model="createForm.passcode"
              :counter="4"
              label="パスコード"
              :append-inner-icon="showPasscode ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPasscode ? 'text' : 'password'"
              required
              color="indigo-darken-4"
              variant="outlined"
              density="compact"
              @update:modelValue="createForm.passcode.substring(0, 4)"
              @click:append-inner="showPasscode = !showPasscode"
              hint="4 digits"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="indigo-darken-4"
          variant="outlined"
          :loading="createLoading"
          @click="create"
          >予約する</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { strictInject } from "@/utils/strictInject";
import { key } from "@/components/pages/list/provider";
import { toRefs, ref, computed } from "vue";
import RangeToggle from "./forms/range-toggle.vue";

import { formatDate } from "@/utils/dateFormatter";
const { dialogVisible, createForm, shiftTime } = strictInject(key);
const { create: visible } = toRefs(dialogVisible);

const displayDatetime = computed(() => {
  const start = createForm.time.start;
  const end = createForm.time.end;
  const startMinute = start.minute === 30 ? "30" : "00";
  const endMinute = end.minute === 30 ? "30" : "00";
  return `${start.hour}:${startMinute} - ${end.hour}:${endMinute}`;
});

const showPasscode = ref(false);

const createLoading = ref(false);
const create = () => {
  createLoading.value = true;
  console.log("create");
  console.log(createForm);
  visible.value = false;
};
</script>
