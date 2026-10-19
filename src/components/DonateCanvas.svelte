<script lang="ts">
  import { onMount } from "svelte";
  import { QR_OPTIONS, type QrOption } from "../data/donateData";
  import { getDonationTotal, addDonation, formatINR } from "../lib/donation";

  const EMOJI_COUNTS_KEY = "koshish_emoji_counts";

  let total = $state(0);
  let emojiCounts = $state<Record<string, number>>({});
  let selected = $state<QrOption | null>(null);
  let justAdded = $state<string | null>(null);

  onMount(() => {
    total = getDonationTotal();
    loadCounts();
  });

  function loadCounts() {
    try {
      const raw = localStorage.getItem(EMOJI_COUNTS_KEY);
      emojiCounts = raw ? JSON.parse(raw) : {};
    } catch {
      emojiCounts = {};
    }
  }

  function saveCounts() {
    localStorage.setItem(EMOJI_COUNTS_KEY, JSON.stringify(emojiCounts));
  }

  function openModal(option: QrOption) {
    selected = option;
  }

  function closeModal() {
    selected = null;
  }

  function confirmDonation() {
    if (!selected) return;
    total = addDonation(selected.amount);
    emojiCounts[selected.emoji] = (emojiCounts[selected.emoji] ?? 0) + 1;
    emojiCounts = { ...emojiCounts };
    saveCounts();
    justAdded = selected.emoji;
    closeModal();
    setTimeout(() => (justAdded = null), 2500);
  }

  function countFor(emoji: string): number {
    return emojiCounts[emoji] ?? 0;
  }

  // Emojis grow in size as they receive more donations.
  function emojiSize(count: number): number {
    if (count <= 0) return 0;
    return Math.min(30 + (count - 1) * 16, 150);
  }

  const activeEmojis = $derived(
    QR_OPTIONS.filter((option) => countFor(option.emoji) > 0),
  );
</script>

<div class="flex flex-col rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">
  <!-- Top bar: total donation counter -->
  <div
    class="flex items-center justify-between gap-4 bg-gradient-to-r from-[var(--color-primary)] to-indigo-700 text-white px-6 py-5"
  >
    <div>
      <p class="text-xs uppercase tracking-widest text-blue-100 font-semibold">
        Total donation
      </p>
      <p class="text-3xl md:text-4xl font-bold font-heading tabular-nums">
        {formatINR(total)}
      </p>
    </div>
    {#if justAdded}
      <span
        class="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-sm font-medium animate-fade-in"
      >
        {justAdded} donated!
      </span>
    {/if}
  </div>

  <div class="flex flex-col md:flex-row flex-1 min-h-[60vh]">
    <!-- Left sidebar: emoji list -->
    <aside
      class="md:w-28 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 p-3"
    >
      <p class="text-[11px] uppercase tracking-wider text-gray-400 font-semibold text-center mb-3">
        Pick an emoji
      </p>
      <div class="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {#each QR_OPTIONS as option}
          <button
            type="button"
            onclick={() => openModal(option)}
            title={`${option.emoji} · ₹${option.amount}`}
            class="group flex md:flex-col items-center gap-1.5 rounded-xl border-2 border-gray-200 bg-white px-3 py-2 md:py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-md shrink-0"
          >
            <span class="text-2xl md:text-3xl">{option.emoji}</span>
            <span class="text-xs font-semibold text-gray-500 group-hover:text-[var(--color-primary)]">
              ₹{option.amount}
            </span>
            {#if countFor(option.emoji) > 0}
              <span
                class="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold flex items-center justify-center"
              >
                {countFor(option.emoji)}
              </span>
            {/if}
          </button>
        {/each}
      </div>
    </aside>

    <!-- Center canvas: emojis fill & grow -->
    <div
      class="relative flex-1 overflow-y-auto p-6 md:p-10"
      style="background:
        radial-gradient(circle at 20% 20%, rgba(37,99,235,0.06), transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(245,158,11,0.06), transparent 40%);"
    >
      {#if activeEmojis.length === 0}
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-300">
          <span class="text-6xl mb-4">🫶</span>
          <p class="text-lg font-medium text-gray-400">
            Pick an emoji to start donating
          </p>
          <p class="text-sm text-gray-300">
            Every donation plants an emoji here — the more, the bigger it grows.
          </p>
        </div>
      {:else}
        <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {#each activeEmojis as option (option.emoji)}
            <div
              class="flex flex-col items-center gap-1 animate-float"
              style={`animation-delay: ${(activeEmojis.indexOf(option) * 0.4).toFixed(1)}s`}
            >
              <span
                class="leading-none drop-shadow-sm"
                style={`font-size: ${emojiSize(countFor(option.emoji))}px`}
              >
                {option.emoji}
              </span>
              <span
                class="rounded-full bg-gray-900/70 text-white text-xs font-semibold px-2 py-0.5"
              >
                ×{countFor(option.emoji)}
              </span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- QR modal -->
{#if selected}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onclick={closeModal}
    role="dialog"
    aria-modal="true"
    aria-label={`Donate ₹${selected.amount} with ${selected.emoji}`}
  >
    <div
      class="relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl animate-slide-up"
      onclick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onclick={closeModal}
        aria-label="Close"
        class="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
      >
        ✕
      </button>

      <span class="text-5xl">{selected.emoji}</span>
      <h2 class="heading-sm mt-3">Donate ₹{selected.amount}</h2>
      <p class="text-body mt-1 mb-6">Scan the QR code below with any UPI app.</p>

      <div class="mx-auto w-56 h-56 rounded-2xl border-2 border-gray-100 bg-white p-2 shadow-inner">
        <img
          src={selected.image}
          alt={`QR code for ₹${selected.amount}`}
          class="w-full h-full object-contain"
        />
      </div>

      <button
        type="button"
        onclick={confirmDonation}
        class="btn btn-primary w-full mt-6 text-lg"
      >
        Done
      </button>
      <p class="text-xs text-gray-400 mt-3">
        Tapping “Done” records your donation in this browser.
      </p>
    </div>
  </div>
{/if}

<style>
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
</style>