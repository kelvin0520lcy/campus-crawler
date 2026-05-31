export default {
    expo: {
        name: "Campus Crawler",
        slug: "campus-crawler",

        ios: {
            bundleIdentifier: "com.campuscrawler.app",
        },

        android: {
            package: "com.campuscrawler.app",
        },

        "extra": {
            "eas": {
                "projectId": "389dd8e4-f151-4b6c-b91f-ba027c459ac6"
            }
        },

        "plugins": [
            "expo-router",
            [
                "react-native-maps",
                {
                    iosGoogleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                    androidGoogleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                },
            ],
        ]

    },
};