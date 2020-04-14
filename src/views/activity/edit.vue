<template>
  <activity-editor :is-edit="true" />
</template>

<script>
import ActivityEditor from './components/ActivityEditor'

export default {
  name: 'hdEdit',
  components: { ActivityEditor }
}
</script>

