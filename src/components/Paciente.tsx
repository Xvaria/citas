import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {IPaciente} from '../interfaces/Paciente';

interface PropsPaciente {
  paciente: IPaciente;
  setModalVisible: (modalVisible: boolean) => void;
  editPatient: (patient: IPaciente) => void;
}

const Paciente = ({paciente, setModalVisible, editPatient}: PropsPaciente) => {
  const formatingDate = (date: Date) => {
    const options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Paciente:</Text>
      <Text style={styles.text}>{paciente.paciente}</Text>
      <Text style={styles.date}>{formatingDate(paciente.fecha)}</Text>

      <View style={styles.contentButtons}>
        <Pressable
          style={[styles.buttons, styles.editButton]}
          onLongPress={() => {
            setModalVisible(true);
            editPatient(paciente);
          }}>
          <Text style={styles.textButtons}>Editar</Text>
        </Pressable>

        <Pressable style={[styles.buttons, styles.deletButton]}>
          <Text style={styles.textButtons}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: '#94a3b8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#6d28d9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  date: {
    color: '#374151',
  },
  contentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttons: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#f59e0b',
  },
  deletButton: {
    backgroundColor: '#ef4444',
  },
  textButtons: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
  },
});

export default Paciente;
