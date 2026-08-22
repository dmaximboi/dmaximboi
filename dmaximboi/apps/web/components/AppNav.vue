<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const open = ref(false)

const links = [
  { label: 'Code', to: '/code' },
  { label: 'Teach', to: '/teach' },
  { label: 'About', to: '/about' },
  { label: 'Hire', to: '/hire' },
]

function close() {
  open.value = false
}

function go(e: MouseEvent, to: string) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
    close()
    return
  }
  e.preventDefault()
  close()
  navigateTo(to).catch(() => {
    window.location.href = to
  })
}
</script>

<template>
  <header class="nav" :class="{ open }">
    <button v-show="open" class="nav-scrim" type="button" aria-label="Close menu" @click="close" />
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <a href="/" class="wordmark" aria-label="maxiM home" @click="go($event, '/')">maxi<em>M</em></a>
        <nav class="nav-links" aria-label="Primary">
          <a
            v-for="l in links"
            :key="l.to"
            :href="l.to"
            :class="{ active: route.path === l.to }"
            @click="go($event, l.to)"
          >{{ l.label }}</a>
          <a href="/hire" class="nav-cta press" @click="go($event, '/hire')">Hire Me</a>
        </nav>
        <button class="nav-toggle press" type="button" aria-label="Menu" :aria-expanded="open" @click="open = !open">
          <X v-if="open" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </div>
  </header>
</template>
