// hooks.server.ts
import { v4 as uuidv4 } from 'uuid';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';
const client = 'unique_client_name'

export const handle: Handle = async ({ event, resolve }) => {
  // Attempt to retrieve existing tokens from cookies
  let sessionToken = event.cookies.get(`${client}_session_id`);
  let userId = event.cookies.get(`${client}_user_id`);

  // Generate and set tokens if they don't exist
  if (!sessionToken) {
    sessionToken = uuidv4();
    event.cookies.set(`${client}_session_id`, sessionToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
  }

  if (!userId) {
    userId = uuidv4();
    event.cookies.set(`${client}_user_id`, userId, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 52 // 1 year
    });
  }

  // Retrieve PostHog cookie
  let phCookie = event.cookies.get(`ph_${PUBLIC_POSTHOG_KEY}_posthog`);
  phCookie = phCookie ? JSON.parse(phCookie) : null;
  const posthogId = phCookie ? phCookie.distinct_id : userId;


  // Set local values
  event.locals = {
    ...event.locals,
    sessionToken,
    userId,
    posthogId
  }

  const response = await resolve(event);
  return response;
};
