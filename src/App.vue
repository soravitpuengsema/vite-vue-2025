<script setup>
import { ref } from "vue"

const msg = ref("")
</script>

<template>
  <main>
    <h1>Playground</h1>
    <InputText v-model="msg" />
    <p>{{ msg }}</p>
    <Button label="Test" />
    <div class="flex flex-col gap-12">
      <div class="flex gap-6 flex-wrap">
        <div
          class="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors"
        >
          primary
        </div>
        <div
          class="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors"
        >
          highlight
        </div>
        <div
          class="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors"
        >
          box
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
