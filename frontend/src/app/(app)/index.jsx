import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../../../context/Auth";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocations } from "../../../hooks/useLocations";
import { useEffect, useState, useRef } from "react";
import Checkbox from "expo-checkbox";
import { isOpenNow } from "../../../lib/openingHours";
import { router } from "expo-router";
import { Platform } from "react-native";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { locations, loading, error, fetchLocations } = useLocations();
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedLocationId, setExpandedLocationId] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    fetchLocations(openNowOnly);
  }, []);

  const expandedLocation = locations.find((location) => {
    return location.id === expandedLocationId;
  })

  useEffect(() => {
    if (!expandedLocation) return;
    mapRef.current?.animateToRegion({
      latitude: expandedLocation.location?.latitude,
      longitude: expandedLocation.location?.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }, 500)
  }, [expandedLocation])


  const toggleCategories = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter(c => c != category);
      } else {
        return [...prev, category];
      }
    })
  }

  const toggleLocations = (location) => {
    if (expandedLocationId === location.id) {
      setExpandedLocationId(null);
    } else {
      setExpandedLocationId(location.id);
    }
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
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={styles.title}>Campus Crawlers</Text>

        <Pressable style={styles.button} onPress={() => router.push('/account')}>
          <Text style={styles.buttonText}>Account</Text>
        </Pressable>

      </View>
      <Text style={styles.sectionTitle}>Map</Text>

      <MapView
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 1.2966,
          longitude: 103.7764,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {expandedLocation && <Marker
          coordinate={{
            latitude: expandedLocation.location.latitude,
            longitude: expandedLocation.location.longitude,
          }}
          title={expandedLocation.name}
        />}
      </MapView>

      <Text style={styles.sectionTitle}>Locations: </Text>

      <View style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          <Checkbox
            value={openNowOnly}
            onValueChange={setOpenNowOnly}
          />
          <Text style={styles.label}>Open Now</Text>
        </View>
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>
          Categories:
        </Text>
        <View style={styles.checkbox}>
          <Checkbox
            value={selectedCategories.includes("food")}
            onValueChange={() => toggleCategories("food")}
          />
          <Text style={styles.label}>Food</Text>
        </View>
        <View style={styles.checkbox}>
          <Checkbox
            value={selectedCategories.includes("study")}
            onValueChange={() => toggleCategories("study")}
          />
          <Text style={styles.label}>Study</Text>
        </View>
      </View>

      {loading && <Text style={styles.message}>Loading locations</Text>}
      {error && <Text style={styles.error}>Error fetching locations</Text>}

      {locations.length === 0 && !loading && !error ? (
        <Text style={styles.message}>No locations found.</Text>
      ) : (
        <ScrollView style={styles.locationList}>
          {filteredLocations.map((location) => {
            const isExpanded = expandedLocationId === location.id;
            return (
              <Pressable
                key={location.id}
                onPress={() => toggleLocations(location)}
              >
                <Text style={styles.locationItem}>
                  {location.name}
                </Text>
                {isExpanded && (
                  <Text style={styles.locationDescription}>{location.description}</Text>
                )}
              </Pressable>
            )
          })}
        </ScrollView>
      )
      }

    </View >
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
  header: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"

  },
  label: {
    fontSize: 14,
    color: "#192230",
  },
  email: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1469d1",
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
  locationDescription: {
    backgroundColor: "f8fafc",
    padding: 10,
    paddingLeft: 15,
    paddingTop: 2,
    marginBottom: 8,
  },
  checkbox: {
    flexDirection: "row",
    gap: 8
  },
  checkboxContainer: {
    flexDirection: "row",
    gap: 20,
    padding: 5,
  }
});