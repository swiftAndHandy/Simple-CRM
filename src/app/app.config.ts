import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simplecrm-5afda","appId":"1:370384440059:web:8a8561538a0e5dd4983e5e","storageBucket":"simplecrm-5afda.appspot.com","apiKey":"AIzaSyBfF8ob256bkUSkQvLyxlj6Q4KkEzHa65E","authDomain":"simplecrm-5afda.firebaseapp.com","messagingSenderId":"370384440059"})), provideFirestore(() => getFirestore())]
};
