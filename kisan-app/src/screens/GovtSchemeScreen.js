import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, Linking } from 'react-native';

const STATES = ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu'];

// Mocked real-time Google Search data structure
const SCHEMES_DATA = {
  'Telangana': [
    { name: "Rythu Bharosa 2026", regionalName: "రైతు భరోసా", status: "Next installment expected in June 2026.", eligibility: "₹7,500 per acre/season for eligible farmers.", docs: "Aadhaar, Passbook", link: "https://rythubandhu.telangana.gov.in/" },
    { name: "Runa Maaphee Status", regionalName: "రుణమాఫీ", status: "Phase 3 eligibility list released.", eligibility: "Crop loans up to ₹2 Lakhs waived off.", docs: "Bank Account, Aadhaar", link: "https://clw.telangana.gov.in/" }
  ],
  'Andhra Pradesh': [
    { name: "YSR Rythu Bharosa", regionalName: "వైఎస్సార్ రైతు భరోసా", status: "₹13,500 yearly assistance active.", eligibility: "Landowners & Tenant farmers.", docs: "Aadhaar, Tenant Card", link: "https://ysrrythubharosa.ap.gov.in/" }
  ],
  'Karnataka': [
    { name: "Bele Vime (Crop Insurance)", regionalName: "ಬೆಳೆ ವಿಮೆ", status: "Kharif 2026 registrations open.", eligibility: "All farmers growing notified crops.", docs: "RTC, Aadhaar, Bank Passbook", link: "https://samrakshane.karnataka.gov.in/" }
  ],
  'Tamil Nadu': [
    { name: "Uzhavar Sandhai Schemes", regionalName: "உழவர் சந்தை", status: "New subsidies for drip irrigation available.", eligibility: "Small and marginal farmers.", docs: "Chitta, Adangal", link: "https://www.tnagrisnet.tn.gov.in/" }
  ]
};

export default function GovtSchemesScreen() {
  const [selectedState, setSelectedState] = useState('Telangana');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const fetchSchemes = () => {
    setLoading(true);
    setResults([]);
    // Simulating API/Live Search delay
    setTimeout(() => {
      setResults(SCHEMES_DATA[selectedState]);
      setLoading(false);
    }, 1500);
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏛️ Govt Schemes & Updates</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Select Your State:</Text>
        <View style={styles.stateRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {STATES.map((state) => (
              <TouchableOpacity 
                key={state} 
                style={[styles.stateBtn, selectedState === state && styles.activeStateBtn]} 
                onPress={() => setSelectedState(state)}
              >
                <Text style={[styles.stateText, selectedState === state && styles.activeStateText]}>{state}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={fetchSchemes}>
          <Text style={styles.searchButtonText}>Check Govt Schemes & Updates</Text>
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#2E7D32" />
            <Text style={styles.loadingText}>ప్రభుత్వ అధికారిక సమాచారాన్ని సేకరిస్తోంది...</Text>
          </View>
        )}

        {!loading && results.length > 0 && (
          <ScrollView showsVerticalScrollIndicator={false} style={styles.resultsContainer}>
            {results.map((scheme, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.schemeName}>{scheme.name} <Text style={styles.regionalName}>({scheme.regionalName})</Text></Text>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>🔔</Text>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Latest Status (2026):</Text>
                    <Text style={styles.infoValue}>{scheme.status}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>💰</Text>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Benefits:</Text>
                    <Text style={styles.infoValue}>{scheme.eligibility}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>📄</Text>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Required Docs:</Text>
                    <Text style={styles.infoValue}>{scheme.docs}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.linkButton} onPress={() => openLink(scheme.link)}>
                  <Text style={styles.linkButtonText}>🌐 Go to Official Website</Text>
                </TouchableOpacity>
              </View>
            ))}
            <View style={{height: 50}} />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6' },
  header: { padding: 20, backgroundColor: '#1565C0', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 15, flex: 1 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  stateRow: { flexDirection: 'row', marginBottom: 20 },
  stateBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, backgroundColor: '#E0E0E0', marginRight: 10 },
  activeStateBtn: { backgroundColor: '#1565C0' },
  stateText: { color: '#555', fontWeight: 'bold' },
  activeStateText: { color: '#FFF' },
  searchButton: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20, elevation: 3 },
  searchButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  loadingBox: { alignItems: 'center', marginTop: 40 },
  loadingText: { marginTop: 15, fontSize: 16, color: '#2E7D32', fontWeight: 'bold' },
  resultsContainer: { flex: 1 },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 4, borderLeftWidth: 5, borderLeftColor: '#1565C0' },
  schemeName: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20', marginBottom: 15 },
  regionalName: { fontSize: 16, color: '#555', fontWeight: 'normal' },
  infoRow: { flexDirection: 'row', marginBottom: 12, paddingRight: 15 },
  infoIcon: { fontSize: 20, marginRight: 10 },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 12, color: '#777', fontWeight: 'bold' },
  infoValue: { fontSize: 14, color: '#333', marginTop: 2 },
  linkButton: { backgroundColor: '#E3F2FD', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#90CAF9' },
  linkButtonText: { color: '#1565C0', fontWeight: 'bold', fontSize: 14 }
});
