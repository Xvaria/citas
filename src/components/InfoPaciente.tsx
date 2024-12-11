import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IPatient} from '../interfaces/Paciente';
import {formatingDate} from '../utils/formatDate';

interface InfoPacienteProps {
  modalPatient: boolean;
  setModalPatient: (modalPatient: boolean) => void;
  patient: IPatient | null;
  setPatient: (patient: IPatient | null) => void;
}

const InfoPaciente = ({
  modalPatient,
  setModalPatient,
  patient,
  setPatient,
}: InfoPacienteProps) => {
  return patient ? (
    <Modal visible={modalPatient} animationType="fade">
      <SafeAreaView style={styles.container}>
        <View>
          <Pressable
            style={styles.btnClose}
            onLongPress={() => {
              setModalPatient(false);
              setPatient(null);
            }}>
            <Text style={styles.btnCloseText}>X Cerrar</Text>
          </Pressable>
        </View>
        <Text style={styles.title}>
          Informacion
          <Text style={styles.titleBold}> paciente</Text>
        </Text>
        <View style={styles.content}>
          <View style={styles.field}>
            <Text style={styles.label}>Paciente</Text>
            <Text style={styles.value}>{patient.patient}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Propietario</Text>
            <Text style={styles.value}>{patient.owner}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{patient.email}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Telefono</Text>
            <Text style={styles.value}> {patient.phone}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Fecha alta</Text>
            <Text style={styles.value}>{formatingDate(patient.date)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Sintomas</Text>
            <Text style={styles.value}>{patient.symptoms}</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f59e0b',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },
  titleBold: {
    fontWeight: '900',
  },
  btnClose: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCloseText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  field: {
    marginBottom: 10,
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12,
  },
  value: {
    fontWeight: '700',
    fontSize: 20,
    color: '#334155',
  },
});

export default InfoPaciente;
