import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // App start అవ్వగానే storage నుండి language, profile load అవుతాయి
    const loadStorageData = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('user_lang');
        const storedProfile = await AsyncStorage.getItem('user_profile');
        if (storedLang) setLanguage(storedLang);
        if (storedProfile) setUserProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error("Failed to load context storage data", e);
      } finally {
        setLoading(false);
      }
    };
    loadStorageData();
  }, []);

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    await AsyncStorage.setItem('user_lang', lang);
  };

  const saveProfile = async (profileData) => {
    setUserProfile(profileData);
    await AsyncStorage.setItem('user_profile', JSON.stringify(profileData));
  };

  return (
    <AppContext.Provider value={{ language, changeLanguage, userProfile, saveProfile, loading }}>
      {children}
    </AppContext.Provider>
  );
};
