import { db } from "./firebase.js";
import admin from "firebase-admin"
import { samplePlaces } from "./sample-places.js"

async function seedPlaces() {
    try {
        for (const place of samplePlaces) {
            await db.collection("locations").doc(place.id).set({
                name: place.name,
                category: place.category,
                description: place.description,
                location: place.location,
                openingHours: place.openingHours,
                tags: place.tags,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            })
            console.log("Added ", place.name);
        }
        console.log("Finished seeding places");
        process.exit(0);
    } catch (error) {
        console.error("Error occured during seeding: ", error);
        process.exit(1);
    }
}

seedPlaces();