import { applicationDefault, initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore'

initializeApp({
    credential: applicationDefault(),
});

export const db = getFirestore();