import { db } from "../firebase.js";

export async function getLocationById(req, res) {
    try {
        const { id } = req.params;
        const docRef = await db.collection("locations").doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return res.status(404).json({
                error: "Locations not found"
            })
        }
        res.status(200).json({
            id: docSnap.id,
            ...docSnap.data(),
        })

    } catch (error) {
        console.error("Error getting location: ", error);
        res.status(500).json({
            error: "Failed to get location"
        })
    }
}

export async function getLocations(req, res) {
    try {
        const snapshot = await db.collection("locations").get();

        console.log(snapshot);
        const locations = await snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        res.status(200).json({
            locations,
        })

    } catch (error) {
        console.error("Error getting locations: ", error);
        res.status(500).json({
            error: "Failed to get locations"
        })
    }
}