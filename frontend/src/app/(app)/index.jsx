// mobile/app/(app)/index.jsx

import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuth } from "../../../context/Auth";
import MapView from "react-native-maps";
import { useLocations } from "../../../hooks/useLocations";
import { useEffect } from "react";


export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { locations, loading, fetchLocations } = useLocations();

  useEffect(
    () => {
      fetchLocations();
    }
    , []);

  if (false) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Campus Crawlers</Text>
      <Text>You are signed in as:</Text>
      <Text>{user?.email}</Text>

      <Pressable onPress={logout}>
        <Text>Log Out</Text>
      </Pressable>

      <MapView
        style={{ width: "100%", height: 300 }}
        initialRegion={{
          latitude: 1.2966,
          longitude: 103.7764,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >

      </MapView>

      <Text>Locations: </Text>
      {loading && <Text>Loading locations</Text>}

      {locations.length === 0 && !loading ? (
        <Text>No locations found.</Text>
      ) : (
        locations.map((location) => (
          <Text key={location.id}>{location.name}</Text>
        ))
      )}

    </View>
  );
}