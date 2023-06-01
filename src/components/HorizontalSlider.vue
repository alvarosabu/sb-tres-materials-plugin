<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  min: number
  max: number
  step: number
  modelValue: number | string
  filledColor?: string
  emptyColor?: string
  thumbColor?: string
}>()

const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

const emitValue = () => {
  emit('update:modelValue', value)
}

const sliderFilledStyle = computed(() => ({
  backgroundImage: `linear-gradient(to right,${props.filledColor || '#40C6C4'} 0% ${
    (100 * ((value.value as number) - props.min)) / (props.max - props.min)
  }%, ${props.emptyColor || '#e2e2e2'} 0%)`,
}))

const sliderEmptyStyle = computed(() => ({
  '::-webkit-slider-thumb': {
    backgroundColor: props.thumbColor || 'red',
    borderColor: props.thumbColor || 'red',
  },
}))
</script>
<template>
  <div class="relative">
    <input
      class="w-full h-1.5 bg-gray-300 rounded-full appearance-none"
      :class="[sliderEmptyStyle]"
      :style="sliderFilledStyle"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="value"
      @input="emitValue"
    />
    <div class="flex justify-between mt-1 mb-4 text-xl font-bold text-gray-400">
      <span>{{ min }}</span>
      <span>{{ max }}</span>
    </div>
  </div>
</template>

<style scoped>
input[type='range'] {
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type='range']::-webkit-slider-thumb {
  @apply h-4 w-4 border-2 bg-primary rounded-full cursor-pointer appearance-none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type='range']::-moz-range-thumb {
  @apply h-4 w-4 border-2 bg-primary rounded-full cursor-pointer appearance-none;
  -moz-appearance: none;
}
</style>
