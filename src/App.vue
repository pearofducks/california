<script setup>
import Month from './Month.vue'
import { addMonths, isBefore } from 'date-fns'
import { ref, computed } from 'vue'

const dayModel = ref(new Date())
const nextDayModel = computed(() => addMonths(dayModel.value, 1))
const prevMonth = () => {
  dayModel.value = addMonths(dayModel.value, -1)
}
const nextMonth = () => {
  dayModel.value = addMonths(dayModel.value, 1)
}
const opts = {
  disabledFunction: d => isBefore(d, new Date)
}
</script>

<template>
  <main>
    <button @click="prevMonth">Prev month</button>
    •
    <button @click="nextMonth">Next month</button>
    <div class="flex gap-32">
    <month :display-month="dayModel" :options="opts" />
    <month :display-month="nextDayModel" :options="opts" />
    </div>
  </main>
</template>
