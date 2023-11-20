import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ parent }) => {
  const { featureFlags } = await parent()
  const variant = featureFlags.experimentServer ?? 'control'
  return {
    variant
  }
};