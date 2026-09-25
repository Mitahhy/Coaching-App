const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 1. Gérer les extensions .cjs requises par Firebase
config.resolver.sourceExts.push('cjs');

// 2. FORCE Metro à charger la version React Native / Mobile
config.resolver.resolverMainFields = ['react-native', 'native', 'browser', 'main'];

module.exports = config;
