<script setup lang="ts">
const fields = reactive({ name: '', email: '', subject: '', message: '', company: '' })
const status = ref<'idle' | 'sending' | 'done' | 'error'>('idle')
const note = ref('')

async function submit() {
  if (!fields.name || !fields.email || !fields.subject || !fields.message) {
    status.value = 'error'
    note.value = 'Please fill in all fields.'
    return
  }
  status.value = 'sending'
  note.value = ''
  try {
    const csrf = await $fetch<{ token: string }>('/api/csrf', { credentials: 'include' })
    await $fetch('/api/contact', {
      method: 'POST',
      credentials: 'include',
      headers: { 'X-CSRF-Token': csrf.token },
      body: { ...fields, csrf: csrf.token },
    })
    status.value = 'done'
    note.value = 'Message sent. I will respond within 24 hours.'
    fields.name = ''
    fields.email = ''
    fields.subject = ''
    fields.message = ''
    fields.company = ''
  } catch (err: any) {
    status.value = 'error'
    note.value = err?.data?.statusMessage || err?.statusMessage || 'Could not send message.'
  }
}
</script>

<template>
  <form class="glass-bright card" style="border-radius:2rem;padding:clamp(1.4rem,3vw,2.2rem)" @submit.prevent="submit">
    <div style="font-family:var(--font-display);font-weight:700;font-size:1.2rem;margin-bottom:1.2rem">Send a Message</div>
    <label class="hp">Company <input v-model="fields.company" tabindex="-1" autocomplete="off" /></label>
    <div class="form-row">
      <label><span class="lbl">Full Name</span><input v-model="fields.name" class="field" name="name" required maxlength="120" placeholder="Your name" autocomplete="name" /></label>
      <label><span class="lbl">Email</span><input v-model="fields.email" class="field" type="email" name="email" required placeholder="your@email.com" autocomplete="email" /></label>
    </div>
    <label style="display:block;margin-top:1rem"><span class="lbl">Subject</span>
      <select v-model="fields.subject" class="field" name="subject" required>
        <option value="">Select a topic</option>
        <option value="hire">Hire Me for a Project</option>
        <option value="teach">Teaching Session</option>
        <option value="collab">Collaboration</option>
        <option value="other">Something Else</option>
      </select>
    </label>
    <label style="display:block;margin-top:1rem"><span class="lbl">Message</span>
      <textarea v-model="fields.message" class="field" name="message" required maxlength="4000" placeholder="Tell me what you have in mind..." style="height:120px;resize:vertical" />
    </label>
    <button class="btn-amber press" type="submit" :disabled="status === 'sending'" style="width:100%;margin-top:1rem">
      {{ status === 'sending' ? 'Sending...' : 'Send Message' }}
    </button>
    <p class="form-note" :style="{ color: status === 'error' ? 'rgba(255,100,80,.85)' : 'var(--amber-light)' }">{{ note }}</p>
  </form>
</template>
