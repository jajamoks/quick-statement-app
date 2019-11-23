<template>
  <div class="flex flex-col sm:flex-row hover:bg-gray-100 p-2 mb-2 rounded">
    <div class="flex-shrink-0 hidden lg:flex">
      <div>
        <div class="bg-gray-600 text-gray-100 rounded px-4 py-2 text-sm">
          {{ statement.date }}
        </div>
      </div>
    </div>

    <div
      class="pr-2 lg:px-4 flex-grow text-gray-700 capitalize mb-4 md:mb-0 break-words"
    >
      {{ statement.title.toLowerCase() }}
    </div>

    <div class="flex-shrink-0 md:w-64 lg:w-1/4 flex flex-row">
      <div class="w-64">
        <category-selector :id="statement.id" v-model="statement.category" />
      </div>

      <div class="flex-shrink-0 flex flex-col w-32">
        <div
          :class="{
            'bg-red-500': statement.type === 'expense',
            'bg-green-500': statement.type === 'income'
          }"
          class="bg-red-500 text-gray-100 rounded px-4 py-2 text-right inline-block self-end"
        >
          {{ statement.amount }} &euro;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategorySelector from '@/components/category-selector'

export default {
  components: {
    CategorySelector
  },

  props: {
    statement: {
      type: Object,
      required: true
    }
  }
}
</script>
