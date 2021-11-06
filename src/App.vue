<script setup>
import { getMonth, getYear, getDaysInMonth, startOfWeek, getWeeksInMonth, getDay, startOfMonth, endOfMonth, addDays, lightFormat } from 'date-fns'

const dayModel = new Date('December 1, 2021')
const month = getMonth(dayModel)
const year = getYear(dayModel)
const start = startOfMonth(dayModel)
const startDay = getDay(start)
const end = endOfMonth(dayModel)
const endDay = getDay(end)
const daysInMonth = getDaysInMonth(dayModel)
const numberOfWeeks = getWeeksInMonth(dayModel)

const monthModel = []
let dateIndex = startOfWeek(start, { weekStartsOn: 1 })

Array.from({ length: numberOfWeeks }).forEach(week => {
  const weekModel = []
  Array.from({ length: 7 }).forEach(day => {
    weekModel.push(dateIndex)
    dateIndex = addDays(dateIndex, 1)
  })

  monthModel.push(weekModel)
})

const months = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
</script>

<template>
  <main>
    <section style="max-width: 240px" class="bg-aqua-100">
    <h4 class="text-center py-8 mb-0">{{ months[month] }} {{ year }}</h4>
    <div class="grid grid-cols-7 text-12 justify-items-center py-4">
      <p class="mb-0">ma</p>
      <p class="mb-0">ti</p>
      <p class="mb-0">on</p>
      <p class="mb-0">to</p>
      <p class="mb-0">fr</p>
      <p class="mb-0">lø</p>
      <p class="mb-0">sø</p>
    </div>
    <article v-for="week in monthModel" :key="week" class="grid grid-cols-7 text-14 justify-items-center">
      <p class="mb-0 tabular-nums p-8" v-for="d in week" :key="d">
        <span v-if="getMonth(d) === month">{{ lightFormat(d, 'd') }}</span>
      </p>
    </article>
    </section>
  </main>
</template>
