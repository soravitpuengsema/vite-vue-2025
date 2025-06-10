<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const msg = ref("")
const items = ref([
  {
    separator: true,
  },
  {
    label: "Documents",
    items: [
      {
        label: "New",
        icon: "pi pi-plus",
        shortcut: "⌘+N",
      },
      {
        label: "Search",
        icon: "pi pi-search",
        shortcut: "⌘+S",
      },
    ],
  },
  {
    label: "Profile",
    items: [
      {
        label: "Settings",
        icon: "pi pi-cog",
        shortcut: "⌘+O",
      },
      {
        label: "Messages",
        icon: "pi pi-inbox",
        badge: 2,
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        shortcut: "⌘+Q",
      },
    ],
  },
])
</script>

<template>
  <div class="flex flex-row h-screen">
    <Menu :model="items" class="h-full w-min">
      <template #start>
        <span class="inline-flex items-center gap-1 px-2 py-2">
          <span class="text-xl font-semibold">
            Signboard
            <span class="text-primary">Tax</span>
          </span>
        </span>
      </template>
      <template #submenulabel="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        </a>
      </template>
    </Menu>
    <div class="p-4">
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
    </div>
  </div>
</template>

<style scoped></style>
