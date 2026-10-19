<script lang="ts">
  import { onMount } from "svelte";
  import { CHALLENGE } from "../data/challengeData";
  import { ExternalLinks } from "../data/constants";
  import {
    SALES_COOKIE,
    FOLLOWS_COOKIE,
    GAME_COOKIE,
    getCookieNumber,
    addToCookie,
    getDonationTotal,
    rupeesToPoints,
    formatINR,
    formatPoints,
  } from "../lib/donation";

  const FOLLOWED_KEY = "koshish_followed_socials";

  let salesTotal = $state(0);
  let follows = $state(0);
  let game = $state(0);
  let donationTotal = $state(0);

  let saleInput = $state("");
  let followed = $state<{ instagram: boolean; youtube: boolean }>({
    instagram: false,
    youtube: false,
  });

  let now = $state(Date.now());
  let timer: number | undefined;

  onMount(() => {
    salesTotal = getCookieNumber(SALES_COOKIE);
    follows = getCookieNumber(FOLLOWS_COOKIE);
    game = getCookieNumber(GAME_COOKIE);
    donationTotal = getDonationTotal();
    loadFollowed();

    timer = window.setInterval(() => (now = Date.now()), 1000);
    return () => window.clearInterval(timer);
  });

  function loadFollowed() {
    try {
      const raw = localStorage.getItem(FOLLOWED_KEY);
      if (raw) followed = { ...followed, ...JSON.parse(raw) };
    } catch {
      /* ignore */
    }
  }

  function saveFollowed() {
    localStorage.setItem(FOLLOWED_KEY, JSON.stringify(followed));
  }

  function recordSale() {
    const amount = Math.max(0, Math.round(parseFloat(saleInput) || 0));
    if (amount <= 0) return;
    salesTotal = addToCookie(SALES_COOKIE, amount);
    saleInput = "";
  }

  function follow(social: "instagram" | "youtube") {
    if (followed[social]) return;
    follows = addToCookie(FOLLOWS_COOKIE, 1);
    followed = { ...followed, [social]: true };
    saveFollowed();
  }

  function addParticipant() {
    game = addToCookie(GAME_COOKIE, 1);
  }

  // Points per source
  const salesPoints = $derived(rupeesToPoints(salesTotal));
  const followPoints = $derived(follows);
  const gamePoints = $derived(game);
  const donationPoints = $derived(rupeesToPoints(donationTotal));

  const totalPoints = $derived(
    salesPoints + followPoints + gamePoints + donationPoints,
  );
  const remainingPoints = $derived(Math.max(0, CHALLENGE.goal - totalPoints));

  // Circular progress ring
  const RING_RADIUS = 80;
  const ringCircumference = $derived(2 * Math.PI * RING_RADIUS);
  const ringFraction = $derived(totalPoints / CHALLENGE.goal);
  const ringProgress = $derived(Math.min(1, ringFraction) * ringCircumference);
  const ringOverflow = $derived(
    Math.max(0, ringFraction - 1) * ringCircumference,
  );
  const isOverGoal = $derived(totalPoints > CHALLENGE.goal);

  // Countdown
  const deadlineMs = $derived(new Date(CHALLENGE.deadline).getTime());
  const remainingMs = $derived(Math.max(0, deadlineMs - now));
  const days = $derived(Math.floor(remainingMs / 86400000));
  const hours = $derived(Math.floor((remainingMs % 86400000) / 3600000));
  const minutes = $derived(Math.floor((remainingMs % 3600000) / 60000));
  const seconds = $derived(Math.floor((remainingMs % 60000) / 1000));

  const pad = (n: number) => String(n).padStart(2, "0");
  const formatNumber = (n: number) => new Intl.NumberFormat("en-IN").format(n);
</script>

