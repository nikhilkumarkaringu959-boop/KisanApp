import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Modal } from 'react-native';
import { AppContext } from '../context/AppContext';
import { translations } from '../constants/translations';

const { width } = Dimensions.get('window');

// Placeholder for Dynamic Google Search Banners (Phase 3 లో API కనెక్ట్ చేద్దాం)
const BANNER_DATA = [
  { id: '1', type: 'Critical Alert', title: 'Heavy rain expected tomorrow in your area', color: '#FFEBEE', textColor: '#C62828' },
  { id: '2', type: 'Trending Tip', title: 'Best time to spray Neem Oil for Cotton Pests', color: '#E8F5E9', textColor: '#2E7D32' },
  { id: '3', type: 'Govt Update', title: 'Rythu Bharosa next installment details released', color: '#E3F2FD', textColor: '#1565C0' }
];

export default function HomeScreen({ navigation }) {
  const { userProfile, language } = useContext(AppContext);
  const labels = translations[language];
  const userName = userProfile?.name || 'Farmer';
  
  const [menuVisible, setMenuVisible] = useState(false);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-Sliding Banner Logic
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % BANNER_DATA.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); // Slides every 3 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderBanner = ({ item }) => (
    <View style={[styles.bannerCard, { backgroundColor: item.color }]}>
      <Text style={[styles.bannerType, { color: item.textColor }]}>{item.type}</Text>
      <Text style={[styles.bannerTitle, { color: item.textColor }]}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>KISAN 🍃</Text>
          <Text style={styles.logoSub}>The Smart Farming Assistant</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Text */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>{labels.welcome}, {userName}!</Text>
        <Text style={styles.welcomeSub}>{labels.assistant_subtitle}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Auto Sliding Banner */}
        <View style={styles.bannerContainer}>
          <FlatList
            ref={flatListRef}
            data={BANNER_DATA}
            renderItem={renderBanner}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentIndex(newIndex);
            }}
          />
        </View>

        {/* Main Grid Buttons */}
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('CropInfo')}>
            <Text style={styles.gridIcon}>🌾</Text>
            <Text style={styles.gridText}>Crop Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Weather clicked')}>
            <Text style={styles.gridIcon}>🌤️</Text>
            <Text style={styles.gridText}>Weather</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Fertilizer clicked')}>
            <Text style={styles.gridIcon}>🧪</Text>
            <Text style={styles.gridText}>Fertilizer AI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Pest clicked')}>
            <Text style={styles.gridIcon}>🐛</Text>
            <Text style={styles.gridText}>Pest Control</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Tips clicked')}>
            <Text style={styles.gridIcon}>💡</Text>
            <Text style={styles.gridText}>Farming Tips</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Govt clicked')}>
            <Text style={styles.gridIcon}>🏛️</Text>
            <Text style={styles.gridText}>Govt Schemes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Dropdown Menu Modal */}
      <Modal visible={menuVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuDropdown}>
            <TouchableOpacity><Text style={styles.menuItem}>👤 My Profile</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuItem}>🌐 Change Language</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuItem}>🍃 KISAN Assistant Info</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuItem}>🔔 Notifications</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuItem}>🚜 My Farm Details</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuItem}>🔗 Share App</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuItem}>ℹ️ About Us (v1.0)</Text></TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#FFF', elevation: 3 },
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32' },
  logoSub: { fontSize: 12, color: '#555' },
  menuButton: { padding: 5 },
  menuIcon: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  welcomeSection: { padding: 20 },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20' },
  welcomeSub: { fontSize: 16, color: '#666', marginTop: 5 },
  bannerContainer: { height: 120 },
  bannerCard: { width: width - 40, marginHorizontal: 20, padding: 20, borderRadius: 12, justifyContent: 'center' },
  bannerType: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  bannerTitle: { fontSize: 16, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-around' },
  gridItem: { width: '45%', backgroundColor: '#FFF', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 10, elevation: 2 },
  gridIcon: { fontSize: 40, marginBottom: 10 },
  gridText: { fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-start', alignItems: 'flex-end' },
  menuDropdown: { backgroundColor: '#FFF', width: 250, marginTop: 60, marginRight: 20, borderRadius: 10, padding: 10, elevation: 5 },
  menuItem: { fontSize: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EEE', color: '#333' }
});
