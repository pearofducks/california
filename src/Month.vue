<template>
  <section style="max-width: 240px">
    <h4 class="text-center py-8 mb-0">{{ months[month] }} {{ year }}</h4>
    <weekday-titles />
    <article v-for="week in monthModel" :key="week" class="grid grid-cols-7 text-14 justify-items-center">
      <p class="mb-0 tabular-nums w-full text-center p-8 transition-all rounded-full hover:bg-gray-200 cursor-pointer" v-for="d in week" :key="d" @click="show(d)">
        <span v-if="getMonth(d) === month">{{ lightFormat(d, 'd') }}</span>
      </p>
    </article>
  </section>
</template>

<script setup>
import WeekdayTitles from './WeekdayTitles.vue'
import { addMonths, getMonth, getYear, startOfWeek, getWeeksInMonth, startOfMonth, endOfMonth, addDays, lightFormat } from 'date-fns'
import { computed } from 'vue'

const props = defineProps({
  displayMonth: Object
})
const month = computed(() => getMonth(props.displayMonth))
const year = computed(() => getYear(props.displayMonth))
const start = computed(() => startOfMonth(props.displayMonth))
const numberOfWeeks = computed(() => getWeeksInMonth(props.displayMonth))

const computeMonth = (firstOfMonth, weeksInMonth) => {
  let dateIndex = startOfWeek(firstOfMonth, { weekStartsOn: 1 })
  return Array.from({ length: weeksInMonth }, (week = []) => {
    Array.from({ length: 7 }, _ => {
      week.push(dateIndex)
      dateIndex = addDays(dateIndex, 1)
    })

    return week
  })
}

const monthModel = computed(() => computeMonth(start.value, numberOfWeeks.value))
const months = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
const show = date => window.alert(date)
</script>
