<template>
  <div class="bg-gray-50 rounded-lg p-4">
    <h3 class="text-sm font-medium text-gray-700 mb-3">
      <i class="fas fa-filter mr-2"></i>Filter Options
    </h3>
    
    <div class="flex items-center">
      <input 
        :id="checkboxId"
        type="checkbox" 
        :checked="skipMergeCommits"
        @change="handleChange"
        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label 
        :for="checkboxId" 
        class="ml-3 text-sm text-gray-700 cursor-pointer"
      >
        Skip merge commits ("Merge pull", "Merge branch")
      </label>
    </div>
    
    <p class="text-xs text-gray-500 mt-2">
      <i class="fas fa-info-circle mr-1"></i>
      Centang untuk mengabaikan commit merge otomatis
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  skipMergeCommits: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:skipMergeCommits'])

// Generate unique ID for accessibility
const checkboxId = computed(() => `skip-merge-${Math.random().toString(36).substr(2, 9)}`)

const handleChange = (event) => {
  emit('update:skipMergeCommits', event.target.checked)
}
</script>
