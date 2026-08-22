<script setup lang="ts">
const enabled = ref(false)
const dot = ref({ x: 0, y: 0 })
const ring = ref({ x: 0, y: 0, hover: false })
let raf = 0

onMounted(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  enabled.value = fine
  if (fine) document.body.classList.add('has-cursor')
  if (!fine) return
  const onMove = (e: MouseEvent) => { dot.value = { x: e.clientX, y: e.clientY } }
  const tick = () => {
    ring.value.x += (dot.value.x - ring.value.x) * 0.14
    ring.value.y += (dot.value.y - ring.value.y) * 0.14
    raf = requestAnimationFrame(tick)
  }
  const onOver = (e: Event) => {
    const el = e.target as HTMLElement
    ring.value.hover = !!el.closest('a,button,input,select,textarea,.press,.lift,.nav-toggle')
  }
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseover', onOver)
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  document.body.classList.remove('has-cursor')
})
</script>

<template>
  <div v-if="enabled" class="custom-cursor" aria-hidden="true">
    <div class="cursor-ring" :class="{ hover: ring.hover }" :style="{ left: ring.x + 'px', top: ring.y + 'px' }" />
    <div class="cursor-dot" :style="{ left: dot.x + 'px', top: dot.y + 'px' }" />
  </div>
</template>
