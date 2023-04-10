<template>
  <div>History Of The Shift</div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { Timekeeping } from '~/types'

defineProps<{
  shift: Timekeeping
}>()

// const { result } = useQuery(
//   gql`
//     query TimekeepingHistory {

//     }
//   `
// )
</script>

<style scoped></style>
