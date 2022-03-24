<script>
import { generateWeekdays } from '../logic'

const weekdays = generateWeekdays()

export default {
  setup: () => ({ weekdays })
}
</script>

<template>
  <thead aria-hidden v-once>
    <tr class="grid grid-cols-7 text-12 justify-items-center py-4">
      <td class="mb-0" v-for="day in weekdays" :key="day">{{ day }}</td>
    </tr>
  </thead>
</template>
