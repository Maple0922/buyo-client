<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>予約日時</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="date"
                  label="日付"
                  type="date"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="time"
                  label="時間"
                  type="time"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">予約する</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const date = route.query.date as string;
const time = route.query.time as string;
</script>
