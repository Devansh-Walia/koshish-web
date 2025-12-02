<script lang="ts">
    import { onMount } from "svelte";
    import { timelineData } from "../data/homeData";

    let container: HTMLDivElement;
    let isUserScrolling = false;
    let scrollTimeout: number | undefined;

    let selectedItem = $state<number>(0);
    console.log(selectedItem);

    onMount(() => {
        if (container) {
            // Auto-scroll at a slow pace
            const autoScroll = () => {
                if (!isUserScrolling && container) {
                    const maxScroll =
                        container.scrollWidth - container.clientWidth;
                    const currentScroll = container.scrollLeft;

                    if (currentScroll >= maxScroll) {
                        // Reset to start
                        container.scrollLeft = 0;
                    } else {
                        // Scroll slowly
                        container.scrollLeft += 1;
                    }
                }
            };

            const scrollInterval = setInterval(autoScroll, 30);

            // Pause auto-scroll when user interacts
            const handleMouseEnter = () => {
                isUserScrolling = true;
            };

            const handleMouseLeave = () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = window.setTimeout(() => {
                    isUserScrolling = false;
                }, 2000);
            };

            const handleTouchStart = () => {
                isUserScrolling = true;
            };

            const handleTouchEnd = () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = window.setTimeout(() => {
                    isUserScrolling = false;
                }, 2000);
            };

            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
            container.addEventListener("touchstart", handleTouchStart);
            container.addEventListener("touchend", handleTouchEnd);

            // Cleanup
            return () => {
                clearInterval(scrollInterval);
                clearTimeout(scrollTimeout);
                container?.removeEventListener("mouseenter", handleMouseEnter);
                container?.removeEventListener("mouseleave", handleMouseLeave);
                container?.removeEventListener("touchstart", handleTouchStart);
                container?.removeEventListener("touchend", handleTouchEnd);
            };
        }
    });
</script>

<section
    id="journey"
    class="section-spacing bg-blue-600 text-white relative overflow-hidden"
>
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="white"
                        stroke-width="1"
                    ></path>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"></rect>
        </svg>
    </div>

    <div class="container relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="heading-lg mb-6 text-white">Our Journey</h2>
            <p class="text-xl text-blue-100 leading-relaxed">
                From a small initiative to a family of hundreds, here is how we
                have grown over the years.
            </p>
        </div>

        <div class="relative">
            <!-- Horizontal Timeline Container with Auto-scroll -->
            <div
                bind:this={container}
                class="timeline-scroll-container overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide"
            >
                <!-- Connecting Line (Horizontal) -->
                <div
                    class="absolute top-1/2 left-0 right-0 h-1 bg-blue-400/30 -translate-y-1/2 rounded-full min-w-full"
                ></div>

                <div class="flex gap-8 min-w-max px-4">
                    {#each timelineData as item, index}
                        <button
                            on:click={() => {
                                console.log(index);

                                selectedItem = index;
                            }}
                            class="relative group flex-shrink-0 w-80 py-10"
                        >
                            <div
                                class="absolute top-10 right-10 w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_0_8px_rgba(37,99,235,0.5)] group-hover:scale-125 transition-transform duration-300"
                            />
                            <div
                                class="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
                            >
                                <div
                                    class="text-4xl font-bold text-amber-400 mb-2"
                                >
                                    {item.year}
                                </div>
                                <h3 class="text-xl font-bold mb-2">
                                    {item.title}
                                </h3>
                                <p class="text-blue-100 text-sm">
                                    {item.details}
                                </p>
                            </div>
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>
