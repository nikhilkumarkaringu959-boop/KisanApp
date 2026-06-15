import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function WeatherScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Function triggered by button press
  const fetchLiveWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using Open-Meteo API for real-time accurate data (Hyderabad coordinates as default/example)
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=17.3850&longitude=78.4867&current=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto'
      );
      
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("వాతావరణ సమాచారం పొందడంలో లోపం ఏర్పడింది. దయచేసి ఇంటర్నెట్ కనెక్షన్ సరిచూసుకోండి.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>☁️ Smart Weather Forecast</Text>
      </View>

      {!weatherData && !loading && (
        <View style={styles.centerBox}>
          <Text style={styles.infoText}>మీ ప్రాంత వాతావరణ వివరాల కోసం క్లిక్ చేయండి</Text>
          <TouchableOpacity style={styles.actionButton} onPress={fetchLiveWeather}>
            <Text style={styles.actionButtonText}>Get Live Weather / వాతావరణం తెలుసుకోండి</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#1E88E5" />
          <Text style={styles.loadingText}>వాతావరణ సమాచారాన్ని సేకరిస్తోంది...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <TouchableOpacity style={styles.actionButton} onPress={fetchLiveWeather}>
            <Text style={styles.actionButtonText}>Retry / మళ్ళీ ప్రయత్నించండి</Text>
          </TouchableOpacity>
        </View>
      )}

      {weatherData && !loading && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Current Weather Box */}
          <View style={styles.currentCard}>
            <Text style={styles.currentCity}>Current Location</Text>
            <View style={styles.tempRow}>
              <Text style={styles.currentTemp}>{weatherData.current.temperature_2m}°C</Text>
              <Text style={styles.weatherIcon}>🌤️</Text>
            </View>
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}><Text>💧 {weatherData.current.relative_humidity_2m}%</Text><Text style={styles.detailLabel}>Humidity</Text></View>
              <View style={styles.detailItem}><Text>💨 {weatherData.current.wind_speed_10m} km/h</Text><Text style={styles.detailLabel}>Wind</Text></View>
              <View style={styles.detailItem}><Text>🌧️ {weatherData.current.precipitation_probability}%</Text><Text style={styles.detailLabel}>Rain Prob</Text></View>
            </View>
          </View>

          {/* 24-Hour Forecast (Horizontal Scroll) */}
          <Text style={styles.sectionTitle}>⏳ 24-Hour Forecast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
            {weatherData.hourly.temperature_2m.slice(0, 24).map((temp, index) => (
              <View key={index} style={styles.hourlyCard}>
                <Text style={styles.hourlyTime}>{index}:00</Text>
                <Text style={styles.hourlyIcon}>{weatherData.hourly.precipitation_probability[index] > 50 ? '🌧️' : '☀️'}</Text>
                <Text style={styles.hourlyTemp}>{temp}°C</Text>
              </View>
            ))}
          </ScrollView>

          {/* 10-Day Forecast (Vertical List) */}
          <Text style={styles.sectionTitle}>📅 10-Day Outlook</Text>
          <View style={styles.dailyContainer}>
            {weatherData.daily.temperature_2m_max.map((maxTemp, index) => (
              <View key={index} style={styles.dailyRow}>
                <Text style={styles.dailyDay}>{index === 0 ? 'Today' : `Day ${index + 1}`}</Text>
                <Text style={styles.dailyRain}>🌧️ {weatherData.daily.precipitation_probability_max[index]}%</Text>
                <Text style={styles.dailyTemp}>{weatherData.daily.temperature_2m_min[index]}°C - {maxTemp}°C</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={[styles.actionButton, {marginTop: 20}]} onPress={fetchLiveWeather}>
            <Text style={styles.actionButtonText}>🔄 Refresh Data</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F8FF' },
  header: { padding: 20, backgroundColor: '#1E88E5', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  infoText: { fontSize: 16, color: '#555', marginBottom: 20 },
  loadingText: { marginTop: 15, fontSize: 16, color: '#1E88E5', fontWeight: 'bold' },
  errorText: { color: '#D32F2F', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  actionButton: { backgroundColor: '#1E88E5', paddingVertical: 14, paddingHorizontal: 25, borderRadius: 10, elevation: 3 },
  actionButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  scrollContent: { padding: 15 },
  currentCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, elevation: 4, alignItems: 'center', marginBottom: 20 },
  currentCity: { fontSize: 16, color: '#777', fontWeight: '600' },
  tempRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  currentTemp: { fontSize: 48, fontWeight: 'bold', color: '#333' },
  weatherIcon: { fontSize: 48, marginLeft: 10 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderColor: '#EEE' },
  detailItem: { alignItems: 'center' },
  detailLabel: { fontSize: 12, color: '#888', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  hourlyScroll: { marginBottom: 20 },
  hourlyCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginRight: 10, alignItems: 'center', minWidth: 70, elevation: 2 },
  hourlyTime: { fontSize: 14, color: '#666' },
  hourlyIcon: { fontSize: 24, marginVertical: 8 },
  hourlyTemp: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  dailyContainer: { backgroundColor: '#FFF', borderRadius: 15, padding: 15, elevation: 3 },
  dailyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  dailyDay: { flex: 1, fontSize: 16, fontWeight: '600', color: '#444' },
  dailyRain: { flex: 1, fontSize: 14, color: '#0288D1', textAlign: 'center' },
  dailyTemp: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'right' }
});
