import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Card, Button, SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AlumniCard = ({ name, fieldOfStudy, industry, onConnect }) => (
  <Card containerStyle={styles.card}>
    <Card.Title>{name}</Card.Title>
    <Text style={styles.cardText}>Field of Study: {fieldOfStudy}</Text>
    <Text style={styles.cardText}>Industry: {industry}</Text>
    <Button
      title="Connect"
      onPress={onConnect}
      buttonStyle={styles.connectButton}
    />
  </Card>
);

const ClubCard = ({ name, description, onKnowMore, onJoin }) => (
  <Card containerStyle={styles.card}>
    <Card.Title>{name}</Card.Title>
    <Text style={styles.cardText}>{description}</Text>
    <View style={styles.buttonContainer}>
      <Button
        title="Know More"
        onPress={onKnowMore}
        buttonStyle={styles.knowMoreButton}
      />
      <Button
        title="Join Club"
        onPress={onJoin}
        buttonStyle={styles.joinButton}
      />
    </View>
  </Card>
);

export default function NetworkingScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [clubs, setClubs] = useState([
    { id: 1, name: 'Tech Innovators', description: 'Explore cutting-edge technologies and innovate together.' },
    { id: 2, name: 'Business Leaders', description: 'Develop leadership skills and network with industry professionals.' },
    { id: 3, name: 'Art Collective', description: 'Express your creativity through various art forms and collaborations.' },
    { id: 4, name: 'Sports Enthusiasts', description: 'Join fellow sports lovers for games, fitness, and team building.' },
  ]);

  const searchAlumni = (query) => {
    setIsSearching(true);
    // Simulating an API call with setTimeout
    setTimeout(() => {
      const results = [
        { id: 1, name: 'John Doe', fieldOfStudy: 'Computer Science', industry: 'Technology' },
        { id: 2, name: 'Jane Smith', fieldOfStudy: 'Business Administration', industry: 'Finance' },
        { id: 3, name: 'Mike Johnson', fieldOfStudy: 'Mechanical Engineering', industry: 'Automotive' },
      ].filter(alumnus =>
        alumnus.name.toLowerCase().includes(query.toLowerCase()) ||
        alumnus.fieldOfStudy.toLowerCase().includes(query.toLowerCase()) ||
        alumnus.industry.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handleConnect = (alumnus) => {
    // Navigate to alumnus profile page
    navigation.navigate('AlumnusProfile', { alumnus });
  };

  const handleKnowMore = (club) => {
    // Navigate to club page or open social media profile
    navigation.navigate('ClubDetails', { club });
  };

  const handleJoinClub = (club) => {
    // Implement club joining logic here
    console.log(`Joined club: ${club.name}`);
    // You might want to update the club state or make an API call here
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Alumni Connector</Text>
        <SearchBar
          placeholder="Search alumni by name, field, or industry"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={() => searchAlumni(searchQuery)}
          platform="default"
        />
        {isSearching ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          searchResults.map(alumnus => (
            <AlumniCard
              key={alumnus.id}
              {...alumnus}
              onConnect={() => handleConnect(alumnus)}
            />
          ))
        )}

        <Text style={styles.sectionTitle}>Club Exploration</Text>
        {clubs.map(club => (
          <ClubCard
            key={club.id}
            {...club}
            onKnowMore={() => handleKnowMore(club)}
            onJoin={() => handleJoinClub(club)}
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
  cardText: {
    marginBottom: 8,
  },
  connectButton: {
    backgroundColor: '#3498db',
    marginTop: 8,
  },
  knowMoreButton: {
    backgroundColor: '#2ecc71',
    marginRight: 8,
  },
  joinButton: {
    backgroundColor: '#e74c3c',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  loader: {
    marginTop: 20,
  },
});