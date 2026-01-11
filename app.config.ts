import { ExpoConfig } from 'expo/config';
import packageJson from './package.json';

const config: ExpoConfig = {
  owner: 'lichens',
  name: packageJson.displayName,
  slug: packageJson.name,
  version: packageJson.version,
  scheme: packageJson.name,
  newArchEnabled: true,
  experiments: {
    buildCacheProvider: 'eas',
  },
  plugins: [
    '@config-plugins/react-native-blob-util',
    '@config-plugins/react-native-pdf',
    'expo-font',
    'expo-router',
    'expo-asset',
    'expo-localization',
    'expo-web-browser',
    [
      // https://docs.sentry.io/platforms/react-native/manual-setup/expo/
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        note: 'Use SENTRY_AUTH_TOKEN env to authenticate with Sentry.',
        project: packageJson.name,
        organization: 'lichens-innovation',
      },
    ],
    [
      'expo-secure-store',
      {
        configureAndroidBackup: true,
        faceIDPermission:
          "$(PRODUCT_NAME) a besoin d'accéder à votre Face ID biométrique. \\ This app needs access to your Face ID biometric data.",
      },
    ],
    'expo-sqlite',
    'expo-speech-recognition',
    [
      'expo-build-properties',
      {
        android: {
          usesCleartextTraffic: true, // enable clear text HTTP requests
        },
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          "$(PRODUCT_NAME) a besoin d'accéder à votre localisation pour scanner les réseaux WiFi. \\ This app needs access to your location to scan WiFi networks",
      },
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/images/logo/splash-icon-dark.png',
        imageWidth: 200,
        backgroundColor: '#000000',
        resizeMode: 'contain',
        dark: {
          image: './assets/images/logo/splash-icon-dark.png',
          backgroundColor: '#000000',
        },
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission:
          "$(PRODUCT_NAME) a besoin d'accéder à votre caméra pour scanner les divers codes barre lors des inspections. \\ This app needs access to your camera to scan various barcodes during inspections.",
        microphonePermission:
          "$(PRODUCT_NAME) a besoin d'accéder à votre microphone pour enregistrer des vidéos et notes audios lors des inspections. \\ This app needs access to your microphone to record videos and audio notes during inspections.",
        recordAudioAndroid: true,
      },
    ],
    [
      'react-native-file-viewer-turbo',
      {
        mimeTypes: ['*/*'],
      },
    ],
  ],
  orientation: 'default',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'dark',
  assetBundlePatterns: ['**/*'],
  ios: {
    icon: {
      light: './assets/images/logo/ios-light.png',
      dark: './assets/images/logo/ios-dark.png',
      tinted: './assets/images/logo/ios-tinted.png',
    },
    supportsTablet: true,
    bundleIdentifier: 'com.lichens.offlinerag.app',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSLocationAlwaysUsageDescription:
        "$(PRODUCT_NAME) a besoin d'accéder à votre localisation pour la fonctionnalité WiFi. \\ This app needs access to your location to use WiFi.",
      NSLocationWhenInUseUsageDescription:
        "$(PRODUCT_NAME) a besoin d'accéder à votre localisation pour la fonctionnalité WiFi. \\ This app needs access to your location to use WiFi.",
      NSCameraUsageDescription:
        "$(PRODUCT_NAME) a besoin d'accéder à votre caméra pour prendre des photos lors des inspections. \\ This app needs access to your camera to take photos during inspections.",
      NSPhotoLibraryUsageDescription:
        "$(PRODUCT_NAME) a besoin d'accéder à votre galerie photo pour sélectionner des images lors des inspections. \\ This app needs access to your photo library to select images during inspections.",
    },
    privacyManifests: {
      NSPrivacyCollectedDataTypes: [
        {
          NSPrivacyCollectedDataType: 'NSPrivacyCollectedDataTypeCrashData',
          NSPrivacyCollectedDataTypeLinked: false,
          NSPrivacyCollectedDataTypeTracking: false,
          NSPrivacyCollectedDataTypePurposes: ['NSPrivacyCollectedDataTypePurposeAppFunctionality'],
        },
        {
          NSPrivacyCollectedDataType: 'NSPrivacyCollectedDataTypePerformanceData',
          NSPrivacyCollectedDataTypeLinked: false,
          NSPrivacyCollectedDataTypeTracking: false,
          NSPrivacyCollectedDataTypePurposes: ['NSPrivacyCollectedDataTypePurposeAppFunctionality'],
        },
        {
          NSPrivacyCollectedDataType: 'NSPrivacyCollectedDataTypeOtherDiagnosticData',
          NSPrivacyCollectedDataTypeLinked: false,
          NSPrivacyCollectedDataTypeTracking: false,
          NSPrivacyCollectedDataTypePurposes: ['NSPrivacyCollectedDataTypePurposeAppFunctionality'],
        },
      ],
      NSPrivacyAccessedAPITypes: [
        {
          NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryUserDefaults',
          NSPrivacyAccessedAPITypeReasons: ['CA92.1'],
        },
        {
          NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategorySystemBootTime',
          NSPrivacyAccessedAPITypeReasons: ['35F9.1'],
        },
        {
          NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryFileTimestamp',
          NSPrivacyAccessedAPITypeReasons: ['C617.1'],
        },
      ],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/logo/adaptive-icon.png',
      monochromeImage: './assets/images/logo/adaptive-icon.png',
      backgroundColor: '#000000',
    },
    package: 'com.lichens.offlinerag.app',
    permissions: [
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.ACCESS_WIFI_STATE',
      'android.permission.CHANGE_WIFI_STATE',
      'android.permission.INTERNET',
      'android.permission.CHANGE_WIFI_MULTICAST_STATE',
      'android.permission.CAMERA',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
    ],
  },
  extra: {
    router: { origin: false },
  },
  runtimeVersion: '1.0.0',
};

export default config;
