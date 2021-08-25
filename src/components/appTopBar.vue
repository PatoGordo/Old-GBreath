<template>
  <nav>
    <h1 @click="$router.push('/')" logo>GBreath</h1>

    <router-link to="/settings" v-if="$route.name === 'home'">
      <icon icon="heroicons-solid:cog" />
    </router-link>

    <a @click="$router.go(-1)" v-else>
      <icon icon="akar-icons:arrow-left" />
    </a>
  </nav>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background: #2dffc5;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
  a {
    display: grid;
    place-items: center;
    cursor: pointer;
    svg {
      width: 26px;
      height: 26px;
      color: #24242d;
      fill: #24242d;
    }
  }
}
</style>
