import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../../../context/Auth";
import MapView from "react-native-maps";
import { useLocations } from "../../../hooks/useLocations";
import { useEffect } from "react";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { isOpenNow } from "../../../lib/openingHours";


export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { locations, loading, error, fetchLocations } = useLocations();
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchLocations(openNowOnly);
  }, []);

  const toggleCategories = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter(c => c != category);
      } else {
        return [...prev, category];
      }
    })
  }

  const filteredLocations = locations.filter((location) => {
    if (openNowOnly && !isOpenNow(location)) {
      return false;
    }
    if (selectedCategories.length !== 0 &&
      !selectedCategories.includes(location.category)) {
      return false;
    }
    return true;
  })


  if (false) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userSection}>
        <Text style={styles.title}>Campus Crawlers</Text>
        <Text style={styles.label}>You are signed in as:</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Map</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.2966,
          longitude: 103.7764,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >

      </MapView>

      <Text style={styles.sectionTitle}>Locations: </Text>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Checkbox
          value={openNowOnly}
          onValueChange={setOpenNowOnly}
        />
        <Text>Open Now</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 6 }}>
        <Checkbox
          value={selectedCategories.includes("food")}
          onValueChange={() => toggleCategories("food")}
        />
        <Text>Food</Text>

        <Checkbox
          value={selectedCategories.includes("study")}
          onValueChange={() => toggleCategories("study")}
        />
        <Text>Study</Text>
      </View>

      {loading && <Text style={styles.message}>Loading locations</Text>}
      {error && <Text style={styles.error}>Error fetching locations</Text>}

      {locations.length === 0 && !loading && !error ? (
        <Text style={styles.message}>No locations found.</Text>
      ) : (
        <ScrollView style={styles.locationList}>
          {filteredLocations.map((location) => (
            <Text key={location.id} style={styles.locationItem}>{location.name}</Text>
          ))}
        </ScrollView>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
  },
  userSection: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: "#64748b",
  },
  email: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  message: {
    color: "#475569",
    marginTop: 4,
  },
  error: {
    color: "#dc2626",
    marginTop: 4,
  },
  locationList: {
    marginTop: 4,
  },
  locationItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
});