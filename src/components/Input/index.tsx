import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, fieldName, defaultValue = '', error } = useField(name);

  // amarzena o valor do meu input
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  // essa função será usada para registrar o nosso conteudo que esta dentro do nosso input
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current, // nossa referencia de input
      path: 'value', // onde buscar o meu input

      // set o valor a partir daquele que foi digitado pelo meu usuário
      setValue(ref: any, value) {
        // pegando o input
        inputValueRef.current.value = value;
        // pegando o elemento e set uma propriedade nativa, responsável por mudar visualmente o valor do nosso input
        inputElementRef.current.setNativeProps({ text: value });
      },
      // limpando meu input
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
