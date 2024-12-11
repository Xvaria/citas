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
import {IPatient} from '../interfaces/Paciente';

interface FormularioProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  patients: IPatient[] | null;
  setPatients: (patient: IPatient[]) => void;
  patient: IPatient | null;
  setPatient: (patient: IPatient | null) => void;
}

const Formulario = ({
  modalVisible,
  setModalVisible,
  patients,
  setPatients,
  patient: patientObj,
  setPatient: setPatientObj,
}: FormularioProps) => {
  const [patient, setPatient] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [symptoms, setSymptoms] = useState<string>('');

  useEffect(() => {
    if (patientObj) {
      setPatient(patientObj.patient);
      setOwner(patientObj.owner);
      setEmail(patientObj.email);
      setPhone(patientObj.phone);
      setDate(patientObj.date);
      setSymptoms(patientObj.symptoms);
    }
  }, [patientObj]);

  const handleClose = () => {
    setPatientObj(null);
    setPatient('');
    setOwner('');
    setEmail('');
    setPhone('');
    setDate(new Date());
    setSymptoms('');

    setModalVisible(!modalVisible);
  };

  const handleDate = () => {
    if ([patient, owner, email, date, symptoms].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {text: 'Entiendo'},
      ]);
      return;
    }

    const newPatient: IPatient = {
      id: String(Date.now()),
      patient,
      owner,
      email,
      phone,
      date,
      symptoms,
    };

    if (patientObj) {
      newPatient.id = patientObj.id;
      if (patients) {
        const updatePatients = patients?.map(patientstate =>
          patientstate.id === newPatient.id ? newPatient : patientstate,
        );
        setPatients(updatePatients);
      }
    } else {
      if (patients) {
        setPatients([...patients, newPatient]);
      } else {
        setPatients([newPatient]);
      }
    }
    handleClose();
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.content}>
        <ScrollView>
          <Text style={styles.title}>
            {patientObj ? 'Editar ' : 'Nueva '}
            <Text style={styles.titleBold}>Cita</Text>
          </Text>

          <Pressable style={styles.btnCancel} onLongPress={() => handleClose()}>
            <Text style={styles.btnCancelText}>X Cancelar</Text>
          </Pressable>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre paciente"
              placeholderTextColor={'#666'}
              value={patient}
              onChangeText={setPatient}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre propietario"
              placeholderTextColor={'#666'}
              value={owner}
              onChangeText={setOwner}
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
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha de alta</Text>
            <View style={styles.dateContainer}>
              <DatePicker
                date={date}
                locale="es"
                onDateChange={date => setDate(date)}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.symptomsInput]}
              placeholder="Sintomas del paciente"
              placeholderTextColor={'#666'}
              value={symptoms}
              onChangeText={setSymptoms}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnNewDate} onPress={() => handleDate()}>
            <Text style={styles.btnNewDateText}>
              {patientObj ? 'Editar paciente' : 'Agregar paciente'}
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
  btnCancel: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelText: {
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
  symptomsInput: {
    height: 100,
  },
  btnNewDate: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNewDateText: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Formulario;
