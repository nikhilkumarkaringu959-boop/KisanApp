import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function FertilizerScreen() {
  const { userProfile } = useContext(AppContext);
  const [cropName, setCropName] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState(null);

  const landSize = userProfile?.landSize ? parseFloat(userProfile.landSize) : 1; // Default to 1 Acre if not set

  const fetchFertilizerSchedule = () => {
    if (!cropName) {
      alert("Please enter a crop name first!");
      return;
    }
    setLoading(true);
    setAiData(null);

    // Simulating AI Backend JSON Response based on your prompt instructions
    setTimeout(() => {
      const mockAiResponse = {
        crop_summary: `${cropName} requires balanced Nitrogen and Phosphorus for maximum tillering and yield in ${landSize} acres.`,
        chemical_calculator: {
          Urea: `${(40 * landSize).toFixed(1)} kg`,
          DAP: `${(20 * landSize).toFixed(1)} kg`,
          MOP: `${(15 * landSize).toFixed(1)} kg`
        },
        organic_calculator: {
          Vermicompost: `${(500 * landSize).toFixed(0)} kg`,
          FarmyardManure: `${(2 * landSize).toFixed(1)} tons`,
          NeemCake: `${(100 * landSize).toFixed(0)} kg`
        },
        situation_guide: [
          {
            stage_name: "Basal Stage (విత్తే సమయం)",
            chemical_dosage: "Apply full DAP and MOP, and 1/3rd Urea.",
            organic_dosage: "Apply Farmyard Manure & Neem Cake.",
            application_tip: "Apply when soil has good moisture (తేమ ఉన్నప్పుడు మాత్రమే వేయాలి)."
          },
          {
            stage_name: "Vegetative Stage (పెరుగుదల దశ)",
            chemical_dosage: "Apply 1/3rd Urea.",
            organic_dosage: "Spray Jeevamrutham (జీవామృతం).",
            application_tip: "Ensure field is weed-free before application."
          },
          {
            stage_name: "Flowering Stage (పూత దశ)",
            chemical_dosage: "Apply remaining 1/3rd Urea.",
            organic_dosage: "Apply Vermicompost near roots.",
            application_tip: "Do not apply excessive nitrogen to avoid pest attacks."
          }
        ]
      };
      setAiData(mockAiResponse);
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🧪 AI Fertilizer Calculator</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputCard}>
          <Text style={styles.label}>Enter Crop Name (పంట పేరు):</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g., Paddy, Cotton, Chilli" 
            value={cropName} 
            onChangeText={setCropName} 
          />
          <Text style={styles.subText}>Calculating for: {landSize} Acres (from profile)</Text>
          
          <TouchableOpacity style={styles.calcButton} onPress={fetchFertilizerSchedule}>
            <Text style={styles.calcButtonText}>Calculate Fertilizer / ఎరువులు లెక్కించు</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>AI is calculating best nutrients...</Text>
          </View>
        )}

        {aiData && (
          <View style={styles.resultsContainer}>
            <Text style={styles.summaryText}>💡 {aiData.crop_summary}</Text>

            <Text style={styles.sectionTitle}>🧪 Chemical Needs ({landSize} Acres)</Text>
            <View style={styles.card}>
              <Text style={styles.listItem}>• Urea (Nitrogen): <Text style={styles.bold}>{aiData.chemical_calculator.Urea}</Text></Text>
              <Text style={styles.listItem}>• DAP (Phosphorus): <Text style={styles.bold}>{aiData.chemical_calculator.DAP}</Text></Text>
              <Text style={styles.listItem}>• MOP (Potassium): <Text style={styles.bold}>{aiData.chemical_calculator.MOP}</Text></Text>
            </View>

            <Text style={styles.sectionTitle}>🌿 Organic Alternatives ({landSize} Acres)</Text>
            <View style={styles.card}>
              <Text style={styles.listItem}>• Vermicompost: <Text style={styles.bold}>{aiData.organic_calculator.Vermicompost}</Text></Text>
              <Text style={styles.listItem}>• Farmyard Manure: <Text style={styles.bold}>{aiData.organic_calculator.FarmyardManure}</Text></Text>
              <Text style={styles.listItem}>• Neem Cake: <Text style={styles.bold}>{aiData.organic_calculator.NeemCake}</Text></Text>
            </View>

            <Text style={styles.sectionTitle}>📅 Stage-wise Application Guide</Text>
            {aiData.situation_guide.map((stage, index) => (
              <View key={index} style={styles.stageCard}>
                <Text style={styles.stageName}>{stage.stage_name}</Text>
                <Text style={styles.stageDetail}><Text style={styles.bold}>Chemical:</Text> {stage.chemical_dosage}</Text>
                <Text style={styles.stageDetail}><Text style={styles.bold}>Organic:</Text> {stage.organic_dosage}</Text>
                <Text style={styles.tipText}>⚠️ Tip: {stage.application_tip}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6' },
  header: { padding: 20, backgroundColor: '#388E3C', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 15 },
  inputCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, elevation: 3 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#FAFAFA' },
  subText: { fontSize: 12, color: '#777', marginTop: 5, fontStyle: 'italic' },
  calcButton: { backgroundColor: '#388E3C', padding: 15, borderRadius: 8, marginTop: 15, alignItems: 'center' },
  calcButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  loadingBox: { alignItems: 'center', marginTop: 30 },
  loadingText: { marginTop: 10, fontSize: 16, color: '#388E3C', fontWeight: 'bold' },
  resultsContainer: { marginTop: 20 },
  summaryText: { fontSize: 15, color: '#1B5E20', backgroundColor: '#E8F5E9', padding: 15, borderRadius: 8, marginBottom: 20, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 2 },
  listItem: { fontSize: 15, color: '#444', marginBottom: 5 },
  bold: { fontWeight: 'bold', color: '#000' },
  stageCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#388E3C', elevation: 2 },
  stageName: { fontSize: 16, fontWeight: 'bold', color: '#388E3C', marginBottom: 8 },
  stageDetail: { fontSize: 14, color: '#444', marginBottom: 5 },
  tipText: { fontSize: 13, color: '#D32F2F', marginTop: 5, fontStyle: 'italic', fontWeight: '600' }
});
