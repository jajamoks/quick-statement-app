import statementFromText from '@/helpers/statement'

export const state = () => ({
  statement: null,
  categories: [],
  reports: null
})

export const mutations = {
  setStatement(state, statement) {
    state.statement = statement
  },

  setStatementCategory(state, { statementId, categoryTitle }) {
    // Update category for statement
    const statement = state.statement.find((s) => s.id === statementId)
    statement.category = categoryTitle

    // Create category if does not exist
    if (!state.categories.includes(categoryTitle)) {
      state.categories.push(categoryTitle)
    }
  },

  setReports(state, data) {
    state.reports = data
  }
}

export const actions = {
  async load(context, csvData) {
    const statement = statementFromText(csvData)

    // Store everything for the UI
    context.commit('setStatement', statement)

    // Process using API
    const { data } = await this.$axios.post('/api/analyse', { statement })
    data.forEach((entry) => {
      if (entry.category) {
        context.commit('setStatementCategory', {
          statementId: entry.id,
          categoryTitle: entry.category
        })
      }
    })
  },

  async save(context) {
    // Process using API
    const statement = context.state.statement.filter(
      ({ category }) => !!category
    )
    await this.$axios.post('/api/store', { statement })

    // Cleanup for the UI
    context.commit('setStatement', null)
  },

  async reports(context, dateParams) {
    // Get report from the API
    const { year, month } = dateParams
    const { data } = await this.$axios.get(`/api/reports/${year}/${month}`)

    // Cleanup for the UI
    context.commit('setReports', data)
  }
}
