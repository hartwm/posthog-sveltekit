import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
  const postHogApi = await fetch(`/api/posthog/decide`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: locals.userId })
  }).then(r => r.json())

  return {
    sessionToken: locals.sessionToken,
    userId: locals.userId,
    posthogId: locals.posthogId,
    featureFlags: postHogApi.featureFlags || {}
  };

}) satisfies LayoutServerLoad;