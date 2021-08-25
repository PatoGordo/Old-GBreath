<template>
  <div>
    <h2>{{ t("Settings") }}</h2>
    <h3>{{ t("ChooseYourAppLanguage") }}</h3>
    <select class="select-language" s-default-width v-model="locale">
      <option value="en">English</option>
      <option value="pt">Português</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ChangeUserPreferences } from "@/shared/user-preferences";
import { watch } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

watch(locale, (newVal) => {
  ChangeUserPreferences.changeLangTo(newVal as "en" | "pt");
});
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 12px;
}
.select-language {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #24242d;
  background: transparent;
  cursor: pointer;
}
</style>
