<template>
  <section style="max-width: 240px">
    <h4 class="text-center py-8 mb-0 relative overflow-hidden flex justify-center">
      <transition :name="changedForward ? 'tab' : 'tab-back'">
        <div class="transition-all" :key="monthTitle">{{ monthTitle }}</div>
      </transition>
    </h4>
    <table role="grid">
      <weekday-titles />
      <tr v-for="week in monthModel" :key="week" class="grid grid-cols-7 text-14 justify-items-center">
        <day v-for="d in week" :key="d.date" :date="d.date" :month="month" @select="show" :decorations="d.decorations" />
      </tr>
    </table>
  </section>
</template>

<script setup>
import WeekdayTitles from './WeekdayTitles.vue'
import Day from './Day.vue'
import { getMonth } from 'date-fns'
import { computed, ref, watch } from 'vue'
import { computeMonth, getMonthHeading, getChangedForward } from '../logic'

const props = defineProps({
  displayMonth: Date
})

const changedForward = ref(false)

const monthModel = computed(() => computeMonth(props.displayMonth))
const monthTitle = computed(() => getMonthHeading(props.displayMonth))
const show = date => window.alert(date)

const month = computed(() => getMonth(props.displayMonth))
watch(month, (curr, prev) => {
  changedForward.value = getChangedForward(curr, prev)
})
</script>

<style>
.tab-back-enter-from,
.tab-back-leave-to,
.tab-enter-from,
.tab-leave-to {
  position: absolute;
  opacity: 0;
}
.tab-enter-from {
  transform: translateY(-100%);
}
.tab-leave-to {
  transform: translateY(100%);
}
.tab-back-enter-from {
  transform: translateY(100%);
}
.tab-back-leave-to {
  transform: translateY(-100%);
}
</style>
