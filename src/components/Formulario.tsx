import {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {IPaciente} from '../interfaces/Paciente';

interface FormularioProps {
  modalVisible: boolean;
  setModalVisible: (boolean: boolean) => void;
  pacientes: IPaciente[] | null;
  setPacientes: (paciente: IPaciente[]) => void;
  paciente: IPaciente | null;
  setPaciente: (paciente: IPaciente | null) => void;
}

const Formulario = ({
  modalVisible,
  setModalVisible,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteObj,
}: FormularioProps) => {
  const [paciente, setPaciente] = useState<string>('');
  const [propietario, setPropietario] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [fecha, setFecha] = useState<Date>(new Date());
  const [sintomas, setSintomas] = useState<string>('');

  useEffect(() => {
    if (pacienteObj) {
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);

  const handleClose = () => {
    setPacienteObj(null);
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');

    setModalVisible(!modalVisible);
  };

  const handleCita = () => {
    if ([paciente, propietario, email, fecha, sintomas].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {text: 'Entiendo'},
      ]);
      return;
    }

    const nuevoPaciente: IPaciente = {
      id: String(Date.now()),
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    if (pacienteObj) {
      nuevoPaciente.id = pacienteObj.id;
      if (pacientes) {
        const pacientesActualizados = pacientes?.map(pacienteState =>
          pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState,
        );
        setPacientes(pacientesActualizados);
      }
    } else {
      if (pacientes) {
        setPacientes([...pacientes, nuevoPaciente]);
      } else {
        setPacientes([nuevoPaciente]);
      }
    }
    handleClose();
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.content}>
        <ScrollView>
          <Text style={styles.title}>
            {pacienteObj ? 'Editar' : 'Nueva'}
            <Text style={styles.titleBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => handleClose()}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre paciente"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre propietario"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="JhonDoe@mail.com"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Telefono propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="333 3333"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha de alta</Text>
            <View style={styles.dateContainer}>
              <DatePicker
                date={fecha}
                locale="es"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Sintomas del paciente"
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={() => handleCita()}>
            <Text style={styles.btnNuevaCitaTexto}>
              {pacienteObj ? 'Editar paciente' : 'Agregar paciente'}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#6D28D9',
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
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  field: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  dateContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Formulario;
