<template>
    <div class="card">
        <div class="w-full border-b pb-2 mb-8">
            <h2 class="section-title text-center">
                <i class="fas fa-pen-to-square text-blue-500 mr-3"></i>
                <span class="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    Form Extract Commits
                </span>
            </h2>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Project Path -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-folder mr-2"></i>Project Path
                    </label>
                    <input v-model="form.projectPath" type="text" class="input-field"
                        placeholder="Masukkan absolute path project (contoh: /Users/username/project)" required />
                </div>

                <!-- Author -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-user mr-2"></i>Author (Optional)
                    </label>
                    <input v-model="form.author" type="text" class="input-field"
                        placeholder="Filter by author name (kosongkan untuk semua author)" />
                </div>
            </div>

            <!-- Date Range -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-calendar mr-2"></i>Since Date
                    </label>
                    <input v-model="form.sinceDate" type="date" class="input-field" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-calendar mr-2"></i>Until Date
                    </label>
                    <input v-model="form.untilDate" type="date"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>

            <!-- Filter Options -->
            <FilterOptions v-model:skip-merge-commits="form.skipMergeCommits" />

            <!-- Submit Button -->
            <button type="submit" :disabled="loading" class="btn-primary w-full flex items-center justify-center">
                <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <i v-else class="fas fa-wand-magic-sparkles mr-2"></i>
                {{ loading ? 'Extracting...' : 'Let`s Go Extract' }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import FilterOptions from './FilterOptions.vue'

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['extract'])

const form = reactive({
    projectPath: '',
    author: '',
    sinceDate: '',
    untilDate: '',
    skipMergeCommits: true
})

// Set default dates on component mount
const setDefaultDates = () => {
    const today = new Date()
    const oneMonthAgo = new Date(today)
    oneMonthAgo.setMonth(today.getMonth() - 1)

    // Format dates as YYYY-MM-DD
    form.sinceDate = oneMonthAgo.toISOString().split('T')[0]
    form.untilDate = today.toISOString().split('T')[0]
}

onMounted(() => {
    setDefaultDates()
})

const handleSubmit = () => {
    emit('extract', { ...form })
}
</script>
