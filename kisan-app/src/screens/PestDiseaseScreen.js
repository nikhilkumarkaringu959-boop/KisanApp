import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../context/AppContext';

export default function PestDiseaseScreen() {
  const { language } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('chemical'); // 'chemical' or 'organic'

  const pickImage = async (useCamera = false) => {
    let result;
    if (useCamera) {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.8 });
    } else {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.8 });
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage();
    }
  };

  const analyzeImage = () => {
    setLoading(true);
    setAnalysisResult(null);

    // Simulating AI Vision API Call
    setTimeout(() => {
      setAnalysisResult({
        identified_issue: "కాండం తొలిచే పురుగు (Stem Borer)",
        confidence_score: "94%",
        symptoms: [
          "ఆకుల పై పసుపు రంగు మచ్చలు",
          "కాండం లోపల రంధ్రాలు",
          "మొక్క ఎదుగుదల ఆగిపోవడం"
        ],
        solutions: {
          chemical_control: "Cartap Hydrochloride 4G (కార్టాప్ హైడ్రోక్లోరైడ్) ఎకరాకు 8 కిలోలు ఇసుకలో కలిపి చల్లాలి.",
          organic_control: "వేప నూనె (Neem Oil 10000 ppm) 1 లీటరు నీటికి 2ml చొప్పున కలిపి పిచికారీ చేయాలి. పసుపు రంగు అట్టలు వాడాలి."
        },
        prevention_tips: "పంట కోత తర్వాత పొలంలో మిగిలిన మొదళ్లను కాల్చేయాలి లేదా లోతుగా దున్నాలి.",
        reference_image: "https://via.placeholder.com/150/FFCDD2/000000?text=Stem+Borer" // Mock reference image
      });
      setLoading(false);
    }, 3000); // 3 seconds scanning animation
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🐛 Smart Pest Control</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Upload Section */}
        {!image && !loading && !analysisResult && (
          <View style={styles.uploadSection}>
            <Text style={styles.uploadTitle}>Scan Crop / Upload Photo</Text>
            <Text style={styles.uploadSub}>తెగులు సోకిన ఆకు లేదా మొక్క ఫోటో తీయండి</Text>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.camButton} onPress={() => pickImage(true)}>
                <Text style={styles.camButtonText}>📷 Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.galButton} onPress={() => pickImage(false)}>
                <Text style={styles.galButtonText}>🖼️ Gallery</Text>
              </TouchableOpacity>
            </View>

            {/* Browse Library */}
            <Text style={styles.libraryTitle}>📚 Common Pests Library</Text>
            <View style={styles.libraryGrid}>
              {['వరి (Rice)', 'పత్తి (Cotton)', 'మిర్చి (Chilli)'].map((crop, idx) => (
                <View key={idx} style={styles.libraryItem}>
                  <Text style={styles.libraryText}>{crop}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Scanning Animation State */}
        {loading && (
          <View style={styles.scanningBox}>
            <Image source={{ uri: image }} style={styles.scanningImage} />
            <View style={styles.scanOverlay}>
              <ActivityIndicator size="large" color="#FFF" />
              <Text style={styles.scanText}>తెగులును గుర్తిస్తోంది...</Text>
              <Text style={styles.scanSubText}>AI is analyzing the disease</Text>
            </View>
          </View>
        )}

        {/* Results Dashboard */}
        {analysisResult && !loading && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultTitle}>✅ AI Diagnosis Complete</Text>
            
            <View style={styles.splitView}>
              <View style={styles.imageBox}>
                <Text style={styles.imageLabel}>Your Photo</Text>
                <Image source={{ uri: image }} style={styles.resultImg} />
              </View>
              <View style={styles.imageBox}>
                <Text style={styles.imageLabel}>Verified Match ({analysisResult.confidence_score})</Text>
                <Image source={{ uri: analysisResult.reference_image }} style={styles.resultImg} />
              </View>
            </View>

            <View style={styles.issueBox}>
              <Text style={styles.issueName}>🚨 {analysisResult.identified_issue}</Text>
              <Text style={styles.symptomsTitle}>Symptoms (లక్షణాలు):</Text>
              {analysisResult.symptoms.map((sym, i) => <Text key={i} style={styles.symptomText}>• {sym}</Text>)}
            </View>

            {/* Tabs for Solutions */}
            <View style={styles.tabRow}>
              <TouchableOpacity style={[styles.tabBtn, activeTab === 'chemical' && styles.activeTabChem]} onPress={() => setActiveTab('chemical')}>
                <Text style={[styles.tabText, activeTab === 'chemical' && styles.activeTabText]}>🧪 రసాయన నివారణ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabBtn, activeTab === 'organic' && styles.activeTabOrg]} onPress={() => setActiveTab('organic')}>
                <Text style={[styles.tabText, activeTab === 'organic' && styles.activeTabText]}>🌿 సేంద్రీయ నివారణ</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.solutionBox, activeTab === 'chemical' ? styles.chemBox : styles.orgBox]}>
              <Text style={styles.solutionText}>
                {activeTab === 'chemical' ? analysisResult.solutions.chemical_control : analysisResult.solutions.organic_control}
              </Text>
            </View>

            <View style={styles.preventionBox}>
              <Text style={styles.preventionTitle}>🛡️ Prevention (నివారణ చర్యలు):</Text>
              <Text style={styles.preventionText}>{analysisResult.prevention_tips}</Text>
            </View>

            <TouchableOpacity style={styles.resetBtn} onPress={() => {setImage(null); setAnalysisResult(null);}}>
              <Text style={styles.resetBtnText}>🔄 Scan Another Crop</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { padding: 20, backgroundColor: '#D32F2F', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 15 },
  uploadSection: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, alignItems: 'center', elevation: 3 },
  uploadTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  uploadSub: { fontSize: 14, color: '#666', marginBottom: 20, marginTop: 5 },
  buttonRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
  camButton: { backgroundColor: '#D32F2F', padding: 15, borderRadius: 10, width: '45%', alignItems: 'center' },
  galButton: { backgroundColor: '#1976D2', padding: 15, borderRadius: 10, width: '45%', alignItems: 'center' },
  camButtonText: { color: '#FFF', fontWeight: 'bold' },
  galButtonText: { color: '#FFF', fontWeight: 'bold' },
  libraryTitle: { marginTop: 30, fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-start' },
  libraryGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 10 },
  libraryItem: { backgroundColor: '#E0E0E0', padding: 10, borderRadius: 8 },
  libraryText: { color: '#333', fontWeight: '600' },
  scanningBox: { position: 'relative', borderRadius: 15, overflow: 'hidden', height: 300 },
  scanningImage: { width: '100%', height: '100%' },
  scanOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(211, 47, 47, 0.7)', justifyContent: 'center', alignItems: 'center' },
  scanText: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  scanSubText: { color: '#FFF', fontSize: 14, marginTop: 5 },
  resultsContainer: { marginTop: 10 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', marginBottom: 15 },
  splitView: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  imageBox: { width: '48%' },
  imageLabel: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 5, textAlign: 'center' },
  resultImg: { width: '100%', height: 120, borderRadius: 10, borderWidth: 1, borderColor: '#CCC' },
  issueBox: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  issueName: { fontSize: 18, fontWeight: 'bold', color: '#D32F2F', marginBottom: 10 },
  symptomsTitle: { fontWeight: 'bold', color: '#333', marginBottom: 5 },
  symptomText: { color: '#555', fontSize: 14, marginBottom: 3 },
  tabRow: { flexDirection: 'row', marginBottom: 10 },
  tabBtn: { flex: 1, padding: 12, alignItems: 'center', backgroundColor: '#E0E0E0', borderRadius: 8, marginHorizontal: 2 },
  activeTabChem: { backgroundColor: '#1976D2' },
  activeTabOrg: { backgroundColor: '#388E3C' },
  tabText: { fontWeight: 'bold', color: '#555' },
  activeTabText: { color: '#FFF' },
  solutionBox: { padding: 15, borderRadius: 10, marginBottom: 15 },
  chemBox: { backgroundColor: '#E3F2FD', borderWidth: 1, borderColor: '#90CAF9' },
  orgBox: { backgroundColor: '#E8F5E9', borderWidth: 1, borderColor: '#A5D6A7' },
  solutionText: { fontSize: 15, color: '#333', lineHeight: 22 },
  preventionBox: { backgroundColor: '#FFF3E0', padding: 15, borderRadius: 10, marginBottom: 20 },
  preventionTitle: { fontWeight: 'bold', color: '#E65100', marginBottom: 5 },
  preventionText: { color: '#555' },
  resetBtn: { backgroundColor: '#757575', padding: 15, borderRadius: 10, alignItems: 'center' },
  resetBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
