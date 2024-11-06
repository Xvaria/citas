import {SafeAreaView, Text, View} from 'react-native';
import {IPaciente} from '../interfaces/Paciente';

interface PropsPaciente {
  paciente: IPaciente;
}

const Paciente = ({paciente}: PropsPaciente) => {
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
    <View>
      <Text>{paciente.paciente}</Text>
      <Text>{formatingDate(paciente.fecha)}</Text>
    </View>
  );
};

export default Paciente;
