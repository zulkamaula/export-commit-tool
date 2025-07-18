<template>
  <div v-if="hasResults" class="space-y-6">
    <!-- Stats Badge -->
    <div class="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-6 shadow-lg">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold mb-2">
            <i class="fas fa-chart-bar mr-2"></i>Hasil Grouping
          </h3>
          <p class="text-white">
            <span class="font-bold text-2xl">{{ stats.totalCommits }}</span> commits dari 
            <span class="font-bold text-2xl">{{ stats.totalProjects }}</span> projects
          </p>
        </div>
        <div class="flex text-right space-x-3">
          <button 
            @click="$emit('export')"
            class="bg-white text-green-600 hover:bg-green-50 text-sm font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <i class="fas fa-download mr-2"></i>Export Excel
          </button>
          
          <button 
            @click="$emit('clear')"
            class="bg-white text-red-600 hover:bg-red-50 text-sm font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <i class="fas fa-trash mr-2"></i>Clear Results
          </button>
        </div>
      </div>
    </div>
    
    <!-- Grouped Results -->
    <div class="card">
      <div class="space-y-6 max-h-[500px] overflow-auto">
        <div 
          v-for="date in sortedDates" 
          :key="date"
          class="border border-gray-200 rounded-lg p-3"
        >
          <!-- Date Header -->
          <div class="bg-gray-50 -m-3 p-3 mb-4 rounded-t-lg group">
            <h3 class="text-lg text-slate-500 font-semibold flex items-center">
              <i class="fas fa-calendar mr-2"></i>
              {{ formatDisplayDate(date) }}

              <button 
                @click="copyDateGroup(date, groupedCommits[date])"
                class="ml-auto opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition-all duration-200 py-2 px-4 rounded hover:bg-blue-50"
                title="Copy all commits for this date"
              >
                <i class="fas fa-copy text-sm"></i>
              </button>
            </h3>
          </div>
          
          <!-- Projects for this date -->
          <div class="space-y-4">
            <div 
              v-for="project in Object.keys(groupedCommits[date])" 
              :key="project"
              class="bg-white border border-gray-100 rounded-lg p-4"
            >
              <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                <i class="fas fa-folder text-yellow-500 mr-2"></i>
                {{ project }}
                <span class="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {{ groupedCommits[date][project].length }} commits
                </span>
              </h4>
              
              <ul class="space-y-2">
                <li 
                  v-for="(commit, index) in groupedCommits[date][project]" 
                  :key="index"
                  class="flex items-start space-x-2 text-sm text-gray-700"
                >
                  <i class="fas fa-dot-circle text-green-500 mt-0.5 text-xs"></i>
                  <span>{{ commit }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Copy Notification -->
    <div 
      v-if="copyNotification"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in"
    >
      <div class="flex items-center space-x-2">
        <i class="fas fa-check-circle"></i>
        <span class="text-sm">Copied: {{ copyNotification.substring(0, 50) }}...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  groupedCommits: {
    type: Object,
    default: () => ({})
  },
  stats: {
    type: Object,
    default: () => ({ totalCommits: 0, totalProjects: 0 })
  }
})

const emit = defineEmits(['export', 'clear'])

// Copy notification state
const copyNotification = ref(null)

const hasResults = computed(() => {
  return Object.keys(props.groupedCommits).length > 0
})

const sortedDates = computed(() => {
  return Object.keys(props.groupedCommits).sort()
})

const formatDisplayDate = (isoDate) => {
  const date = new Date(isoDate)
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Asia/Jakarta'
  }
  return date.toLocaleDateString('id-ID', options)
}

// Copy date group commits function
const copyDateGroup = async (date, projectsData) => {
  try {
    const formattedDate = formatDisplayDate(date)
    
    // Format: [Date] \n
    // Project1:\n
    // - Commit 1\n
    // - Commit 2\n
    // Project2:\n
    // - Commit 3
    let formattedText = `[${formattedDate}] \n`
    
    // Count total commits
    let totalCommits = 0
    
    // Add each project and its commits
    Object.keys(projectsData).forEach(project => {
      const commits = projectsData[project]
      totalCommits += commits.length
      
      formattedText += `${project}:\n`
      commits.forEach(commit => {
        formattedText += `- ${commit}\n`
      })
    })
    
    await navigator.clipboard.writeText(formattedText)
    
    // Show temporary notification
    copyNotification.value = `${Object.keys(projectsData).length} projects, ${totalCommits} commits`
    setTimeout(() => {
      copyNotification.value = null
    }, 2000)
    
    console.log('\u2705 Copied date group commits:', formattedText)
  } catch (error) {
    console.error('\u274c Failed to copy:', error)
    // Fallback for older browsers
    const formattedDate = formatDisplayDate(date)
    let formattedText = `[${formattedDate}] \n`
    
    let totalCommits = 0
    Object.keys(projectsData).forEach(project => {
      const commits = projectsData[project]
      totalCommits += commits.length
      
      formattedText += `${project}:\n`
      commits.forEach(commit => {
        formattedText += `- ${commit}\n`
      })
    })
    
    const textArea = document.createElement('textarea')
    textArea.value = formattedText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    copyNotification.value = `${Object.keys(projectsData).length} projects, ${totalCommits} commits`
    setTimeout(() => {
      copyNotification.value = null
    }, 2000)
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
