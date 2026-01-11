export default ({ config }) => ({
  ...config,
  name: "Meu Time",
  slug: "meuTime",
  version: "2.5.6",
  orientation: "portrait",
  icon: "./assets/logo-icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/launch_screen.png",
    resizeMode: "contain",
    backgroundColor: "#000000"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true
  },
  android: {
    versionCode: 11,
    adaptiveIcon: {
      foregroundImage: "./assets/logo-icon.png",
      backgroundColor: "#000000"
    },
    package: "com.meunik.meuTime"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "ac077429-24de-4fdf-8eb7-fe45b29f4476"
    }
  },
  plugins: [
    "expo-asset",
    "expo-font",
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: "35.0.0",
          enableProguardInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true
        }
      }
    ]
  ]
});
