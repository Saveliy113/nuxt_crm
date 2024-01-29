<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div :class="cn('p-3 pt-0 text-xs opacity-70 italic', props.class)">
    <slot />
  </div>
</template>
