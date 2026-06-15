import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const CROP_DATA = [
  {
    season: 'Kharif Crops',
    color: '#E8F5E9',
    categories: [
      { name: '🌾 Cereals & Millets', items: ['Rice', 'Paddy', 'Corn', 'Jowar', 'Bajra', 'Ragi'] },
      { name: '🌱 Pulses', items: ['Tur', 'Moong', 'Urad'] },
      { name: '🌻 Oil Seeds', items: ['Soybean', 'Groundnut', 'Sunflower', 'Sesame'] },
      { name: '🧶 Fiber & Cash Crops', items: ['Cotton', 'Jute', 'Sugarcane'] },
      { name: '🥒 Vegetables & Spices', items: ['Ladyfinger', 'Brinjal', 'Chili', 'Bitter Gourd'] }
    ]
  },
  {
    season: 'Rabi Crops',
    color: '#FFF3E0',
    categories: [
      { name: '🌾 Cereals', items: ['Wheat', 'Barley', 'Oats', 'Maize / Rabi Corn'] },
      { name: '🌱 Pulses', items: ['Bengal Gram', 'Green Peas', 'Lentils', 'Black Gram / Urad'] },
      { name: '🌻 Oil Seeds', items: ['Mustard', 'Linseed / Flaxseed', 'Safflower'] },
      { name: '🧶 Cash Crops', items: ['Sugarcane'] },
      { name: '🥒 Vegetables & Spices', items: ['Potato', 'Onion', 'Tomato', 'Cauliflower', 'Cabbage', 'Garlic', 'Coriander'] }
    ]
  },
  {
    season: 'Zaid Crops',
    color: '#E3F2FD',
    categories: [
      { name: '🌾 Cereals', items: ['Summer Paddy', 'Summer Maize'] },
      { name: '🌱 Pulses', items: ['Moong Dal / Green Gram', 'Cowpea / Babbar'] },
      { name: '🌻 Oil Seeds', items: ['Groundnut', 'Sunflower', 'Sesame'] },
      { name: '🍉 Fruits & Vegetables', items: ['Watermelon', 'Muskmelon', 'Cucumber', 'Bitter Gourd', 'Pumpkin', 'Bottle Gourd', 'Ridge Gourd'] }
    ]
  }
];

export default function CropInfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crop Information</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {CROP_DATA.map((season, index) => (
          <View key={index} style={[styles.seasonCard, { backgroundColor: season.color }]}>
            <Text style={styles.seasonTitle}>{season.season}</Text>
            
            {season.categories.map((category, catIndex) => (
              <View key={catIndex} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <View style={styles.itemsRow}>
                  {category.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.itemBadge}>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { padding: 20, backgroundColor: '#2E7D32', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  scrollContent: { padding: 15 },
  seasonCard: { padding: 15, borderRadius: 15, marginBottom: 20, elevation: 2 },
  seasonTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingBottom: 10 },
  categoryContainer: { marginBottom: 15 },
  categoryTitle: { fontSize: 18, fontWeight: 'bold', color: '#555', marginBottom: 10 },
  itemsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  itemBadge: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#DDD', marginBottom: 5 },
  itemText: { fontSize: 14, color: '#333', fontWeight: '500' }
});
