<script setup lang="ts">
defineProps<{
  p: {
    name: string
    short: string
    tag: string
    url: string
    c: string
    a: string
    d: string
    long: string
    points?: string[]
  }
  featured?: boolean
}>()
</script>

<template>
  <a class="glass lift press project-card" :href="p.url" target="_blank" rel="noopener noreferrer">
    <div class="project-media" :style="{ background: `linear-gradient(135deg, ${p.c}, ${p.a})` }">
      <div class="scan" />
      <div class="watermark">{{ p.short }}</div>
      <span class="url-chip">{{ p.url.replace('https://', '') }}</span>
    </div>
    <div class="project-body">
      <div class="stat-label" style="color:var(--amber)">{{ p.tag }}</div>
      <h3 class="card-title">{{ p.name }}</h3>
      <p class="muted">{{ featured ? p.long : p.d }}</p>
      <ul v-if="featured && p.points" class="muted project-points">
        <li v-for="x in p.points" :key="x">{{ x }}</li>
      </ul>
      <span class="mini-link">Visit live site</span>
    </div>
  </a>
</template>
