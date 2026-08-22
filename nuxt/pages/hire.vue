<script setup lang="ts">
import { contact } from '~/data/site'
</script>

<template>
  <main class="page page-pad">
    <div class="wrap">
      <div class="section-eyebrow">dmaximboi.vercel.app/hire</div>
      <h1 class="section-title">Hire me.<br /><span style="color:var(--amber-light)">Work with me.</span></h1>
      <p class="muted prose" style="margin:1.2rem 0 2.2rem">I take product work and teaching worldwide. WhatsApp is the fastest way to start. Use the form if you want a written brief. Gmail is for contracts and schedules.</p>
      <div class="contact-grid">
        <div>
          <h2 class="card-title" style="margin-top:0">Reach me</h2>
          <p class="muted" style="margin-bottom:1.2rem">Pick a channel. I reply within 24 hours.</p>
          <SocialLinks />
          <div class="actions" style="margin-top:1.4rem">
            <a class="btn-amber press" :href="contact.whatsapp" target="_blank" rel="noopener noreferrer">
              <BrandIcon name="whatsapp" /> Hire on WhatsApp
            </a>
            <a class="btn-ghost press" :href="`mailto:${contact.gmail}`">Email a brief</a>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  </main>
</template>
