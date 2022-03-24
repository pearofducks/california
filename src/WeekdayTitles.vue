<script>
import { format } from 'date-fns'
import { nb } from 'date-fns/locale'

const d = new Date
// programatically get days from Monday to Sunday
const weekdays = Array.from({ length: 7 }).map((_, i) => {
  const day = new Date(d.setDate(d.getDate() - d.getDay() + 1 + i))
  return format(day, 'cccccc', { locale: nb })
})

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
