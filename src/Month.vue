<template>
  <section style="max-width: 240px">
      <!-- FIXME - flip when moving the other way -->
      <h4 class="text-center py-8 mb-0 relative overflow-hidden flex justify-center">
        <transition :name="changedForward ? 'tab' : 'tab-back'">
          <div class="transition-all" :key="monthName">{{ monthName }} {{ year }}</div>
        </transition>
      </h4>
    <weekday-titles />
    <article v-for="week in monthModel" :key="week" class="grid grid-cols-7 text-14 justify-items-center">
      <day v-for="d in week" :key="d" :date="d" :month="month" @select="show" />
    </article>
  </section>
</template>

<script setup>
import WeekdayTitles from './WeekdayTitles.vue'
import Day from './Day.vue'
import { addMonths, getMonth, getYear, startOfWeek, getWeeksInMonth, startOfMonth, endOfMonth, addDays, lightFormat } from 'date-fns'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  displayMonth: Object
})
const month = computed(() => getMonth(props.displayMonth))
const year = computed(() => getYear(props.displayMonth))
const start = computed(() => startOfMonth(props.displayMonth))
const numberOfWeeks = computed(() => getWeeksInMonth(props.displayMonth, { weekStartsOn: 1 }))

const computeMonth = (firstOfMonth, weeksInMonth) => {
  let dateIndex = startOfWeek(firstOfMonth, { weekStartsOn: 1 })
  return Array.from({ length: weeksInMonth }, () => {
    return Array.from({ length: 7 }, () => {
      const date = dateIndex
      dateIndex = addDays(dateIndex, 1)
      return date
    })
  })
}
const changedForward = ref(false)

const monthModel = computed(() => computeMonth(start.value, numberOfWeeks.value))
const months = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
const monthName = computed(() => months[month.value])
const show = date => window.alert(date)

const getChangedForward = (curr, prev) => {
  if (curr == 11 && prev == 0) return false
  if (curr == 0 && prev == 11) return true
  return curr > prev
}
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
