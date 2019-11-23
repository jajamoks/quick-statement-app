<template>
  <div>
    <statement-row
      v-for="statement in $store.state.statement"
      :key="statement.id"
      :statement="statement"
    />

    <save-button />
  </div>
</template>

<script>
import SaveButton from '@/components/save-button'
import StatementRow from '@/components/statement-row'

export default {
  components: {
    StatementRow,
    SaveButton
  }
}
</script>
