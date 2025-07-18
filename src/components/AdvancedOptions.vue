<template>
  <div class="card">
    <!-- Collapsible Header -->
    <div 
      @click="toggleCollapse"
      class="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-6 p-6 rounded-xl transition-colors"
    >
      <h2 class="section-title mb-0">
        <i class="fas fa-cogs text-purple-500 mr-3"></i>
        <span class="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Advanced Options & Troubleshooting
        </span>
      </h2>
      <i 
        :class="{ 'rotate-180': isExpanded }"
        class="fas fa-chevron-down transform transition-transform duration-200 text-gray-500"
      ></i>
    </div>
    
    <!-- Collapsible Content -->
    <div 
      v-if="isExpanded"
      class="mt-6 pt-6 border-t border-gray-200 space-y-4"
    >
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div class="flex items-start space-x-2">
          <i class="fas fa-info-circle text-yellow-600 mt-0.5"></i>
          <div class="text-sm text-yellow-800">
            <p class="font-medium mb-1">Manual Input (Fallback)</p>
            <p>Gunakan opsi ini jika automatic extraction tidak bekerja. Paste raw git log output di bawah ini.</p>
          </div>
        </div>
      </div>
      
      <!-- Manual Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          <i class="fas fa-edit mr-2"></i>Commit Data (Manual Input)
        </label>
        <textarea 
          v-model="manualInput"
          class="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          placeholder="Paste git log output here...
Format: YYYY-MM-DD    ProjectName    CommitMessage
Example:
2024-01-15    my-project    Add new feature
2024-01-15    my-project    Fix bug in login"
        ></textarea>
      </div>
      
      <!-- Filter Options for Manual -->
      <FilterOptions 
        v-model:skip-merge-commits="skipMergeCommits"
      />
      
      <!-- Process Button -->
      <button 
        @click="handleProcess"
        :disabled="!manualInput.trim()"
        class="btn-primary w-full"
      >
        <i class="fas fa-cogs mr-2"></i>Process Manual Input
      </button>
      
      <!-- Help Text -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-start space-x-2">
          <i class="fas fa-lightbulb text-blue-600 mt-0.5"></i>
          <div class="text-sm text-blue-800">
            <p class="font-medium mb-2">Git Command Examples:</p>
            <code class="block bg-white p-2 rounded text-xs mb-2">
              git log --pretty=format:"%ad%x09%s" --date=short --since="2024-01-01"
            </code>
            <code class="block bg-white p-2 rounded text-xs">
              git log --pretty=format:"%ad    MyProject    %s" --date=short --author="YourName"
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FilterOptions from './FilterOptions.vue'

const emit = defineEmits(['process'])

const isExpanded = ref(false)
const manualInput = ref('')
const skipMergeCommits = ref(true)

const toggleCollapse = () => {
  isExpanded.value = !isExpanded.value
}

const handleProcess = () => {
  if (manualInput.value.trim()) {
    emit('process', manualInput.value, skipMergeCommits.value)
    manualInput.value = ''
  }
}
</script>
