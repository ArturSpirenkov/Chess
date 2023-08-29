<script setup lang="ts">
import type { Player } from '@/models/Player';
import { watch, computed } from 'vue';
import usePlayersTimer from '../hooks/usePlayersTimer';
import { Colors } from '@/models/Colors';

interface PlayerBoardProps {
  currentPlayer: Player | null
  restart: () => void
}

const props = defineProps<PlayerBoardProps>()
const player = computed((): Player | null => props.currentPlayer)
const { startTimer, restartTimer, whiteTime, blackTime } = usePlayersTimer(player)

watch(() => props.currentPlayer, () => {
  startTimer()
})

const handleRestart = () => {
  restartTimer()
  props.restart()
}
</script>

<template>
  <div>
    <div class="player-board">
      <div :class="['player-board__black-player', 'black-player', { 'black-player_selected': currentPlayer?.color === Colors.BLACK }]">
        <span class="black-player__time">{{ `${blackTime.min} : ${blackTime.sec}`}}</span>
      </div>
      <div class="restart-time" @click="handleRestart">
        <button  class="restart-time__btn">Restart game</button>
      </div>
      <div :class="['player-board__white-player', 'white-player', {'white-player_selected': currentPlayer?.color === Colors.WHITE}]">
        <span class="white-player__time">{{ `${whiteTime.min} : ${whiteTime.sec}`}}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/styles/mixin.scss';

.player-board {
  color: azure;
  width: 70%;
  height: 650px;
  display: flex;
  flex-direction: column;
  max-width: 250px;
  position: relative;
  font-size: 30px;

  &__white-player {
    @include player;
    border-radius: 0 0 10px 10px;
  }
  &__black-player {
    @include player;
    border-radius: 10px 10px 0 0;
  }
}

.restart-time {
  width: 70px;
  height: 70px;
  position: absolute;
  background-image: linear-gradient(to right top, #004763, #004e6d, #005576, #005c80, #01638a);
  top: calc(50% - 35px);
  left: calc(50% - 35px);
  rotate: 45deg;
  border-radius: 7px;
  box-shadow: 3px 3px 6px #7e8c93;
  cursor: pointer;
  &__btn {
    background: none;
    border: none;
    height: 100%;
    rotate: -45deg;
    color: aliceblue;
    font-size: 16px;
    font-weight: 500;
  }
}
.white-player {
  &__time {
  }
  &_selected {
    @include player-selected 
  }
}
.black-player {
  &__time {
  }
  &_selected {
    @include player-selected 
  }
}
</style>
