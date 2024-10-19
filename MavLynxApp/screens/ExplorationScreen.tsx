import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, Button, SearchBar, Slider, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const HousingCard = ({ image, address, rent, amenities, size, onApply }) => (
  <Card containerStyle={styles.card}>
    <Image source={{ uri: image }} style={styles.housingImage} />
    <Text style={styles.address}>{address}</Text>
    <Text style={styles.rent}>${rent}/month</Text>
    <Text>Amenities: {amenities.join(', ')}</Text>
    <Text>Size: {size} sq ft</Text>
    <Button
      title="Apply"
      onPress={onApply}
      buttonStyle={styles.applyButton}
    />
  </Card>
);

const FoodRecCard = ({ name, description, location, rating, category }) => (
  <Card containerStyle={styles.card}>
    <Text style={styles.placeName}>{name}</Text>
    <Text style={styles.description}>{description}</Text>
    <Text>Location: {location}</Text>
    <View style={styles.ratingContainer}>
      <Text>Rating: </Text>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name={star <= rating ? 'star' : 'star-o'}
          size={16}
          color="#FFD700"
        />
      ))}
    </View>
    <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(category) }]}>
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  </Card>
);

const getCategoryColor = (category) => {
  switch (category.toLowerCase()) {
    case 'dining':
      return '#FF9800';
    case 'grocery':
      return '#4CAF50';
    case 'entertainment':
      return '#2196F3';
    default:
      return '#9E9E9E';
  }
};

export default function ExplorationScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('housing');
  const [housingFilters, setHousingFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 5000,
    roomType: 'all',
  });
  const [housingOptions, setHousingOptions] = useState([]);
  const [foodRecOptions, setFoodRecOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHousingOptions();
    fetchFoodRecOptions();
  }, []);

  const fetchHousingOptions = () => {
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setHousingOptions([
        { id: 1, image: 'https://example.com/image1.jpg', address: '123 Main St', rent: 1200, amenities: ['Furnished', 'Utilities Included'], size: 500 },
        { id: 2, image: 'https://example.com/image2.jpg', address: '456 Elm St', rent: 1500, amenities: ['Pool', 'Gym'], size: 700 },
        { id: 3, image: 'https://example.com/image3.jpg', address: '789 Oak St', rent: 1000, amenities: ['Parking', 'Laundry'], size: 450 },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const fetchFoodRecOptions = () => {
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setFoodRecOptions([
        { id: 1, name: 'Tasty Bites', description: 'Delicious local cuisine', location: '123 Foodie St', rating: 4.5, category: 'Dining' },
        { id: 2, name: 'Fresh Mart', description: 'Quality groceries', location: '456 Market Ave', rating: 4, category: 'Grocery' },
        { id: 3, name: 'Fun Zone', description: 'Entertainment for all ages', location: '789 Play Rd', rating: 4.2, category: 'Entertainment' },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const applyHousingFilters = () => {
    // Implement filtering logic here
    console.log('Applying filters:', housingFilters);
    fetchHousingOptions(); // Refetch with filters
  };

  const handleApplyHousing = (housing) => {
    // Save housing preference and navigate to application
    console.log('Applying for housing:', housing);
    navigation.navigate('HousingApplication', { housing });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'housing' && styles.activeTab]}
          onPress={() => setActiveTab('housing')}
        >
          <Text style={styles.tabText}>Housing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'foodRec' && styles.activeTab]}
          onPress={() => setActiveTab('foodRec')}
        >
          <Text style={styles.tabText}>Food & Recreation</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {activeTab === 'housing' && (
          <View>
            <Card containerStyle={styles.filterCard}>
              <Text style={styles.filterTitle}>Filters</Text>
              <SearchBar
                placeholder="Location"
                onChangeText={(text) => setHousingFilters({ ...housingFilters, location: text })}
                value={housingFilters.location}
                containerStyle={styles.searchBar}
                platform="default"
              />
              <Text>Price Range: ${housingFilters.minPrice} - ${housingFilters.maxPrice}</Text>
              <Slider
                value={housingFilters.maxPrice}
                onValueChange={(value) => setHousingFilters({ ...housingFilters, maxPrice: value })}
                minimumValue={0}
                maximumValue={5000}
                step={100}
              />
              <View style={styles.roomTypeContainer}>
                <CheckBox
                  title="Studio"
                  checked={housingFilters.roomType === 'studio'}
                  onPress={() => setHousingFilters({ ...housingFilters, roomType: 'studio' })}
                />
                <CheckBox
                  title="1-Bedroom"
                  checked={housingFilters.roomType === '1-bedroom'}
                  onPress={() => setHousingFilters({ ...housingFilters, roomType: '1-bedroom' })}
                />
                <CheckBox
                  title="Shared"
                  checked={housingFilters.roomType === 'shared'}
                  onPress={() => setHousingFilters({ ...housingFilters, roomType: 'shared' })}
                />
              </View>
              <Button
                title="Apply Filters"
                onPress={applyHousingFilters}
                buttonStyle={styles.filterButton}
              />
            </Card>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
              housingOptions.map((housing) => (
                <HousingCard
                  key={housing.id}
                  {...housing}
                  onApply={() => handleApplyHousing(housing)}
                />
              ))
            )}
          </View>
        )}

        {activeTab === 'foodRec' && (
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
              foodRecOptions.map((place) => (
                <FoodRecCard
                  key={place.id}
                  {...place}
                />
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#e0e0e0',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
  },
  filterCard: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  roomTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: '#3498db',
    marginTop: 10,
  },
  housingImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rent: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: '#2ecc71',
    marginTop: 10,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 5,
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
});