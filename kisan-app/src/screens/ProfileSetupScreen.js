import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext';
import { translations } from '../constants/translations';

export default function ProfileSetupScreen() {
  const { language, saveProfile } = useContext(AppContext);
  const labels = translations[language];

  const [form, setForm] = useState({
    name: '', age: '', gender: 'Male',
    state: 'Telangana', district: '', mandal: '', village: '',
    landSize: '', soilType: 'Black Soil'
  });

  const states = ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu'];
  const soils = ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Laterite Soil'];

  const handleSubmit = () => {
    if (!form.name || !form.district || !form.mandal || !form.village || !form.landSize) {
      alert("Please fill all manual fields, mowa!");
      return;
    }
    // Guntas to Acre helper conversion visualization logic can go here (e.g. 40 Guntas = 1 Acre)
    saveProfile(form);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>{labels.save_profile}</Text>

        <Text style={styles.label}>{labels.name}</Text>
        <TextInput style={styles.input} onChangeText={(text) => setForm({...form, name: text})} value={form.name} placeholder="Enter Name" />

        <Text style={styles.label}>{labels.age}</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => setForm({...form, age: text})} value={form.age} placeholder="Enter Age" />

        <Text style={styles.label}>{labels.gender}</Text>
        <View style={styles.row}>
          {['Male', 'Female', 'Other'].map((g) => (
            <TouchableOpacity key={g} style={[styles.choiceBtn, form.gender === g && styles.activeBtn]} onPress={() => setForm({...form, gender: g})}>
              <Text style={[styles.choiceText, form.gender === g && styles.activeText]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>{labels.state}</Text>
        <View style={styles.rowWrap}>
          {states.map((s) => (
            <TouchableOpacity key={s} style={[styles.choiceBtn, form.state === s && styles.activeBtn]} onPress={() => setForm({...form, state: s})}>
              <Text style={[styles.choiceText, form.state === s && styles.activeText]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>{labels.district}</Text>
        <TextInput style={styles.input} onChangeText={(text) => setForm({...form, district: text})} value={form.district} placeholder="Enter District" />

        <Text style={styles.label}>{labels.mandal}</Text>
        <TextInput style={styles.input} onChangeText={(text) => setForm({...form, mandal: text})} value={form.mandal} placeholder="Enter Mandal" />

        <Text style={styles.label}>{labels.village}</Text>
        <TextInput style={styles.input} onChangeText={(text) => setForm({...form, village: text})} value={form.village} placeholder="Enter Village" />

        <Text style={styles.label}>{labels.land_size}</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => setForm({...form, landSize: text})} value={form.landSize} placeholder="e.g. 1.5 (0.40 Guntas = 1 Acre)" />

        <Text style={styles.label}>{labels.soil_type}</Text>
        <View style={styles.rowWrap}>
          {soils.map((soil) => (
            <TouchableOpacity key={soil} style={[styles.choiceBtn, form.soilType === soil && styles.activeBtn]} onPress={() => setForm({...form, soilType: soil})}>
              <Text style={[styles.choiceText, form.soilType === soil && styles.activeText]}>{soil}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{labels.save_profile}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  scrollContainer: { padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 15, marginBottom: 5 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 5 },
  choiceBtn: { flex: 1, minWidth: '45%', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CCC', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 4 },
  activeBtn: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  choiceText: { color: '#555', fontSize: 14, fontWeight: '600' },
  activeText: { color: '#FFF' },
  submitButton: { backgroundColor: '#2E7D32', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 30, marginBottom: 20 },
  submitButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
