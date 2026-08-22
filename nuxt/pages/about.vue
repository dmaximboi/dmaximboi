<script setup lang="ts">
import { contact, personal, timeline } from '~/data/site'
</script>

<template>
  <main class="page page-pad">
    <div class="wrap">
      <div class="about-hero">
        <div>
          <div class="section-eyebrow">dmaximboi.vercel.app/about</div>
          <h1 class="section-title">The person<br /><span style="color:var(--amber-light)">behind</span><br /><span class="outline">the screen.</span></h1>
          <p class="muted" style="margin-top:1.2rem">I am Adewuyi Ayuba Opeyemi. AO Adewuyi. Online I go by maxiM, handle dmaximboi. Chemistry graduate (2025), full stack developer, and STEM educator. Open to work worldwide.</p>
          <p class="muted" style="margin-top:1rem">Chemistry trained me to care about what actually happens in a system, not what the slide says should happen. That is how I write software: inputs, reactions, side products, and a result you can measure. Teaching keeps me honest. If I cannot explain it, I do not ship it.</p>
          <p class="muted" style="margin-top:1rem">I take freelance product work and tutoring in parallel. Schools, labs, fashion, business platforms. The industries differ, the standard does not: live URL, mobile that works, and a human who answers when something breaks. Remote or on site, anywhere.</p>
          <div class="actions" style="margin-top:1.8rem">
            <a href="/hire" class="btn-amber press">Hire Me</a>
            <a class="btn-ghost press" :href="contact.whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div class="glass-bright about-photo">
          <img :src="personal.photo" :alt="personal.fullName" />
          <div class="photo-fade" />
        </div>
      </div>
      <div style="margin-top:4rem">
        <div class="section-eyebrow">Values</div>
        <h2 class="section-title">How I <span style="color:var(--amber-light)">work.</span></h2>
        <div class="grid-3" style="margin-top:2rem">
          <article class="glass card lift press"><div class="stat-label" style="color:var(--amber)">01</div><h3 class="card-title">Precision</h3><p class="muted">Chemistry trained me to care about accuracy. Every function, every component, built to do exactly what it should, and to fail loudly when it cannot.</p></article>
          <article class="glass card lift press"><div class="stat-label" style="color:var(--amber)">02</div><h3 class="card-title">Clarity</h3><p class="muted">I teach complex ideas simply. That same instinct drives how I write code, name fields, and talk to clients who are not engineers.</p></article>
          <article class="glass card lift press"><div class="stat-label" style="color:var(--amber)">03</div><h3 class="card-title">Delivery</h3><p class="muted">Ideas without shipping are just thoughts. Every project I take on ends with something live, usable, and owned by the person who paid for it.</p></article>
        </div>
      </div>
      <div style="margin-top:4rem">
        <div class="section-eyebrow">Journey</div>
        <h2 class="section-title">How I got <span style="color:var(--amber-light)">here.</span></h2>
        <div class="timeline">
          <article v-for="item in timeline" :key="item.year">
            <div class="stat" style="font-size:1rem">{{ item.year }}</div>
            <div>
              <h3 class="card-title" style="margin-top:0;font-size:1.15rem">{{ item.label }}</h3>
              <p class="muted">{{ item.desc }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </main>
</template>
