<template>
  <td>
  <button :class="buttonClasses" @click="$emit('select', date)">
    <span v-if="inCurrentMonth">{{ lightFormat(date, 'd') }}</span>
  </button>
      </td>
</template>

<script setup>
import { format, lightFormat, getMonth } from 'date-fns'
import { nb } from 'date-fns/locale'
import { computed } from 'vue'

const props = defineProps({
  date: Date,
  month: Number,
  decorations: { type: Object, default: () => ({}) }
})
const decorations = computed(() => Object.entries(props.decorations).filter(([_, v]) => v).map(([k]) => k))

const inCurrentMonth = computed(() => getMonth(props.date) === props.month)
const buttonClasses = computed(() => ({
  ['mb-0 tabular-nums w-full text-center p-8 rounded-full']: true,
  ['pointer-events-none']: !inCurrentMonth.value,
  ['hover:bg-gray-200 focus-ring cursor-pointer']: inCurrentMonth.value,
  [decorations.value]: true
}))
</script>
