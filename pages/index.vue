<template>
  <div
    class="h-screen flex flex-col items-center justify-center text-center bg-white"
  >
    <div class="mb-4">
      <img src="~assets/img/logo.png" class="mx-auto px-4" />
    </div>

    <div class="mb-4 px-4">
      <h1 class="text-2xl font-bold text-gray-800 leading-snug mb-2">
        {{ $t('Welcome to Quick Statement!') }}
      </h1>

      <h2 class="text-1xl font-semibold text-gray-800 mt-2">
        {{
          $t(
            'Upload your bank statement for this or previous month to start analysis.'
          )
        }}
      </h2>
    </div>

    <div class="mt-4">
      <button
        @click="$refs.file.click()"
        class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded inline-flex md:w-auto items-center text-xl justify-center mx-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
          width="1em"
          height="1em"
          style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          class="inline-block mr-2"
        >
          <path
            d="M10 16h4a1 1 0 0 0 1-1v-5h1.586a1 1 0 0 0 .707-1.707l-4.586-4.586a1 1 0 0 0-1.414 0L6.707 8.293A1 1 0 0 0 7.414 10H9v5a1 1 0 0 0 1 1zm-4 2h12a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2z"
            fill="currentColor"
          />
        </svg>
        {{ $t('Upload') }}
      </button>

      <button
        @click="$router.push({ name: 'reports' })"
        class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded inline-flex md:w-auto items-center text-xl justify-center mx-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
          width="1em"
          height="1em"
          style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 20 20"
          class="inline-block mr-2"
        >
          <path
            d="M20 2v16H.32c-.318 0-.416-.209-.216-.465l4.469-5.748a.526.526 0 0 1 .789-.062l1.419 1.334a.473.473 0 0 0 .747-.096l3.047-4.74a.466.466 0 0 1 .741-.09l2.171 2.096c.232.225.559.18.724-.1l5.133-7.785C19.51 2.062 19.75 2 20 2z"
            fill="currentColor"
          />
        </svg>
        {{ $t('Reports') }}
      </button>
    </div>
    <input
      ref="file"
      @change="onFileAdd($event.target.files[0])"
      type="file"
      class="invisible"
    />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('Welcome')
    }
  },

  methods: {
    // Read user uploaded file
    onFileAdd(file) {
      const reader = new FileReader()
      reader.onload = (e) => this.onFileRead(e.target.result)
      reader.readAsText(file)
    },

    // When statement file is read - load to store and redirect user to analysis page
    onFileRead(csvData) {
      this.$store.dispatch('load', csvData)
      this.$router.push({ name: 'analysis' })
    }
  }
}
</script>
