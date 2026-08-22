<script setup lang="ts">
import { FlaskConical, Calculator, Atom, Dna, BookOpen, Mail } from 'lucide-vue-next'
import { contact, subjects } from '~/data/site'

const icons: Record<string, any> = {
  flask: FlaskConical,
  calc: Calculator,
  atom: Atom,
  dna: Dna,
  book: BookOpen,
}

const formats = [
  { title: 'One on One', desc: 'Private sessions at your pace. Fastest progress, full attention, homework that matches where you actually are, not where the class is.' },
  { title: 'Small Groups', desc: 'Up to four students. You still get named feedback, and you hear other people miss the same trick you miss.' },
  { title: 'Online', desc: 'Video, shared board, recorded logic. Same standard as sitting across a table. Students can join from anywhere in the world.' },
  { title: 'In person', desc: 'Face to face when we can meet. Best for practical chemistry talk, messy algebra, and students who learn by watching a hand move.' },
]
</script>

<template>
  <main class="page page-pad">
    <div class="wrap">
      <div class="section-eyebrow">dmaximboi.vercel.app/teach</div>
      <h1 class="section-title">Science taught<br /><span style="color:var(--amber-light)">with clarity</span><br /><span class="outline">and precision.</span></h1>
      <p class="muted prose" style="margin-top:1.2rem">I am a Chemistry graduate who teaches the way I wished I was taught. No chanting definitions you cannot use. No skipping the ugly step in a calculation. We stay with the idea until it clicks, then we practise until an exam question looks familiar.</p>
      <p class="muted prose" style="margin-top:1rem;margin-bottom:2.4rem">Sessions are available one on one, in small groups, online, or in person. Students join from anywhere. Bring your syllabus, your weak topics, and the last paper that embarrassed you. We will make a plan and work it.</p>
      <div class="grid-4">
        <article v-for="(f, i) in formats" :key="f.title" class="glass card lift press">
          <div class="stat-label" style="color:var(--amber)">0{{ i + 1 }}</div>
          <h3 class="card-title" style="font-size:1.15rem">{{ f.title }}</h3>
          <p class="muted">{{ f.desc }}</p>
        </article>
      </div>
      <div style="margin-top:4rem">
        <div class="section-eyebrow">Subjects</div>
        <h2 class="section-title">What I <span style="color:var(--amber-light)">teach.</span></h2>
        <div style="display:flex;flex-direction:column;gap:1rem;margin-top:2rem">
          <article v-for="s in subjects" :key="s.name" class="glass card lift press subject">
            <div>
              <div class="subject-icon"><component :is="icons[s.icon]" :size="26" /></div>
              <div class="stat-label" style="margin-top:.5rem">{{ s.level }}</div>
            </div>
            <div>
              <h3 class="card-title" style="margin-top:0">{{ s.name }}</h3>
              <p class="muted">{{ s.desc }}</p>
            </div>
            <div class="tags">
              <span v-for="t in s.topics" :key="t" class="tag">{{ t }}</span>
            </div>
          </article>
        </div>
      </div>
      <div class="glass-bright" style="border-radius:2rem;padding:clamp(2rem,6vw,3.5rem);margin-top:3.5rem;text-align:center">
        <div class="section-eyebrow" style="justify-content:center">Book a session</div>
        <h2 class="section-title" style="font-size:clamp(1.8rem,4vw,2.8rem)">Ready to understand<br /><span style="color:var(--amber-light)">not just memorise?</span></h2>
        <p class="muted" style="margin:1rem auto 0;max-width:44ch">Tell me the subject, the exam, and the week you need to be ready. WhatsApp is the fastest way to lock a slot. Email if you prefer a written plan. I teach students worldwide.</p>
        <div class="actions" style="justify-content:center;margin-top:1.8rem">
          <a class="btn-amber press" :href="contact.whatsapp" target="_blank" rel="noopener noreferrer">
            <BrandIcon name="whatsapp" /> Book via WhatsApp
          </a>
          <a class="btn-ghost press" :href="`mailto:${contact.gmail}`">
            <Mail :size="18" /> Send an Email
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
