import {Pressable, StyleSheet, Text, View} from 'react-native';
import {IPatient} from '../interfaces/Paciente';
import {formatingDate} from '../utils/formatDate';

interface PropsPatient {
  patient: IPatient;
  setModalVisible: (modalVisible: boolean) => void;
  editPatient: (patient: IPatient) => void;
  deletPatient: (patient: IPatient) => void;
  setModalPatient: (modalpatient: boolean) => void;
  setPatient: (patient: IPatient) => void;
}

const patient = ({
  patient,
  setModalVisible,
  editPatient,
  deletPatient,
  setModalPatient,
  setPatient,
}: PropsPatient) => {
  return (
    <Pressable
      onLongPress={() => {
        setModalPatient(true);
        setPatient(patient);
      }}>
      <View style={styles.container}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.text}>{patient.patient}</Text>
        <Text style={styles.date}>{formatingDate(patient.date)}</Text>

        <View style={styles.contentButtons}>
          <Pressable
            style={[styles.buttons, styles.editButton]}
            onLongPress={() => {
              setModalVisible(true);
              editPatient(patient);
            }}>
            <Text style={styles.textButtons}>Editar</Text>
          </Pressable>

          <Pressable
            style={[styles.buttons, styles.deletButton]}
            onLongPress={() => {
              deletPatient(patient);
            }}>
            <Text style={styles.textButtons}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
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

export default patient;
