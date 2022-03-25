<template>
  <td class="w-full" :class="buttonClasses" :aria-label="ariaLabel">
    <button @click="$emit('select', date)">
      <span v-if="inCurrentMonth">{{ getDateLabel(date) }}</span>
    </button>
  </td>
</template>

<script setup>
import { getDateLabel, getDateAria } from '../logic'
import { computed } from 'vue'

const props = defineProps({
  date: Date,
  month: Number,
  decorations: { type: Object, default: () => ({}) }
})
const decorations = computed(() => Object.entries(props.decorations).filter(([_, v]) => v).map(([k]) => k))
const ariaLabel = computed(() => getDateAria(props.date))

const inCurrentMonth = computed(() => props.date.getMonth() === props.month)
const buttonClasses = computed(() => ({
  ['mb-0 tabular-nums w-full text-center p-8 rounded-full']: true,
  ['pointer-events-none']: !inCurrentMonth.value,
  ['hover:bg-gray-200 focus-ring cursor-pointer']: inCurrentMonth.value,
  [decorations.value]: true
}))
</script>
