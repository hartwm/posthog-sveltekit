# Demo
[DEMO](https://posthog-sveltekit.vercel.app/)

For those interested in experimenting with feature flags, here's some insight into integrating PostHog with SvelteKit, focusing on speed and minimizing Cumulative Layout Shift (CLS). No one appreciates a flickering webpage, particularly when it's evident that content is changing based on user data or sales strategies. For instance, I encountered a price change on a webpage after clicking an ad, which I suspect was based on my data or a sales tactic. This flickering can be off-putting, but I still value the advantages of reactive websites and client rendering.

I don't claim my approach is perfect, I'm open to comments and pull requests. My focus has been on A/B testing and flags for smaller marketing websites, not large corporate projects. After exploring various options like Split.io and LaunchDarkly, I settled on PostHog for its excellent freemium tier and clear dashboard analytics.  

You can find a working example of flags and A/B testing in this repository.

There are multiple methods to implement posthog, including using NodeJS SDK, JavaScript SDK, and API. I chose to use the PostHog API /decide route in conjunction with a Svelte API route during the initial page load. This method proved reasonably fast (~150ms) and involves a single server request before page loading.

The server then passes down the retrieved feature flags and local IDs. In the Svelte root layout file, these flags are set as a store, and we initialize a PostHog store, which starts the PostHog JavaScript SDK.
We use an onMount function in the layout file to capture page view and page leave data, allowing us to utilize our featureFlags store to show or hide features as needed. To avoid flickering, I don't directly use postHog.getFeatureFlag but include it in the onMount to update the store and send a $feature_flag_called event to PostHog.

This approach aims to eliminate CLS and flickering while maintaining speed and reducing server load. It's versatile, and you can tailor it to your needs, such as running an API request on page load for critical functions. The method primarily uses getFeatureFlag, but it can be expanded to include other functions, as the PostHog JavaScript SDK can be initiated to use cookies for user information tracking.




