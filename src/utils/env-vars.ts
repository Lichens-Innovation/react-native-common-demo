import { storage } from '@Lichens-Innovation/react-native-common';

/**
 * The 'EXPO_PUBLIC_*' environment variables are inlined (substituted) at build time by the bundler (Metro).
 * This substitution only works for static, literal expressions like 'process.env.MY_VARIABLE'.
 *
 * By assigning these values to module-level constants, we ensure the substitution happens correctly.
 * This allows the functions below (e.g., 'isSentryActivated') to use the correct, resolved value instead of
 * 'undefined' or an empty string at runtime.
 *
 * @see @see https://docs.expo.dev/guides/environment-variables/
 */
const SENTRY_DNS = process.env.EXPO_PUBLIC_SENTRY_DNS;
const SENTRY_ACTIVATED = process.env.EXPO_PUBLIC_SENTRY_ACTIVATED;

const initPublicEnvVars = () => {
  storage.setItem('SENTRY_DNS', SENTRY_DNS);
  storage.setItem('SENTRY_ACTIVATED', SENTRY_ACTIVATED);
};

initPublicEnvVars();
