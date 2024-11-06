/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import {IPaciente} from './src/interfaces/Paciente';

const App = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pacientes, setPacientes] = useState<IPaciente[] | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {pacientes ? (
        <FlatList
          style={styles.list}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <Paciente paciente={item} />;
          }}
        />
      ) : (
        <Text style={styles.emptyPacientes}>No hay pacientes</Text>
      )}

      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pacientes={pacientes}
        setPacientes={setPacientes}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },

  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  emptyPacientes: {
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
