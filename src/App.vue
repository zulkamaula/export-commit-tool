<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900 flex items-center">
          <i class="fas fa-code-branch text-blue-500 mr-3"></i>
          Git Commit Export Tool
        </h1>
        <p class="text-gray-600 mt-2">Extract dan grouping git commits, export ke Excel</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <!-- Extract Form -->
      <ExtractForm 
        @extract="handleExtract"
        :loading="loading"
      />
      
      <!-- Alerts -->
      <AlertComponent 
        v-if="alert.show"
        :type="alert.type"
        :message="alert.message"
        @close="closeAlert"
      />
      
      <!-- Results Section -->
      <ResultsSection 
        :grouped-commits="groupedCommits"
        :stats="stats"
        @export="handleExport"
        @clear="handleClear"
      />
      
      <!-- Advanced Options -->
      <AdvancedOptions 
        @process="handleManualProcess"
      />
    </main>
    
    <!-- Server Status Indicator -->
    <ServerStatus />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCommitExtractor } from './composables/useCommitExtractor'
import { useCommitProcessor } from './composables/useCommitProcessor'
import { useExcelExporter } from './composables/useExcelExporter'

import ExtractForm from './components/ExtractForm.vue'
import AlertComponent from './components/AlertComponent.vue'
import ResultsSection from './components/ResultsSection.vue'
import AdvancedOptions from './components/AdvancedOptions.vue'
import ServerStatus from './components/ServerStatus.vue'

// Composables
const { extractCommits, loading } = useCommitExtractor()
const { groupedCommits, processCommits, clearResults } = useCommitProcessor()
const { exportToExcel } = useExcelExporter()

// Reactive data
const alert = ref({
  show: false,
  type: 'info',
  message: ''
})

// Computed stats
const stats = computed(() => {
  const totalCommits = Object.keys(groupedCommits.value).reduce((total, date) => {
    return total + Object.keys(groupedCommits.value[date]).reduce((dateTotal, project) => {
      return dateTotal + groupedCommits.value[date][project].length
    }, 0)
  }, 0)
  
  const totalProjects = new Set()
  Object.keys(groupedCommits.value).forEach(date => {
    Object.keys(groupedCommits.value[date]).forEach(project => {
      totalProjects.add(project)
    })
  })
  
  return {
    totalCommits,
    totalProjects: totalProjects.size
  }
})

// Methods
const showAlert = (type, message) => {
  alert.value = { show: true, type, message }
}

const closeAlert = () => {
  alert.value.show = false
}

const handleExtract = async (formData) => {
  try {
    const result = await extractCommits(formData)
    if (result.success) {
      const { processedCount, skippedMergeCount, errorCount } = processCommits(result.output, formData.skipMergeCommits)
      
      let message = `Berhasil menambahkan ${processedCount} commits baru. Total commits: ${stats.value.totalCommits}`
      if (skippedMergeCount > 0) {
        message += ` (${skippedMergeCount} merge commits diabaikan)`
      }
      if (errorCount > 0) {
        message += ` (${errorCount} lines had errors)`
      }
      
      showAlert('success', message)
    } else {
      showAlert('error', `Error: ${result.error}`)
    }
  } catch (error) {
    showAlert('error', `Error: ${error.message}`)
  }
}

const handleManualProcess = (commitData, skipMergeCommits) => {
  const { processedCount, skippedMergeCount, errorCount } = processCommits(commitData, skipMergeCommits)
  
  let message = `Berhasil memproses ${processedCount} commits. Total commits: ${stats.value.totalCommits}`
  if (skippedMergeCount > 0) {
    message += ` (${skippedMergeCount} merge commits diabaikan)`
  }
  if (errorCount > 0) {
    message += ` (${errorCount} lines had errors)`
  }
  
  showAlert('success', message)
}

const handleExport = () => {
  exportToExcel(groupedCommits.value)
  showAlert('success', 'Excel file berhasil didownload!')
}

const handleClear = () => {
  clearResults()
  closeAlert()
}
</script>
