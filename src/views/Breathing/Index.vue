<template>
  <div>
    <h2>{{ t("ChooseABreathing") }}</h2>

    <div class="techniques" s-default-width>
      <button
        v-for="(technique, index) in techniques"
        :key="index"
        @click="$router.push(`/breathing/details/${index}`)"
        s-default-button
      >
        {{ technique.name[userPreferences.lang] }}
        <icon icon="akar-icons:arrow-right" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { techniques } from "@/data/breathings";
import { userPreferences } from "@/shared/user-preferences";
import { Icon } from "@iconify/vue";
import { ref } from "@vue/reactivity";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

ref(techniques);
ref(userPreferences);
</script>

<style lang="scss" scoped>
.techniques {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  button {
    background: #ddd !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    svg {
      color: #24242d;
      fill: #24242d;
      width: 18px;
      height: 18px;
    }
    gap: 8px;
    &:nth-child(1) {
      background: #f0f098 !important;
    }
    &:nth-child(2) {
      background: #97e5a4 !important;
    }
    &:nth-child(3) {
      background: #a9faf6 !important;
    }
    &:nth-child(4) {
      background: #89b2e7 !important;
    }
    &:nth-child(5) {
      background: #b89bee !important;
    }
    &:nth-child(6) {
      background: #e5a6ec !important;
    }
  }
}
</style>
