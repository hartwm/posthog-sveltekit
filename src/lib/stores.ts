import { writable, get } from 'svelte/store';
import posthog from 'posthog-js';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';
import { browser } from '$app/environment';

export const featureFlags = writable({})

// Define the store structure
const createPostHogStore = () => {
  const { subscribe, update } = writable({
    initialized: false,
  });

  // Function to initialize PostHog
  const init = (distinctID: string | undefined, featureFlags: { string: string } | undefined) => {
    if (browser && !get({ subscribe }).initialized) {
      posthog.init(
        PUBLIC_POSTHOG_KEY,
        {
          api_host: 'https://app.posthog.com',
          autocapture: false,
          capture_pageview: false,
          capture_pageleave: false,
          bootstrap: {
            distinctID,
            featureFlags
          },
          loaded: (phInstance) => {
            update(state => ({ ...state, initialized: true }));

          }
        }
      );
      posthog.debug();
    }
  };

  const capture = (eventName: string, properties = {}) => {
    if (get({ subscribe }).initialized) {
      posthog.capture(eventName, properties);
      return
    }
    init(undefined, undefined)
  };

  const reloadFeatureFlags = () => {
    if (get({ subscribe }).initialized) {
      posthog.reloadFeatureFlags();
      return
    }
    init(undefined, undefined)
  };

  const getFeatureFlag = (flagKey: string) => {
    if (get({ subscribe }).initialized) {
      const flagValue = posthog.getFeatureFlag(flagKey)
      featureFlags.update(flags => ({ ...flags, [flagKey]: flagValue }))
      return
    }
    init(undefined, undefined)
  };

  return {
    subscribe,
    init,
    capture,
    reloadFeatureFlags,
    getFeatureFlag
  };
};

// Create and export the store
export const postHog = createPostHogStore();
