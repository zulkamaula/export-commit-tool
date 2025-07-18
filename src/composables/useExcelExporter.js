import * as XLSX from 'xlsx'

export function useExcelExporter() {
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
  
  const exportToExcel = (groupedCommits) => {
    if (!groupedCommits || Object.keys(groupedCommits).length === 0) {
      alert('Tidak ada data untuk diexport!')
      return
    }
    
    const data = []
    
    // Sort dates
    const sortedDates = Object.keys(groupedCommits).sort()
    
    sortedDates.forEach(date => {
      const displayDate = formatDisplayDate(date)
      
      Object.keys(groupedCommits[date]).forEach(project => {
        const commits = groupedCommits[date][project]
        const commitText = commits.map(commit => `• ${commit}`).join('\n')
        
        data.push({
          'Waktu': displayDate,
          'Nama Proyek': project,
          'Hasil Grouping Task': `${project}\n${commitText}`
        })
      })
    })
    
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Commits')
    
    const today = new Date().toISOString().split('T')[0]
    XLSX.writeFile(workbook, `commit_export_${today}.xlsx`)
  }
  
  return {
    exportToExcel
  }
}
