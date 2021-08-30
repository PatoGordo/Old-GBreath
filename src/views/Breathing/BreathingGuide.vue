<template>
  <div v-if="!isFinished">
    <h2>
      {{ techniques[Number($route.params.id)].name[userPreferences.lang] }}
    </h2>

    <span
      ><strong>{{ repeatTimes - alreadyRun }}</strong>
      {{ t("BreathsToGo") }}.</span
    >
    <br />
    <div class="guide">
      <div class="outside">
        <div
          class="inside"
          :class="currentAnimation"
          :style="`animation-duration: ${currentAnimationDuration}s`"
        ></div>
      </div>
    </div>
    <br />
    <h3>{{ visualReturn }}</h3>

    <button
      s-default-width
      s-default-button
      @click="$router.push('/breathings')"
    >
      {{ t("ReturnAndSeeOtherBreathings") }}
    </button>
  </div>
  <div class="completed" v-else>
    <span class="svg-container" s-default-width>
      <CompleteSvg />
    </span>
    <br />
    <br />
    <h2 s-default-width>{{ t("YourBreathingSessionIsComplete") }}</h2>
    <p>{{ t("IHopeYouAreFeelingBetter") }}</p>
    <br />
    <button
      s-default-button
      s-default-width
      @click="$router.push('/breathings')"
    >
      {{ t("ReturnToSeeOtherBreathings") }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { techniques } from "@/data/breathings";
import { userPreferences } from "@/shared/user-preferences";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import CompleteSvg from "@/assets/completed.svg";

const { t } = useI18n();

let visualReturn = ref("");
let currentAnimation = ref("");
let currentAnimationDuration = ref(0);
let repeatTimes = ref(userPreferences.defaultBreathingRepeat);
let alreadyRun = ref(0);
let isFinished = ref(false);

ref(userPreferences);

const route = useRoute();

interface IBreathingStep {
  stepTime: number;
  prefixText: string;
  nextStep(): void;
}

function breathingStep({ stepTime, prefixText, nextStep }: IBreathingStep) {
  let stepTimerCounter = stepTime;
  currentAnimationDuration.value = stepTime;

  visualReturn.value = `${prefixText} ${stepTimerCounter}`;
  if (!isFinished.value) {
    if (stepTime !== 0) {
      const stepTimer = setInterval(() => {
        stepTimerCounter--;
        visualReturn.value = `${prefixText} ${stepTimerCounter}`;

        if (stepTimerCounter <= 0) {
          clearInterval(stepTimer);
          nextStep();
        }
      }, 1000);
    } else {
      nextStep();
    }
  }
}

onMounted(() => {
  startBreathing();
});

watch(
  () => alreadyRun.value,
  (val) => {
    if (val >= repeatTimes.value) {
      isFinished.value = true;
    }
  }
);

function startBreathing() {
  currentAnimation.value = "";
  breathingStep({
    stepTime: 5,
    prefixText: `${t("BreathingStartingIn")}`,
    nextStep: inhale,
  });
}

function inhale() {
  currentAnimation.value = "inhale";
  breathingStep({
    stepTime: techniques[Number(route.params.id)].steps[0],
    prefixText: `${t("InhaleFor")}`,
    nextStep: hold,
  });
}

function hold() {
  currentAnimation.value = "hold";
  breathingStep({
    stepTime: techniques[Number(route.params.id)].steps[1],
    prefixText: `${t("HoldFor")}`,
    nextStep: exhale,
  });
}

function exhale() {
  currentAnimation.value = "exhale";
  breathingStep({
    stepTime: techniques[Number(route.params.id)].steps[2],
    prefixText: `${t("ExhaleFor")}`,
    nextStep: rest,
  });
}

function rest() {
  currentAnimation.value = "";
  breathingStep({
    stepTime: techniques[Number(route.params.id)].steps[3],
    prefixText: `${t("TakeARestFor")}`,
    nextStep: inhale,
  });
  alreadyRun.value++;
}
</script>

<style lang="scss" scoped>
.completed {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  .svg-container {
    svg {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
button {
  margin-top: 16px;
}
h3:nth-child(2) {
  margin-top: 32px;
}
.outside {
  border: 16px solid #ddd;
  background: #7dcaf3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inside {
  background: #54b6eb;
  border: 0;
  border-radius: 50%;
  padding: 16px;
  font-size: large;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 250px;
  height: 250px;
  transform: scale(0.5);
  &.inhale {
    animation: inhale;
  }
  &.hold {
    animation: hold;
  }
  &.exhale {
    animation: exhale;
  }
}
@keyframes inhale {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes hold {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes exhale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
</style>
