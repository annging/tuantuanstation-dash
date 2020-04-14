<template>
  <activity-editor :is-edit="false" />
</template>

<script>
import ActivityEditor from './components/ActivityEditor'

export default {
  name: 'hdCreate',
  components: { ActivityEditor }
}
</script>