<section>
  <div class="grid lg:grid-cols-3 gap-6 items-stretch">
    <!-- Left column: sale + follows -->
    <div class="grid gap-6">
      <!-- 1. Sale recording -->
      <div class="card p-6">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">🧾</span>
          <h2 class="heading-sm">Record a sale</h2>
        </div>
        <p class="text-body mb-4">Every ₹100 adds 1 point.</p>
        <div class="flex gap-2 mb-4">
          <div class="relative flex-1">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
            <input
              type="number"
              min="1"
              placeholder="Sale amount"
              bind:value={saleInput}
              class="w-full rounded-xl border-2 border-gray-200 pl-9 pr-4 py-2.5 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <button type="button" onclick={recordSale} class="btn btn-primary shrink-0">
            Add
          </button>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">{formatINR(salesTotal)}</span>
          <span class="font-bold text-[var(--color-primary)] tabular-nums">
            {formatPoints(salesPoints)}
          </span>
        </div>
      </div>

      <!-- 2. Insta / YT follow -->
      <div class="card p-6">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">📣</span>
          <h2 class="heading-sm">Follow us</h2>
        </div>
        <p class="text-body mb-4">+1 point each.</p>
        <div class="flex flex-wrap gap-2 mb-4">
          <a
            href={ExternalLinks.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => follow("instagram")}
            class:opacity-50={followed.instagram}
            class="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg transition-all"
          >
            {followed.instagram ? "✓ " : ""}Instagram
          </a>
          <a
            href={ExternalLinks.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => follow("youtube")}
            class:opacity-50={followed.youtube}
            class="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-700 hover:shadow-lg transition-all"
          >
            {followed.youtube ? "✓ " : ""}YouTube
          </a>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">{follows} follow{follows === 1 ? "" : "s"}</span>
          <span class="font-bold text-[var(--color-primary)] tabular-nums">
            {formatPoints(followPoints)}
          </span>
        </div>
      </div>
    </div>

    <!-- Center: circular progress ring + countdown -->
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-indigo-700 text-white p-6 shadow-xl flex flex-col items-center justify-center text-center order-first lg:order-none"
    >
      <div class="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="challenge-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#challenge-grid)" />
        </svg>
      </div>

      <div class="relative z-10 flex flex-col items-center">
        <p class="text-blue-100 uppercase tracking-widest text-xs font-semibold mb-3">
          Lights of Kindness
        </p>

        <div class="relative w-52 h-52 md:w-60 md:h-60">
          <svg viewBox="0 0 200 200" class="w-full h-full -rotate-90">
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              stroke-width="14"
            />
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke="#fbbf24"
              stroke-width="14"
              stroke-linecap="round"
              stroke-dasharray={`${ringProgress} ${ringCircumference}`}
            />
            {#if isOverGoal}
              <circle
                cx="100"
                cy="100"
                r={RING_RADIUS}
                fill="none"
                stroke="#34d399"
                stroke-width="14"
                stroke-linecap="round"
                stroke-dasharray={`${ringOverflow} ${ringCircumference}`}
              />
            {/if}
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-4xl md:text-5xl font-bold font-heading tabular-nums leading-none">
              {formatNumber(totalPoints)}
            </span>
            <span class="text-blue-100 text-xs mt-1">
              of {formatNumber(CHALLENGE.goal)} lights
            </span>
          </div>
        </div>

        <p class="text-base font-medium mt-4">
          {#if isOverGoal}
            <span class="text-emerald-300 font-bold">
              {formatPoints(totalPoints - CHALLENGE.goal)}
            </span>
            over goal 🎉
          {:else}
            <span class="font-bold">{formatPoints(remainingPoints)}</span> to go
          {/if}
        </p>

        <div class="mt-4">
          <p class="text-blue-100 uppercase tracking-widest text-[11px] font-semibold mb-2">
            Time left
          </p>
          <div class="flex justify-center gap-1.5 tabular-nums">
            <div class="rounded-lg bg-white/10 border border-white/20 px-2.5 py-1.5">
              <span class="block text-xl font-bold">{pad(days)}</span>
              <span class="text-[10px] uppercase text-blue-100">days</span>
            </div>
            <div class="rounded-lg bg-white/10 border border-white/20 px-2.5 py-1.5">
              <span class="block text-xl font-bold">{pad(hours)}</span>
              <span class="text-[10px] uppercase text-blue-100">hrs</span>
            </div>
            <div class="rounded-lg bg-white/10 border border-white/20 px-2.5 py-1.5">
              <span class="block text-xl font-bold">{pad(minutes)}</span>
              <span class="text-[10px] uppercase text-blue-100">min</span>
            </div>
            <div class="rounded-lg bg-white/10 border border-white/20 px-2.5 py-1.5">
              <span class="block text-xl font-bold">{pad(seconds)}</span>
              <span class="text-[10px] uppercase text-blue-100">sec</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right column: game + donation -->
    <div class="grid gap-6">
      <!-- 3. Game participation -->
      <div class="card p-6">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">🎮</span>
          <h2 class="heading-sm">Game participation</h2>
        </div>
        <p class="text-body mb-4">Each participant adds 1 point.</p>
        <button type="button" onclick={addParticipant} class="btn btn-secondary mb-4">
          +1 participant
        </button>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">{game} participant{game === 1 ? "" : "s"}</span>
          <span class="font-bold text-[var(--color-primary)] tabular-nums">
            {formatPoints(gamePoints)}
          </span>
        </div>
      </div>

      <!-- 4. Donation (auto from cookie) -->
      <div class="card p-6">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">💝</span>
          <h2 class="heading-sm">Donation</h2>
        </div>
        <p class="text-body mb-4">₹100 = 1 point, auto from donations.</p>
        <a href="/donate" class="btn btn-outline mb-4">Go to Donate</a>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">{formatINR(donationTotal)} donated</span>
          <span class="font-bold text-[var(--color-primary)] tabular-nums">
            {formatPoints(donationPoints)}
          </span>
        </div>
      </div>
    </div>
  </div>
</section>