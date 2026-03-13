const path = require('path');
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(__dirname);

const PROJECT_ROOT = path.resolve(__dirname);
const EXTRA_EXTENTSIONS = ['js_', 'html'];
const SINGLETON_PACKAGES = ['@tanstack/react-query', '@tanstack/query-core', 'i18next', 'react-i18next'];

config.resolver.assetExts.push(...EXTRA_EXTENTSIONS);
config.resolver.sourceExts = config.resolver.sourceExts.filter((ext) => !EXTRA_EXTENTSIONS.includes(ext));

// Apply Storybook first so our resolver wraps Storybook's (Storybook expects resolved to always have .filePath)
const configWithStorybook = withStorybook(config, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
});

// Force @tanstack/react-query to resolve from project root (single instance for provider + hooks)
const previousResolveRequest = configWithStorybook.resolver.resolveRequest;
configWithStorybook.resolver.resolveRequest = (context, moduleName, platform) => {
  const isSingleton = SINGLETON_PACKAGES.some((pkg) => moduleName === pkg || moduleName.startsWith(pkg + '/'));
  if (isSingleton) {
    try {
      const resolved = require.resolve(moduleName, { paths: [PROJECT_ROOT] });
      return { type: 'sourceFile', filePath: resolved };
    } catch (err) {
      console.error(
        `[Metro] Singleton package "${moduleName}" not found at project root (${PROJECT_ROOT}). ` +
          'Add it to your app dependencies so a single instance is used.'
      );
      throw err;
    }
  }
  return previousResolveRequest(context, moduleName, platform);
};

module.exports = configWithStorybook;
