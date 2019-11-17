<template>
  <table class="table table-sm table-hover table-borderless">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Rating</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="dataSet">
        <tr v-for="(data, i) in dataSet" :key="i">
          <td>
            <router-link class="now-playing" :to="`/details/${type}/${data.id}`">
              <span>{{data.title || data.name}}</span>
            </router-link>
          </td>
          <td>{{data.vote_average}}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Table',
  props: ['dataSet', 'type'],
})
export default class Table extends Vue {}
</script>

<style lang="scss" scoped>
</style>