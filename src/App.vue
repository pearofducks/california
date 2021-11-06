<script setup>
import Month from './Month.vue'
import { addMonths } from 'date-fns'
import { ref } from 'vue'

const dayModel = ref(new Date('December 31, 2021'))
const prevMonth = () => {
  dayModel.value = addMonths(dayModel.value, -1)
}
const nextMonth = () => {
  dayModel.value = addMonths(dayModel.value, 1)
}
</script>

<template>
  <main>
    <button @click="prevMonth">Prev month</button>
    •
    <button @click="nextMonth">Next month</button>
    <month :display-month="dayModel" />
  </main>
</template>
