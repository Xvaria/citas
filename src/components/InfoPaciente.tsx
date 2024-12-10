import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IPaciente} from '../interfaces/Paciente';

interface InfoPacienteProps {
  modalPaciente: boolean;
  setModalPaciente: (modalPaciente: boolean) => void;
  patient: IPaciente | null;
}

const InfoPaciente = ({
  modalPaciente,
  setModalPaciente,
  patient,
}: InfoPacienteProps) => {
  return (
    <Modal visible={modalPaciente} animationType="fade">
      <SafeAreaView style={style.container}>
        <View>
          <Pressable
            style={style.btnClose}
            onLongPress={() => setModalPaciente(false)}>
            <Text style={style.btnCloseText}>X Cerrar</Text>
          </Pressable>
        </View>
        <Text style={style.title}>
          Informacion
          <Text style={style.titleBold}> paciente</Text>
        </Text>
        <Text>{patient?.paciente}</Text>
      </SafeAreaView>
    </Modal>
  );
};

const style = StyleSheet.create({
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
});

export default InfoPaciente;
