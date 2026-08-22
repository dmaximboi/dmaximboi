<script setup lang="ts">
import { personal, projects } from '~/data/site'

const role = ref(personal.roles[0])
const counts = ref([0, 0, 0])
const photo = ref<HTMLElement | null>(null)
const wrap = ref<HTMLElement | null>(null)
const strip = ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Full-Stack', 'Chemistry', 'STEM Tutor', 'dmaximboi']
let timer: ReturnType<typeof setInterval>
onMounted(() => {
  let i = 0
  timer = setInterval(() => {
    i = (i + 1) % personal.roles.length
    role.value = personal.roles[i]
  }, 2800)
  const targets = [4, 3, 100]
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min((now - start) / 1600, 1)
    const ease = 1 - Math.pow(1 - t, 4)
    counts.value = targets.map((n) => Math.round(ease * n))
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
  if (photo.value && wrap.value && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    wrap.value.onmousemove = (e: MouseEvent) => {
      const r = photo.value!.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      photo.value!.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.02)`
    }
    wrap.value.onmouseleave = () => { photo.value!.style.transform = '' }
  }
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <main class="page">
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="reveal">
          <div class="glass available"><span class="dot" /> Open to work worldwide</div>
          <p class="hero-kicker">dmaximboi · maxiM</p>
          <h1 class="hero-name">
            <span class="hero-first">Adewuyi</span>
            <span class="hero-rest">Ayuba Opeyemi</span>
          </h1>
          <p class="role-line" aria-live="polite">
            <span class="role-prefix">I am a</span>
            <span class="role-slot"><span :key="role" class="role-item">{{ role }}</span></span>
          </p>
          <p class="lede">{{ personal.bio }}</p>
          <div class="actions">
            <a href="/code" class="btn-amber press">See My Work</a>
            <a href="/hire" class="btn-ghost press">Get In Touch</a>
          </div>
          <div class="stat-row">
            <div><div class="stat">{{ counts[0] }}</div><div class="stat-label">Live Projects</div></div>
            <div><div class="stat">{{ counts[1] }}</div><div class="stat-label">Years Teaching</div></div>
            <div><div class="stat">{{ counts[2] }}%</div><div class="stat-label">Dedication</div></div>
          </div>
        </div>
        <div ref="wrap" class="hero-photo reveal">
          <div ref="photo" class="glass-bright photo-frame">
            <img :src="personal.photo" :alt="personal.fullName" />
            <div class="photo-fade" /><div class="scan" />
            <div class="glass photo-caption">
              <div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem">{{ personal.shortName }}</div>
              <div class="stat-label" style="color:var(--amber-light)">{{ personal.domain }}</div>
            </div>
          </div>
          <div class="glass chip chip-r"><div class="stat-label" style="color:var(--amber-light)">Stack</div><div style="font-weight:700">MERN + MEAN</div></div>
          <div class="glass chip chip-l"><div class="stat-label" style="color:var(--amber-light)">Status</div><div style="font-weight:700;color:var(--amber-light)">Open worldwide</div></div>
        </div>
      </div>
    </section>
    <div class="strip">
      <div class="strip-track">
        <span v-for="n in 2" :key="n">
          <span v-for="s in strip" :key="s + n" style="margin-right:2.2rem">{{ s }} *</span>
        </span>
      </div>
    </div>
    <section class="section">
      <div class="wrap">
        <div class="section-eyebrow">What I Do</div>
        <h2 class="section-title">One person.<br /><span style="color:var(--amber-light)">Many capabilities.</span></h2>
        <div class="grid-3" style="margin-top:2.2rem">
          <article class="glass card lift press">
            <div class="stat-label" style="color:var(--amber)">01</div>
            <h3 class="card-title">Full-Stack Development</h3>
            <p class="muted">End to end web applications from database schema to polished UI. MERN and MEAN, REST APIs, auth, and production deploys that stay up.</p>
          </article>
          <article class="glass card lift press">
            <div class="stat-label" style="color:var(--amber)">02</div>
            <h3 class="card-title">STEM Education</h3>
            <p class="muted">Mathematics, Physics, Chemistry, Biology, and English with clarity. Online and physical sessions for secondary and tertiary learners worldwide.</p>
          </article>
          <article class="glass card lift press">
            <div class="stat-label" style="color:var(--amber)">03</div>
            <h3 class="card-title">Digital Products</h3>
            <p class="muted">School systems, lab platforms, branding sites, and business platforms. Real work, live on the public internet.</p>
          </article>
        </div>
      </div>
    </section>
    <section class="section" style="border-top:1px solid rgba(255,185,80,.06)">
      <div class="wrap">
        <div class="projects-head" style="display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;flex-wrap:wrap;margin-bottom:2rem">
          <div>
            <div class="section-eyebrow">Projects</div>
            <h2 class="section-title">Built. <span style="color:var(--amber-light)">Shipped.</span></h2>
          </div>
          <a href="/code" class="btn-ghost press">All Projects</a>
        </div>
        <div class="grid-2">
          <ProjectCard v-for="p in projects" :key="p.short" :p="p" />
        </div>
      </div>
    </section>
    <footer class="wrap">
      <div class="footer-bar">
        <a href="/" class="wordmark" style="font-size:1.2rem">maxi<em>M</em></a>
        <div>Open to work worldwide. 2026</div>
        <div>Chemistry. Code. Education.</div>
      </div>
    </footer>
  </main>
</template>
