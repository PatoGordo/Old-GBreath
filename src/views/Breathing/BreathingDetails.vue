<template>
  <div>
    <h2 v-if="Number($route.params.id) > techniques.length - 1">
      {{ t("BreathingNotFound") }}
    </h2>
    <div class="technique-details" s-default-width v-else>
      <h2>
        {{ techniques[Number($route.params.id)].name[userPreferences.lang] }}
      </h2>
      <span>{{
        techniques[Number($route.params.id)].description[userPreferences.lang]
      }}</span>
      <br />
      <ul class="steps" s-default-width>
        <li v-if="techniques[Number($route.params.id)].steps[0] > 0">
          {{ t("InhaleFor") }}
          {{ techniques[Number($route.params.id)].steps[0] }}s;
        </li>
        <li v-if="techniques[Number($route.params.id)].steps[1] > 0">
          {{ t("HoldFor") }}
          {{ techniques[Number($route.params.id)].steps[1] }}s;
        </li>
        <li v-if="techniques[Number($route.params.id)].steps[2] > 0">
          {{ t("ExhaleFor") }}
          {{ techniques[Number($route.params.id)].steps[2] }}s;
        </li>
        <li v-if="techniques[Number($route.params.id)].steps[3] > 0">
          {{ t("TakeARestFor") }}
          {{ techniques[Number($route.params.id)].steps[3] }}s;
        </li>
      </ul>
      <br />
      <br />
      <div class="breathing-repeat-range">
        <input type="range" min="8" max="120" v-model="repeatTimes" />
        <label for="volume"
          >{{ t("TheBreathingWillRepeat") }} <strong>{{ repeatTimes }}</strong>
          {{ t("Times") }}.</label
        >
      </div>

      <button
        s-default-button
        @click="$router.push(`/breathing/${Number($route.params.id)}`)"
      >
        {{ t("StartPractice") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { techniques } from "@/data/breathings";
import {
  ChangeUserPreferences,
  userPreferences,
} from "@/shared/user-preferences";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

let repeatTimes = ref(userPreferences.defaultBreathingRepeat);

ref(techniques);
ref(userPreferences);

watch(
  () => repeatTimes.value,
  (val) => {
    ChangeUserPreferences.changeBreathingRepeatTo(val);
  }
);
</script>

<style lang="scss" scoped>
.technique-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    margin-top: 16px;
  }
  .steps {
    text-align: start;
  }
}
.breathing-repeat-range {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
