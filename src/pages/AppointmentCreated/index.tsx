import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    // como se o usuario nao tivesse navegado para nenhuma tela
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // posicao da minha rota, no caso o Dashboard tem a posicao 0
        routes: [
          {
            name: 'Dashoboard',
          },
        ],
      }),
    );
  }, [navigation]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR },
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Agendamento Concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
