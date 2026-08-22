<script setup lang="ts">
import { Mail } from 'lucide-vue-next'
import { contact } from '~/data/site'

const items = [
  { brand: 'whatsapp' as const, label: 'WhatsApp', value: contact.whatsappDisplay, href: contact.whatsapp },
  { brand: 'mail' as const, label: 'Gmail', value: contact.gmail, href: `mailto:${contact.gmail}` },
  { brand: 'facebook' as const, label: 'Facebook', value: 'AO Adewuyi', href: contact.facebook },
  { brand: 'instagram' as const, label: 'Instagram', value: contact.instagramHandle, href: contact.instagram },
  { brand: 'x' as const, label: 'X', value: contact.xHandle, href: contact.x },
]
</script>

<template>
  <div class="social-stack">
    <a v-for="item in items" :key="item.label" class="glass contact-item press" :href="item.href" target="_blank" rel="noopener noreferrer">
      <span class="icon-wrap">
        <Mail v-if="item.brand === 'mail'" :size="20" />
        <BrandIcon v-else :name="item.brand" />
      </span>
      <span>
        <span class="stat-label">{{ item.label }}</span>
        <span class="contact-value">{{ item.value }}</span>
      </span>
    </a>
  </div>
</template>
