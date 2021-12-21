<template>
  <div>
    <template v-if="error">
      {{ error }}
    </template>
    <ul v-else>
      <li>{{ title }}</li>
      <li>{{ isbn }}</li>
    </ul>
  </div>
</template>

<script lang="ts" src="./Book.component.ts"></script>
