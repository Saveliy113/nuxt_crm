<template>
  <div class="mb-3">
    <label v-if="labelText" class="opacity-75 mb-0.5 block text-xs">
      {{ labelText }}
    </label>

    <div class="text-base"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  labelText: {
    type: String,
    default: '',
  },
});
</script>
