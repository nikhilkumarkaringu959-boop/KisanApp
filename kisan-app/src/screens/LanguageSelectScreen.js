import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
];

export default function LanguageSelectScreen({ navigation }) {
  const { changeLanguage } = useContext(AppContext);

  const handleSelect = (code) => {
    changeLanguage(code);
    navigation.navigate('ProfileSetup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Language / మీ భాషను ఎంచుకోండి</Text>
      <View style={styles.grid}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity 
            key={lang.code} 
            style={styles.button} 
            onPress={() => handleSelect(lang.code)}
          >
            <Text style={styles.buttonText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 30, color: '#2E7D32', textAlign: 'center' },
  grid: { width: '100%', alignItems: 'stretch' },
  button: { backgroundColor: '#E8F5E9', padding: 18, borderRadius: 10, marginVertical: 8, borderWidth: 1, borderColor: '#A5D6A7', alignItems: 'center' },
  buttonText: { fontSize: 18, color: '#1B5E20', fontWeight: '600' }
});
