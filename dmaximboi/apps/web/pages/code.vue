<script setup lang="ts">
import { projects } from '~/data/site'
</script>

<template>
  <main class="page page-pad">
    <div class="wrap">
      <div class="section-eyebrow">dmaximboi.vercel.app/code</div>
      <h1 class="section-title">Projects I<br /><span style="color:var(--amber-light)">shipped to</span><br /><span class="outline">production.</span></h1>
      <p class="muted prose" style="margin:1.2rem 0">Each product is live, named, and built for a real organisation or business. I take a messy operational problem, design the data and the interface, then deploy something people can click today.</p>
      <p class="muted prose" style="margin-bottom:2.4rem">The stack is pragmatic: React or Angular on the front, Node and Express on the API, MongoDB or PostgreSQL underneath. If you hire me, this is the standard: ship, document, stay reachable, worldwide.</p>
      <div class="grid-2">
        <ProjectCard v-for="p in projects" :key="p.short" :p="p" featured />
      </div>
      <div style="margin-top:4rem">
        <div class="section-eyebrow">How I work</div>
        <h2 class="section-title">From brief to <span style="color:var(--amber-light)">browser.</span></h2>
        <div class="grid-3" style="margin-top:2rem">
          <article class="glass card lift press"><h3 class="card-title">Scope</h3><p class="muted">We agree the users, the records, and the one workflow that must not break. Vague make an app briefs wait until the outcome is named.</p></article>
          <article class="glass card lift press"><h3 class="card-title">Build</h3><p class="muted">Schema, API, auth, UI. You get something clickable early, then we tighten copy, permissions, and edge cases that only show up with real data.</p></article>
          <article class="glass card lift press"><h3 class="card-title">Ship</h3><p class="muted">Production URL, mobile behaviour, and a handover you can actually use. Maintenance is a conversation, not a disappearing act.</p></article>
        </div>
      </div>
    </div>
  </main>
</template>
