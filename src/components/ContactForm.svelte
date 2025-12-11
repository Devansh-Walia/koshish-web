<script lang="ts">
    let isSubmitting = false;
    let success = false;
    let error = false;

    async function handleSubmit(e: SubmitEvent) {
        isSubmitting = true;
        error = false;
        success = false;

        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                success = true;
                (e.target as HTMLFormElement).reset();
                setTimeout(() => (success = false), 5000);
            } else {
                error = true;
                // Form submission failed - error handled by UI state
            }
        } catch (err) {
            error = true;
            // Form submission error - error handled by UI state
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div
    class="w-full max-w-2xl mx-auto p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl"
>
    <h2 class="text-3xl font-bold text-white mb-2">Get in Touch</h2>
    <p class="text-gray-400 mb-8">
        Have questions or want to join our cause? Send us a message.
    </p>

    <form
        on:submit|preventDefault={handleSubmit}
        action="https://api.web3forms.com/submit"
        method="POST"
        class="space-y-6"
    >
        <!-- Replace with your actual Access Key from Web3Forms -->
        <input
            type="hidden"
            name="access_key"
            value="b60e9fb9-e451-480f-903b-328d76cf7ecb"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="relative group">
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    class="peer w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Name"
                />
                <label
                    for="name"
                    class="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-[#0a0a0a] peer-focus:px-1 pointer-events-none"
                >
                    Name
                </label>
            </div>

            <div class="relative group">
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    class="peer w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Email"
                />
                <label
                    for="email"
                    class="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-[#0a0a0a] peer-focus:px-1 pointer-events-none"
                >
                    Email
                </label>
            </div>
        </div>

        <div class="relative group">
            <input
                type="text"
                name="subject"
                id="subject"
                required
                class="peer w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Subject"
            />
            <label
                for="subject"
                class="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-[#0a0a0a] peer-focus:px-1 pointer-events-none"
            >
                Subject
            </label>
        </div>

        <div class="relative group">
            <textarea
                name="message"
                id="message"
                rows="5"
                required
                class="peer w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Message"
            ></textarea>
            <label
                for="message"
                class="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-[#0a0a0a] peer-focus:px-1 pointer-events-none"
            >
                Message
            </label>
        </div>

        <button
            type="submit"
            disabled={isSubmitting}
            class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {#if isSubmitting}
                <svg
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                Sending...
            {:else}
                Send Message
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                </svg>
            {/if}
        </button>

        {#if success}
            <div
                class="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center animate-fade-in"
            >
                Message sent successfully! We'll get back to you soon.
            </div>
        {/if}

        {#if error}
            <div
                class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center animate-fade-in"
            >
                Something went wrong. Please try again later.
            </div>
        {/if}
    </form>
</div>
