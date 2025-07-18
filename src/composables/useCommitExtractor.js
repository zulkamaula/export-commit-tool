import { ref } from 'vue'
import axios from 'axios'

export function useCommitExtractor() {
  const loading = ref(false)
  
  const extractCommits = async (formData) => {
    loading.value = true
    
    try {
      const response = await axios.post('/api/execute-git', {
        projectPath: formData.projectPath,
        authorName: formData.author || 'all',
        sinceDate: formData.sinceDate || '1970-01-01',
        untilDate: formData.untilDate
      })
      
      return response.data
    } catch (error) {
      console.error('Extract error:', error)
      console.error('Error response:', error.response?.data)
      console.error('Error status:', error.response?.status)
      throw error
    } finally {
      loading.value = false
    }
  }
  
  return {
    loading,
    extractCommits
  }
}
