<template>
  <div class="fixed top-4 right-4 z-50">
    <div 
      :class="[
        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300',
        serverStatus === 'online' ? 'bg-green-100 text-green-800 border border-green-200' :
        serverStatus === 'offline' ? 'bg-red-100 text-red-800 border border-red-200' :
        'bg-yellow-100 text-yellow-800 border border-yellow-200'
      ]"
    >
      <!-- Status Indicator Dot -->
      <div 
        :class="[
          'w-2 h-2 rounded-full transition-all duration-300',
          serverStatus === 'online' ? 'bg-green-500 animate-pulse' :
          serverStatus === 'offline' ? 'bg-red-500' :
          'bg-yellow-500 animate-spin'
        ]"
      ></div>
      
      <!-- Status Text -->
      <span>
        {{ statusText }}
      </span>
      
      <!-- Refresh Button -->
      <button 
        @click="checkServerStatus"
        :disabled="checking"
        class="ml-1 p-1 rounded hover:bg-white/50 transition-colors"
        title="Check server status"
      >
        <svg 
          :class="['w-3 h-3', checking ? 'animate-spin' : '']" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const serverStatus = ref('checking') // 'online', 'offline', 'checking'
const checking = ref(false)

const statusText = computed(() => {
  switch (serverStatus.value) {
    case 'online': return 'Server Online'
    case 'offline': return 'Server Offline'
    case 'checking': return 'Checking...'
    default: return 'Unknown'
  }
})

const checkServerStatus = async () => {
  checking.value = true
  serverStatus.value = 'checking'
  
  try {
    // Try to reach the server with a simple health check
    const response = await axios.get('/api/health', { 
      timeout: 3000 
    })
    serverStatus.value = 'online'
  } catch (error) {
    serverStatus.value = 'offline'
    console.log('Server check failed:', error.message)
  } finally {
    checking.value = false
  }
}

// Check server status on component mount
onMounted(() => {
  checkServerStatus()
  
  // Check server status every 30 seconds
  setInterval(checkServerStatus, 30000)
})
</script>
