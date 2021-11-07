<template>
  <p class="mb-0 tabular-nums w-full text-center p-8 rounded-full" :class="{ 'pointer-events-none': !inCurrentMonth, 'hover:bg-gray-200 cursor-pointer': inCurrentMonth }" @click="$emit('click', date)">
    <span v-if="inCurrentMonth">{{ lightFormat(date, 'd') }}</span>
  </p>
</template>

<script setup>
import { lightFormat, getMonth } from 'date-fns'
import { computed } from 'vue'

const props = defineProps({
  date: Object,
  month: Number
})

const inCurrentMonth = computed(() => getMonth(props.date) === props.month)
</script>
