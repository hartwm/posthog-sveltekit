import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ locals, fetch }) => {

  const postHogApi = await fetch(`/api/posthog/decide`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: locals.userId })
  }).then(r => r.json())

  const variant = postHogApi.featureFlags.experimentServer ?? 'control'
  return {
    variant
  }
};