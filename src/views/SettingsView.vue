<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

const setSeconds = (sec: number) => {
  window.localStorage.setItem('settings', String(sec))
  router.push('/main')
}
const toMinutes = (second: number) => {
  let min = Math.floor(second / 60)
  let sec = String(second % 60).padStart(2, '0')
  return `${min}:${sec}`
}
const timeSettings = ref([
  {
    second: 60,
  },
  {
    second: 180,
  },
  {
    second: 300,
  },
  {
    second: 480,
  },
])
</script>

<template>
  <div class="settings">
    <ul class="settings__list list">
      <li class="list__item" v-for="{ second } in timeSettings" :key="second" @click="setSeconds(second)">
        {{ `${toMinutes(second)} minuts` }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles';

.settings {
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &__list {
  }
}
//TODO: decomposition styles
.list {
  background-color: $color-blue;
  list-style: none;
  margin: auto;
  width: 350px;
  padding: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-radius: 3px;
  margin: 10px;
  &::before {
    box-shadow: -3px 3px 5px #78adce;
    content: '';
    width: 100%;
    position: absolute;
    inset: 0;
    height: 100%;
    z-index: -10000;
  }
  &::after {
    box-shadow: 3px -3px 5px #ad863c;
    content: '';
    width: 100%;
    position: absolute;
    inset: 0;
    z-index: -10000;
  }
  &__item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: $cell-black;
    color: $available-cell;
    margin-top: 7px;
    border-radius: 7px;
    cursor: pointer;
    padding: 10px;
    margin: 5px;
    height: 30px;
    width: 100px;
    &:hover {
      background-color: $available-cell;
      color: $color-white;
    }
  }
}
</style>
