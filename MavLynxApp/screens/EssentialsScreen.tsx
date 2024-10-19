import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Card, Button, CheckBox, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminHold = ({ title, guidance, checklist, links }) => {
  const [checks, setChecks] = useState(checklist.map(() => false));

  const toggleCheck = (index) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const allChecked = checks.every(Boolean);

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{title}</Card.Title>
      <Text style={styles.guidance}>{guidance}</Text>
      {checklist.map((item, index) => (
        <CheckBox
          key={index}
          title={item}
          checked={checks[index]}
          onPress={() => toggleCheck(index)}
        />
      ))}
      {links.map((link, index) => (
        <Button
          key={index}
          title={link.title}
          onPress={() => Linking.openURL(link.url)}
          buttonStyle={styles.linkButton}
        />
      ))}
      {allChecked && (
        <Text style={styles.holdCleared}>Hold Cleared</Text>
      )}
    </Card>
  );
};

const PhonePlan = ({ name, price, dataLimit, coverage, onApply }) => (
  <Card containerStyle={styles.card}>
    <Card.Title>{name}</Card.Title>
    <Text style={styles.price}>${price}/month</Text>
    <Text>Data Limit: {dataLimit}</Text>
    <Text>Coverage: {coverage}</Text>
    <Button
      title="Apply for This Plan"
      onPress={onApply}
      buttonStyle={styles.applyButton}
    />
  </Card>
);

export default function EssentialsScreen() {
  const navigation = useNavigation();
  const [adminHolds, setAdminHolds] = useState([
    {
      title: 'Financial Aid Hold',
      guidance: 'Please complete the following steps to clear your financial aid hold:',
      checklist: [
        'Submit FAFSA',
        'Upload required documents',
        'Schedule appointment with financial aid advisor',
      ],
      links: [
        { title: 'FAFSA Website', url: 'https://studentaid.gov/h/apply-for-aid/fafsa' },
        { title: 'Upload Documents', url: 'https://example.com/upload' },
      ],
    },
    {
      title: 'Academic Advising Hold',
      guidance: 'Complete these steps to clear your academic advising hold:',
      checklist: [
        'Review degree audit',
        'Create tentative course schedule',
        'Meet with academic advisor',
      ],
      links: [
        { title: 'Degree Audit', url: 'https://example.com/degree-audit' },
        { title: 'Schedule Advisor Meeting', url: 'https://example.com/advising' },
      ],
    },
  ]);

  const [phonePlans, setPhonePlans] = useState([
    { name: 'Basic Plan', price: 30, dataLimit: '2GB', coverage: 'Nationwide' },
    { name: 'Standard Plan', price: 45, dataLimit: '5GB', coverage: 'Nationwide + Canada' },
    { name: 'Premium Plan', price: 60, dataLimit: 'Unlimited', coverage: 'Global' },
  ]);

  const saveProgress = () => {
    // Implement save progress logic here
    console.log('Progress saved');
  };

  const applyForPlan = (plan) => {
    // Implement apply for plan logic here
    console.log(`Applied for ${plan.name}`);
    // Update user profile with selected plan
    // Update estimated costs on Home Page
    navigation.navigate('Home', { selectedPlan: plan });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Administrative Holds</Text>
        {adminHolds.map((hold, index) => (
          <AdminHold key={index} {...hold} />
        ))}
        <Button
          title="Save Progress"
          onPress={saveProgress}
          buttonStyle={styles.saveButton}
        />

        <Divider style={styles.divider} />

        <Text style={styles.sectionTitle}>Phone Plan Comparison</Text>
        {phonePlans.map((plan, index) => (
          <PhonePlan
            key={index}
            {...plan}
            onApply={() => applyForPlan(plan)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
  },
  guidance: {
    marginBottom: 8,
  },
  linkButton: {
    marginTop: 8,
    backgroundColor: '#3498db',
  },
  holdCleared: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  saveButton: {
    margin: 16,
    backgroundColor: '#2ecc71',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 8,
  },
  applyButton: {
    marginTop: 8,
    backgroundColor: '#3498db',
  },
  divider: {
    height: 2,
    backgroundColor: '#bdc3c7',
    marginVertical: 16,
  },
});