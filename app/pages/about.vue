<template>
  <div class="bg-gray-950 text-white font-nunito min-h-screen">
    <!-- ========== HERO ========== -->
    <section class="relative overflow-hidden pt-32 pb-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <!-- Twinkling stars -->
      <div class="absolute inset-0 pointer-events-none">
        <div v-for="s in heroStars" :key="s.id"
          class="absolute rounded-full twinkle"
          :style="s.style"
        />
      </div>

      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/25 rounded-full px-4 py-1.5 mb-6">
          <svg class="w-3 h-3 text-amber-400" viewBox="0 0 16 16" fill="currentColor">
            <polygon points="8,1 10,6 15.5,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 0.5,6 6,6"/>
          </svg>
          <span class="text-amber-400 text-xs font-semibold tracking-widest uppercase">Our Story</span>
        </div>
        <h1 class="font-syne text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          We Are <span class="text-amber-400">RisingStar</span>
        </h1>
        <p class="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          A passionate team on a mission to make quality accessories and home appliances accessible to everyone — delivered fast, priced fairly, and built to last.
        </p>
      </div>
    </section>

    <!-- ========== STATS ========== -->
    <section class="bg-gray-950 border-y border-white/5 py-14">
      <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="font-syne text-4xl font-extrabold stat-num">{{ stat.value }}</p>
          <p class="text-gray-500 text-sm mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- ========== THE PROBLEM WE SOLVE ========== -->
    <section class="bg-gray-950 py-20">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p class="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">The Problem We Solved</p>
          <h2 class="font-syne text-3xl font-extrabold leading-tight mb-6">
            Online shopping shouldn't feel like a gamble.
          </h2>
          <p class="text-gray-400 leading-relaxed mb-4">
            For years, people trying to order accessories and home appliances online faced the same exhausting cycle — misleading product photos, undisclosed quality defects, opaque pricing, and delivery timelines that were more guesswork than promise.
          </p>
          <p class="text-gray-400 leading-relaxed mb-4">
            Customers were left second-guessing every click:
            <em class="text-gray-300">Is this real leather? Will this actually fit? Will it even arrive?</em>
            Trust had become the rarest commodity in e-commerce.
          </p>
          <p class="text-gray-400 leading-relaxed">
            RisingStar was built to fix exactly that. We created a platform where every product listing is honest, every price is transparent, and every order is backed by a real human support team that genuinely cares.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-900 border border-white/7 rounded-2xl p-5 col-span-2">
            <div class="text-2xl mb-3">🎯</div>
            <p class="font-syne font-bold text-sm mb-1">Verified product listings</p>
            <p class="text-gray-500 text-xs leading-relaxed">Every item is reviewed before it goes live. No misleading descriptions, no stock photos that bear zero resemblance to reality.</p>
          </div>
          <div class="bg-gray-900 border border-white/7 rounded-2xl p-5">
            <div class="text-2xl mb-3">🚚</div>
            <p class="font-syne font-bold text-sm mb-1">Real delivery timelines</p>
            <p class="text-gray-500 text-xs leading-relaxed">We tell you exactly when to expect your order — and we mean it.</p>
          </div>
          <div class="bg-gray-900 border border-white/7 rounded-2xl p-5">
            <div class="text-2xl mb-3">💬</div>
            <p class="font-syne font-bold text-sm mb-1">Human-first support</p>
            <p class="text-gray-500 text-xs leading-relaxed">No bots. A real person handles every query, complaint, and compliment.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== WHAT INSPIRED US ========== -->
    <section class="bg-gray-900 py-20 border-y border-white/5">
      <div class="max-w-4xl mx-auto px-6">
        <p class="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3 text-center">What Inspired Us</p>
        <h2 class="font-syne text-3xl font-extrabold text-center mb-12">
          Born out of frustration,<br/>
          <span class="text-amber-400">built with purpose.</span>
        </h2>

        <div class="relative">
          <!-- Centre timeline line (desktop) -->
          <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400 to-transparent"></div>

          <div class="space-y-12">
            <div
              v-for="(milestone, i) in milestones"
              :key="milestone.tag"
              class="md:grid md:grid-cols-2 md:gap-12 items-center"
            >
              <!-- Left side (even steps on right on desktop) -->
              <div :class="i % 2 === 0 ? 'md:text-right' : 'md:order-last'">
                <span class="inline-block bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-bold px-3 py-1 rounded-full font-syne mb-3">
                  {{ milestone.tag }}
                </span>
                <h3 class="font-syne font-bold text-base mb-2">{{ milestone.title }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">{{ milestone.body }}</p>
              </div>

              <!-- Icon node -->
              <div
                :class="i % 2 === 0
                  ? 'hidden md:flex justify-start pl-10'
                  : 'hidden md:flex justify-end pr-10'"
              >
                <div class="w-12 h-12 rounded-full bg-amber-400/15 border-2 border-amber-400 flex items-center justify-center text-xl">
                  {{ milestone.icon }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== OUR VALUES ========== -->
    <section class="bg-gray-950 py-20">
      <div class="max-w-6xl mx-auto px-6">
        <p class="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3 text-center">What We Stand For</p>
        <h2 class="font-syne text-3xl font-extrabold text-center mb-12">Our core values</h2>
        <div class="grid md:grid-cols-3 gap-5">
          <div
            v-for="value in coreValues"
            :key="value.title"
            class="value-card bg-gray-900 border border-white/7 hover:border-amber-400/30 rounded-2xl p-6 transition-all hover:-translate-y-1"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" :class="value.iconBg">
              {{ value.icon }}
            </div>
            <h3 class="font-syne font-bold text-base mb-2">{{ value.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{{ value.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== COMMUNITY ========== -->
    <section class="bg-gray-900 border-y border-white/5 py-20">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p class="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">Growing Together</p>
          <h2 class="font-syne text-3xl font-extrabold mb-6">
            Over 1,000 customers<br/>
            and <span class="text-amber-400">still rising.</span>
          </h2>
          <p class="text-gray-400 leading-relaxed mb-4">
            What started as a small online store has grown into a thriving community of people who believe in buying smart and living better. Our 1,000+ customers aren't just buyers — they're ambassadors, reviewers, and repeat fans who keep coming back.
          </p>
          <p class="text-gray-400 leading-relaxed mb-6">
            From first-time shoppers picking up their first smartwatch to seasoned buyers who trust us with their full home upgrade, our community spans every walk of life.
          </p>
          <ul class="flex flex-col gap-3">
            <li v-for="point in communityPoints" :key="point" class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></span>
              <span class="text-gray-300 text-sm">{{ point }}</span>
            </li>
          </ul>
        </div>

        <!-- Testimonials -->
        <div class="flex flex-col gap-4">
          <div
            v-for="review in testimonials"
            :key="review.name"
            class="bg-gray-950 border border-white/7 rounded-2xl p-5"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-9 h-9 rounded-full flex items-center justify-center font-syne font-bold text-sm flex-shrink-0"
                :class="review.avatarClass"
              >
                {{ review.initials }}
              </div>
              <div>
                <p class="font-syne font-bold text-sm">{{ review.name }}</p>
                <p class="text-gray-500 text-xs">{{ review.location }}</p>
              </div>
              <div class="ml-auto text-amber-400 text-xs">★★★★★</div>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">{{ review.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SUSTAINABILITY ========== -->
    <section class="bg-gray-950 py-20">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <p class="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">Our Commitment</p>
        <h2 class="font-syne text-3xl font-extrabold mb-4">
          Shopping responsibly<br/>for a better tomorrow.
        </h2>
        <p class="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
          We believe that growth and responsibility go hand in hand. As RisingStar scales, so does our commitment to the planet and the communities we serve.
        </p>
        <div class="grid md:grid-cols-3 gap-6 text-left">
          <div
            v-for="pledge in sustainabilityPledges"
            :key="pledge.title"
            class="bg-gray-900 border border-green-400/15 rounded-2xl p-6"
          >
            <p class="text-3xl mb-4">{{ pledge.icon }}</p>
            <h3 class="font-syne font-bold text-sm mb-2 text-green-400">{{ pledge.title }}</h3>
            <p class="text-gray-500 text-xs leading-relaxed">{{ pledge.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CTA BANNER ========== -->
    <section class="bg-amber-400 py-16">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="font-syne text-3xl font-extrabold text-gray-900 mb-3">
          Ready to join the RisingStar family?
        </h2>
        <p class="text-gray-700 mb-8">Over 1,000 customers already shop smarter with us. You're next.</p>
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink
            to="/shop"
            class="bg-gray-900 text-white font-bold font-syne px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            Shop Now →
          </RouterLink>
          <a
            href="mailto:hello@risingstar.com"
            class="border-2 border-gray-900 text-gray-900 font-bold font-syne px-8 py-3.5 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>

    <!-- ========== FOOTER ========== -->
    <footer class="bg-gray-950 border-t border-white/5 py-10">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-2">
          <svg class="w-6 h-6 star-glow" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12" fill="#f59e0b"/>
          </svg>
          <span class="font-syne font-extrabold text-lg">Rising<span class="text-amber-400">Star</span></span>
        </div>
        <p class="text-gray-600 text-sm">© 2026 RisingStar. All rights reserved.</p>
        <div class="flex gap-6 text-sm text-gray-500">
          <a href="#" class="hover:text-amber-400 transition-colors">Privacy</a>
          <a href="#" class="hover:text-amber-400 transition-colors">Terms</a>
          <a href="#" class="hover:text-amber-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import useBasic from '../stores/useBasic'

const help = useBasic()
const heroStars = [
  { id: 1, style: 'top:64px;left:48px;width:6px;height:6px;background:#fcd34d;animation-delay:0s' },
  { id: 2, style: 'top:128px;left:33%;width:4px;height:4px;background:white;animation-delay:0.8s' },
  { id: 3, style: 'top:80px;right:25%;width:6px;height:6px;background:#fde68a;animation-delay:1.4s' },
  { id: 4, style: 'bottom:80px;right:64px;width:4px;height:4px;background:white;animation-delay:0.4s' },
  { id: 5, style: 'top:160px;right:48px;width:4px;height:4px;background:#fcd34d;animation-delay:1.9s' },
]

const stats = [
  { value: '1,000+', label: 'Happy customers' },
  { value: '5,000+', label: 'Products listed' },
  { value: '98%',    label: 'Satisfaction rate' },
  { value: '24/7',   label: 'Customer support' },
]

const milestones = [
  {
    tag: 'The Spark',
    icon: '💡',
    title: "A founder's bad online purchase",
    body: 'Our founder ordered a set of home appliances online in 2022. What arrived was nothing like what was advertised — cheap materials, wrong sizing, and a customer service line that went unanswered for weeks.',
  },
  {
    tag: 'The Research',
    icon: '🔍',
    title: 'Talking to hundreds of shoppers',
    body: "We spent months speaking to everyday online shoppers. The pattern was consistent — people didn't lack options, they lacked confidence. They wanted a store they could trust, not just use.",
  },
  {
    tag: 'The Build',
    icon: '🚀',
    title: 'RisingStar is born',
    body: 'In 2023, we launched RisingStar with one goal: be the platform we wished existed. Every decision since — from product curation to packaging — has been made with the customer\'s trust in mind.',
  },
]

const coreValues = [
  {
    icon: '🏆',
    iconBg: 'bg-amber-400/10',
    title: 'Quality without compromise',
    body: 'Every product on RisingStar passes our internal quality check before it reaches a customer\'s cart. We work directly with trusted suppliers who share our obsession with durability and finish.',
  },
  {
    icon: '🌱',
    iconBg: 'bg-green-400/10',
    title: 'Sustainability first',
    body: 'We\'re committed to reducing our footprint. Our packaging is 100% recyclable, we partner with energy-efficient suppliers, and we\'re working towards a carbon-neutral delivery network by 2027.',
  },
  {
    icon: '🤝',
    iconBg: 'bg-blue-400/10',
    title: 'Community over transactions',
    body: 'RisingStar isn\'t just a store — it\'s a growing community of smart shoppers. We listen, respond, and constantly improve based on feedback from the people who shop with us every day.',
  },
  {
    icon: '💎',
    iconBg: 'bg-purple-400/10',
    title: 'Honest pricing',
    body: 'No hidden fees. No inflated "before discount" prices. What you see is what you pay — and we guarantee you won\'t find better value for the same quality anywhere else.',
  },
  {
    icon: '⚡',
    iconBg: 'bg-rose-400/10',
    title: 'Speed & reliability',
    body: 'We\'ve built our logistics to be fast and dependable. Orders placed before 2pm ship same day, and our real-time tracking keeps you informed every step of the way.',
  },
  {
    icon: '🔒',
    iconBg: 'bg-teal-400/10',
    title: 'Safe & secure shopping',
    body: 'Your data and your money are protected. We use industry-standard encryption for every transaction and will never sell or share your personal information.',
  },
]

const communityPoints = [
  'Active community forum with product reviews and buying guides',
  'Loyalty rewards for every purchase — earn stars, redeem discounts',
  'Monthly new arrivals curated by community votes',
  'Referral programme — bring a friend, both of you save',
]

const testimonials = [
  {
    name: 'Adaeze O.',
    initials: 'AO',
    location: 'Lagos, Nigeria',
    avatarClass: 'bg-amber-400/20 text-amber-400',
    text: '"I\'ve ordered from so many sites that disappointed me. RisingStar was the first time what arrived actually matched what I ordered. Incredible."',
  },
  {
    name: 'Kofi E.',
    initials: 'KE',
    location: 'Accra, Ghana',
    avatarClass: 'bg-blue-400/20 text-blue-400',
    text: '"The air fryer I got is still going strong after 8 months. Quality is real — not that flimsy stuff you see elsewhere. Fast delivery too."',
  },
  {
    name: 'Taiwo A.',
    initials: 'TA',
    location: 'Abuja, Nigeria',
    avatarClass: 'bg-green-400/20 text-green-400',
    text: '"Customer support actually picked up my call and resolved my issue in under 10 minutes. That alone made me a loyal customer forever."',
  },
]

const sustainabilityPledges = [
  {
    icon: '♻️',
    title: '100% recyclable packaging',
    body: 'Every box, every bag, every insert — designed to be recycled or composted. No excess plastic. No unnecessary waste.',
  },
  {
    icon: '🌍',
    title: 'Carbon-neutral goal by 2027',
    body: "We're actively offsetting our delivery emissions and working with green logistics partners to reach full carbon neutrality within two years.",
  },
  {
    icon: '🤲',
    title: 'Ethical supplier standards',
    body: 'We only partner with suppliers who meet our ethical manufacturing standards — fair wages, safe conditions, and a commitment to reducing waste at source.',
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Nunito:wght@400;500;600&display=swap');

.font-syne   { font-family: 'Syne', sans-serif; }
.font-nunito { font-family: 'Nunito', sans-serif; }

.star-glow {
  filter: drop-shadow(0 0 8px #f59e0b);
}

.nav-link {
  position: relative;
  transition: color 0.2s;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #f59e0b;
  transition: width 0.3s;
}
.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}
.nav-link.router-link-active {
  color: #fbbf24;
}

/* Twinkling star dots */
@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.15; }
}
.twinkle {
  animation: twinkle 2.5s ease-in-out infinite;
}

/* Gradient stat numbers */
.stat-num {
  background: linear-gradient(135deg, #f59e0b, #fcd34d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
