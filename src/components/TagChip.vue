<script setup lang="ts">
defineProps<{
  name: string
  count?: number
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <router-link
    :to="`/?tag=${name}`"
    :class="['tag-chip', `tag-${size || 'md'}`]"
  >
    #{{ name }}
    <span v-if="count !== undefined" class="tag-count">{{ count }}</span>
  </router-link>
</template>

<style scoped>
.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: var(--text-secondary);
  background: var(--bg-muted);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag-chip:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-bg);
}

.tag-sm {
  padding: 3px 12px;
  font-size: 0.78rem;
}

.tag-md {
  padding: 6px 16px;
  font-size: 0.88rem;
}

.tag-lg {
  padding: 8px 20px;
  font-size: 1rem;
}

.tag-count {
  background: var(--border);
  font-size: 0.75em;
  padding: 1px 7px;
  border-radius: 10px;
  font-weight: 600;
  color: var(--text-tertiary);
}

.tag-chip:hover .tag-count {
  background: var(--accent);
  color: white;
}
</style>
