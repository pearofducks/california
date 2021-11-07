<template>
  <button :class="buttonClasses" @click="$emit('select', date)">
    <span v-if="inCurrentMonth">{{ lightFormat(date, 'd') }}</span>
  </button>
</template>

<script setup>
import { lightFormat, getMonth } from 'date-fns'
import { computed } from 'vue'

const props = defineProps({ date: Date, month: Number })

const inCurrentMonth = computed(() => getMonth(props.date) === props.month)
const buttonClasses = computed(() => ({
  ['mb-0 tabular-nums w-full text-center p-8 rounded-full']: true,
  ['pointer-events-none']: !inCurrentMonth,
  ['hover:bg-gray-200 focus-ring cursor-pointer']: inCurrentMonth
}))
</script>
