import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

const CASH_CROPS = [
  { id: '1', name: 'Cotton', icon: '🦺' },
  { id: '2', name: 'Chilli', icon: '🌶️' },
  { id: '3', name: 'Sugarcane', icon: '🎋' },
  { id: '4', name: 'Maize', icon: '🌽' }
];

export default function SmartFarmingTipsScreen() {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tipsData, setTipsData] = useState(null);

  const fetchSmartTips = () => {
    if (!selectedCrop) return alert("Select a crop first!");
    
    setLoading(true);
    setTipsData(null);

    // Simulating AI JSON Response for High Yield
    setTimeout(() => {
      setTipsData({
        crop_overview: `${selectedCrop} is a high-demand cash crop. Following precision techniques can increase your profit margin by 30%.`,
        smart_sowing_tips: "Use high-density planting (HDP) with 90x30 cm spacing to accommodate more plants per acre. Treat seeds with Imidacloprid before sowing.",
        water_and_nutrient_efficiency: "Implement Drip Irrigation. Apply fertilizers through fertigation to reduce 40% fertilizer waste.",
        yield_boosting_techniques: selectedCrop === 'Cotton' 
          ? "Topping Technique (తలలు తుంచడం): Clip the terminal tip of the plant at 80-90 days to stop vertical growth and increase boll size."
          : "Apply micronutrient spray at flowering stage to prevent flower drop.",
        market_and_harvest_strategy: "Store in moisture-free bags. Wait for MSP announcements before selling to middle-men.",
        profit_multiplier: "Hold stock for 2 months post-harvest; historical data shows a 15-20% price surge in local mandis."
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💡 Smart Farming Tips</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Select a Cash Crop (వాణిజ్య పంట):</Text>
        <View style={styles.grid}>
          {CASH_CROPS.map((crop) => (
            <TouchableOpacity 
              key={crop.id} 
              style={[styles.cropCard, selectedCrop === crop.name && styles.activeCropCard]}
              onPress={() => setSelectedCrop(crop.name)}
            >
              <Text style={styles.cropIcon}>{crop.icon}</Text>
              <Text style={[styles.cropName, selectedCrop === crop.name && styles.activeCropName]}>{crop.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={fetchSmartTips}>
          <Text style={styles.actionButtonText}>Get Smart Tips / చిట్కాలు పొందండి</Text>
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#FFB300" />
            <Text style={styles.loadingText}>లాభదాయకమైన చిట్కాలను AI లెక్కిస్తోంది...</Text>
          </View>
        )}

        {tipsData && (
          <View style={styles.resultsContainer}>
            <Text style={styles.overviewText}>📈 {tipsData.crop_overview}</Text>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>🌱 Smart Sowing (విత్తే విధానం)</Text>
              <Text style={styles.cardDesc}>{tipsData.smart_sowing_tips}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>💧 Water & Nutrients (నీటి యాజమాన్యం)</Text>
              <Text style={styles.cardDesc}>{tipsData.water_and_nutrient_efficiency}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>🚀 Yield Booster (దిగుబడి పెంచే పద్ధతి)</Text>
              <Text style={styles.cardDesc}>{tipsData.yield_boosting_techniques}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>🛒 Harvest & Market (మార్కెట్ వ్యూహం)</Text>
              <Text style={styles.cardDesc}>{tipsData.market_and_harvest_strategy}</Text>
            </View>

            {/* Golden Profit Multiplier Box */}
            <View style={styles.goldenBox}>
              <Text style={styles.goldenBoxTitle}>⭐ Profit Multiplier Tip</Text>
              <Text style={styles.goldenBoxDesc}>{tipsData.profit_multiplier}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { padding: 20, backgroundColor: '#F57F17', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 15 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  cropCard: { width: '48%', backgroundColor: '#FFF', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#E0E0E0', elevation: 2 },
  activeCropCard: { borderColor: '#F57F17', backgroundColor: '#FFFDE7', borderWidth: 2 },
  cropIcon: { fontSize: 40, marginBottom: 10 },
  cropName: { fontSize: 16, fontWeight: '600', color: '#555' },
  activeCropName: { color: '#F57F17', fontWeight: 'bold' },
  actionButton: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 10, alignItems: 'center', elevation: 3 },
  actionButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  loadingBox: { alignItems: 'center', marginTop: 30 },
  loadingText: { marginTop: 10, fontSize: 16, color: '#F57F17', fontWeight: 'bold' },
  resultsContainer: { marginTop: 20 },
  overviewText: { fontSize: 15, color: '#424242', fontStyle: 'italic', marginBottom: 15 },
  infoCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginBottom: 8 },
  cardDesc: { fontSize: 14, color: '#555', lineHeight: 22 },
  goldenBox: { backgroundColor: '#FFF8E1', padding: 20, borderRadius: 12, borderWidth: 2, borderColor: '#FFC107', marginTop: 10, elevation: 4 },
  goldenBoxTitle: { fontSize: 18, fontWeight: 'bold', color: '#FF8F00', marginBottom: 10 },
  goldenBoxDesc: { fontSize: 15, color: '#424242', fontWeight: '600', lineHeight: 22 }
});
