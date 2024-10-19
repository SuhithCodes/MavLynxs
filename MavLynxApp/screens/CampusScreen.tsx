import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Card, Button, Overlay } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DepartmentMarker = ({ department, onPress }) => (
  <Marker
    coordinate={department.coordinate}
    title={department.name}
    description={department.building}
    onPress={() => onPress(department)}
  />
);

const RoomInfoModal = ({ visible, room, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {room ? (
          <>
            <Text style={styles.modalTitle}>{room.name}</Text>
            <Text>Room: {room.roomNumber}</Text>
            <Text>Building: {room.building}</Text>
            <Text>Floor: {room.floor}</Text>
            <Text>Directions: {room.directions}</Text>
          </>
        ) : (
          <Text>No room selected</Text>
        )}
        <Button title="Close" onPress={onClose} buttonStyle={styles.closeButton} />
      </View>
    </View>
  </Modal>
);

const StudyRoomCard = ({ room, onApply }) => (
  <Card containerStyle={styles.card}>
    <Card.Title>{room.name}</Card.Title>
    <Text style={styles.roomDescription}>{room.description}</Text>
    <Text>Available Time Slots: {room.availableSlots.join(', ')}</Text>
    <Text>Occupancy: {room.occupancy}</Text>
    <Text>Location: {room.location}</Text>
    <Button
      title="Apply for Slot"
      onPress={() => onApply(room)}
      buttonStyle={styles.applyButton}
    />
  </Card>
);

export default function CampusScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('departments');
  const [selectedRoom, setSelectedRoom] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [studyRooms, setStudyRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchStudyRooms();
  }, []);

  const fetchDepartments = () => {
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setDepartments([
        { id: 1, name: 'Computer Science', building: 'Nedderman Hall', roomNumber: '109', floor: 'Ground Floor', coordinate: { latitude: 32.7299, longitude: -97.1138 }, directions: 'Take the main entrance, go straight, and the room is on your left.' },
        { id: 2, name: 'Physics', building: 'Science Building', roomNumber: '301', floor: '3rd Floor', coordinate: { latitude: 32.7302, longitude: -97.1142 }, directions: 'Enter from the east side, take the elevator to the 3rd floor, turn right.' },
        { id: 3, name: 'Business', building: 'Business Building', roomNumber: '205', floor: '2nd Floor', coordinate: { latitude: 32.7305, longitude: -97.1135 }, directions: 'Use the main stairs, go to the 2nd floor, the room is at the end of the hallway.' },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const fetchStudyRooms = () => {
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setStudyRooms([
        { id: 1, name: 'Quiet Study Room 1', description: 'Individual study space', availableSlots: ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM'], occupancy: 'Single', location: 'Library, 2nd Floor' },
        { id: 2, name: 'Group Study Room A', description: 'Collaborative workspace', availableSlots: ['10:00 AM - 12:00 PM', '3:00 PM - 5:00 PM'], occupancy: 'Up to 6 people', location: 'Student Center, 1st Floor' },
        { id: 3, name: 'Computer Lab 3', description: 'Room with computers', availableSlots: ['1:00 PM - 3:00 PM', '4:00 PM - 6:00 PM'], occupancy: 'Up to 20 people', location: 'Engineering Building, 3rd Floor' },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleMarkerPress = (department) => {
    setSelectedRoom(department || {});
    setModalVisible(true);
  };

  const handleApplyForSlot = (room) => {
    // Implement reservation logic here
    console.log('Applying for slot in room:', room.name);
    // You might want to navigate to a reservation confirmation screen or show a confirmation modal
    navigation.navigate('ReservationConfirmation', { room });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'departments' && styles.activeTab]}
          onPress={() => setActiveTab('departments')}
        >
          <Text style={styles.tabText}>Departments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'studyRooms' && styles.activeTab]}
          onPress={() => setActiveTab('studyRooms')}
        >
          <Text style={styles.tabText}>Study Rooms</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'departments' && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 32.7302,
              longitude: -97.1138,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            {departments.map((dept) => (
              <DepartmentMarker key={dept.id} department={dept} onPress={handleMarkerPress} />
            ))}
          </MapView>
          <RoomInfoModal
            visible={modalVisible}
            room={selectedRoom}
            onClose={() => setModalVisible(false)}
          />
        </View>
      )}

      {activeTab === 'studyRooms' && (
        <ScrollView>
          {studyRooms.map((room) => (
            <StudyRoomCard key={room.id} room={room} onApply={handleApplyForSlot} />
          ))}
        </ScrollView>
      )}
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
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
  },
  roomDescription: {
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#2ecc71',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#3498db',
    marginTop: 20,
  },
});