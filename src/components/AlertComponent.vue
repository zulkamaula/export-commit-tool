<template>
  <div 
    :class="alertClasses"
    class="rounded-lg p-4 flex items-center space-x-3 shadow-md"
  >
    <div class="flex-shrink-0">
      <i :class="iconClasses" class="text-lg"></i>
    </div>
    
    <div class="flex-1">
      <p class="text-sm font-medium" v-html="message"></p>
    </div>
    
    <button 
      @click="$emit('close')"
      class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  message: {
    type: String,
    required: true
  }
})

defineEmits(['close'])

const alertClasses = computed(() => {
  const baseClasses = 'border-l-4'
  const typeClasses = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800'
  }
  return `${baseClasses} ${typeClasses[props.type]}`
})

const iconClasses = computed(() => {
  const icons = {
    success: 'fas fa-check-circle text-green-500',
    error: 'fas fa-exclamation-circle text-red-500',
    warning: 'fas fa-exclamation-triangle text-yellow-500',
    info: 'fas fa-info-circle text-blue-500'
  }
  return icons[props.type]
})
</script>
