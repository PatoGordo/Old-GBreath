<template>
  <div>
    <h2>{{ t("WelcomeTo") }} <span logo>GBreath</span></h2>

    <div class="about-app">
      <div>
        <BreathingSvg />
      </div>

      <div class="app-presentation-div">
        <p class="app-presentation">
          <strong
            ><span logo>GBreath</span> {{ t("GBreathPresentation") }}</strong
          >
        </p>
        <br />
        <p>
          <strong>{{ t("WhyIShouldPracticeBreathing") }}</strong>
          {{ t("WhyIShouldPracticeBreathingAnswer") }}
        </p>

        <button s-default-button @click="$router.push('/breathings')">
          {{ t("SeeTheBreathingTechniques") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import BreathingSvg from "@/assets/breathing.svg";

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.app-presentation {
  font-size: 18px;
}
.about-app {
  width: min(920px, 100% - 32px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  flex-wrap: wrap;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p,
    button {
      width: min(420px, 100% - 32px);
    }
    button {
      margin-top: 16px;
    }
  }
  svg {
    width: min(420px, 100%);
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}
</style>
