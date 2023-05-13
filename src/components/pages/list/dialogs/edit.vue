<template>
  <v-dialog v-model="visible">
    <v-card>
      <v-card-title>
        <span class="headline">新規作成</span>
      </v-card-title>
      <v-card-text>
        <v-container>a </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="visible = false">
          キャンセル
        </v-btn>
        <!-- <v-btn color="blue darken-1" text @click="create"> 作成 </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const visible = ref(props.visible);
</script>
