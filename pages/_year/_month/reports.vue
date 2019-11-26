<template>
  <div class="container mx-auto py-4 px-4 bg-white">
    <div class="md:flex md:flex-wrap">
      <div class="md:w-1/2 lg:w-1/4 mb-2 px-2">
        <div class="bg-blue-600 text-white rounded p-4">
          <div class="text-small">{{ $t('Date') }}</div>
          <div class="text-4xl font-bold">
            {{ $store.state.reports.date.year }}
            -
            {{ $store.state.reports.date.month }}
          </div>
        </div>
      </div>

      <div class="md:w-1/2 lg:w-1/4 mb-2 px-2">
        <div class="bg-green-500 text-white rounded p-4">
          <div class="text-small">{{ $t('Total Income') }}</div>
          <div class="text-4xl font-bold">
            {{ numberWithCommas($store.state.reports.total.income) }} &euro;
          </div>
        </div>
      </div>

      <div class="md:w-1/2 lg:w-1/4 mb-2 px-2">
        <div class="bg-red-400 text-white rounded p-4">
          <div class="text-small">{{ $t('Total Expense') }}</div>
          <div class="text-4xl font-bold">
            {{ numberWithCommas($store.state.reports.total.expense) }} &euro;
          </div>
        </div>
      </div>

      <div class="md:w-1/2 lg:w-1/4 mb-2 px-2">
        <div
          :class="{
            'bg-red-400': totalLeft <= 0,
            'bg-green-500': totalLeft > 0
          }"
          class="text-white rounded p-4"
        >
          <div class="text-small">{{ $t('Total Left') }}</div>
          <div class="text-4xl font-bold">
            {{ numberWithCommas(totalLeft) }} &euro;
          </div>
        </div>
      </div>
    </div>

    <h2 class="px-2 text-2xl font-bold text-gray-800 mb-4 mt-8">
      {{ $t('Income Categories') }}
    </h2>

    <div class="md:flex flex-wrap">
      <div
        v-for="(val, title) in $store.state.reports.income"
        class="md:w-1/2 lg:w-1/4 p-2"
      >
        <div class="bg-gray-200 rounded p-4 text-gray-800">
          <div class="text-small">{{ title }}</div>
          <div class="text-5xl font-bold">
            {{ numberWithCommas(val) }} &euro;
          </div>
        </div>
      </div>
    </div>

    <h2 class="px-2 text-2xl font-bold text-gray-800 mb-4 mt-8">
      {{ $t('Expense Categories') }}
    </h2>

    <div class="md:flex flex-wrap">
      <div
        v-for="(val, title) in $store.state.reports.expense"
        class="md:w-1/2 lg:w-1/4 p-2"
      >
        <div class="bg-gray-200 rounded p-4 text-gray-800">
          <div class="text-small">{{ title }}</div>
          <div class="text-5xl font-bold">
            {{ numberWithCommas(val) }} &euro;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('{year}-{month} Reports', this.$route.params)
    }
  },

  computed: {
    totalLeft() {
      return (
        this.$store.state.reports.total.income -
        this.$store.state.reports.total.expense
      )
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('reports', params)
  },

  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
