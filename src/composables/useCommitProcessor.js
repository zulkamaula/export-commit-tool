import { ref } from 'vue'

export function useCommitProcessor() {
  const groupedCommits = ref({})
  
  const normalizeDate = (dateStr) => {
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) return null
      return date.toISOString().split('T')[0]
    } catch {
      return null
    }
  }
  
  const processCommits = (commitData, skipMergeCommits = true) => {
    if (!commitData || !commitData.trim()) {
      return { processedCount: 0, skippedMergeCount: 0, errorCount: 0 }
    }
    
    const lines = commitData.split('\n')
    let processedCount = 0
    let errorCount = 0
    let skippedMergeCount = 0
    
    lines.forEach((line, index) => {
      if (!line.trim()) return
      
      let parts
      const lineNumber = index + 1
      
      // Try tab-separated first
      if (line.includes('\t')) {
        parts = line.split('\t')
      } else if (line.includes('  ')) {
        // Multiple spaces
        parts = line.split(/\s{2,}/)
      } else {
        // Regex pattern for date project message
        const match = line.match(/^(\d{4}-\d{2}-\d{2})\s+(.+?)\s+(.+)$/)
        if (match) {
          parts = [match[1], match[2], match[3]]
        } else {
          console.warn(`Line ${lineNumber}: Could not parse - ${line}`)
          errorCount++
          return
        }
      }
      
      if (parts.length < 3) {
        console.warn(`Line ${lineNumber}: Invalid format - ${line}`)
        errorCount++
        return
      }
      
      const [rawDate, projectName, commitMessage] = parts
      const date = normalizeDate(rawDate.trim())
      
      if (!date) {
        console.warn(`Line ${lineNumber}: Invalid date format - ${rawDate}`)
        errorCount++
        return
      }
      
      // Skip merge commits (if option is enabled)
      const message = commitMessage.trim()
      if (skipMergeCommits && (message.startsWith('Merge pull') || message.startsWith('Merge branch'))) {
        console.log(`Skipping merge commit: ${message}`)
        skippedMergeCount++
        return
      }
      
      // Group by date and project
      if (!groupedCommits.value[date]) {
        groupedCommits.value[date] = {}
      }
      if (!groupedCommits.value[date][projectName]) {
        groupedCommits.value[date][projectName] = []
      }
      groupedCommits.value[date][projectName].push(message)
      processedCount++
    })
    
    return { processedCount, skippedMergeCount, errorCount }
  }
  
  const clearResults = () => {
    groupedCommits.value = {}
  }
  
  return {
    groupedCommits,
    processCommits,
    clearResults
  }
}
