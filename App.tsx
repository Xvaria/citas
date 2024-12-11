/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import {IPatient} from './src/interfaces/Paciente';
import InfoPaciente from './src/components/InfoPaciente';

const App = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [patients, setPatients] = useState<IPatient[] | null>(null);
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [modalPatient, setModalPatient] = useState<boolean>(false);

  const handleDelet = (deletPatient: IPatient) => {
    Alert.alert(
      '¿Desea eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text: 'Cancelar'},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            if (patients) {
              const uploadPatients = patients.filter(
                patientState => patientState.id !== deletPatient.id,
              );
              if (uploadPatients.length > 0) {
                setPatients(uploadPatients);
              } else {
                setPatients(null);
              }
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Administrador de citas {''}
        <Text style={styles.titleBold}>Veterinaria</Text>
      </Text>

      <Pressable
        style={styles.btnNewDate}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.btnTextNewDate}>Nueva Cita</Text>
      </Pressable>

      {patients ? (
        <FlatList
          style={styles.list}
          data={patients}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Paciente
                patient={item}
                setModalVisible={setModalVisible}
                editPatient={setPatient}
                deletPatient={handleDelet}
                setModalPatient={setModalPatient}
                setPatient={setPatient}
              />
            );
          }}
        />
      ) : (
        <Text style={styles.emptyPatients}>No hay pacientes</Text>
      )}

      {modalVisible && (
        <Formulario
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
      )}

      {modalPatient && (
        <InfoPaciente
          modalPatient={modalPatient}
          setModalPatient={setModalPatient}
          patient={patient}
          setPatient={setPatient}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  titleBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNewDate: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextNewDate: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  emptyPatients: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  list: {
    margin: 30,
  },
});

export default App;
