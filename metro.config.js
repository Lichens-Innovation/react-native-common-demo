const { getSentryExpoConfig } = require('@sentry/react-native/metro');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getSentryExpoConfig(__dirname);

const EXTRA_EXTENTSIONS = ["js_", "html"];

config.resolver.assetExts.push(...EXTRA_EXTENTSIONS);
config.resolver.sourceExts = config.resolver.sourceExts.filter(
  (ext) => !EXTRA_EXTENTSIONS.includes(ext)
);

module.exports = config;
