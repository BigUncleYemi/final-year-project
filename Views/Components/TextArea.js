import React from 'react';
import {FormControl, TextArea} from 'native-base';
import {StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const FormTextArea = ({
  placeholder = '',
  defaultValue = '',
  rules = {},
  name = '',
  required = true,
  label = '',
  control = () => {},
  errors = {},
  type = 'text',
  height = 30,
}) => {
  return (
    <FormControl
      isRequired={required}
      isInvalid={errors && `${name}` in errors}
      mb={3}>
      {label && (
        <FormControl.Label _text={{bold: true}}>{label}</FormControl.Label>
      )}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextArea
            onBlur={onBlur}
            placeholder={placeholder}
            onChangeText={val => onChange(val)}
            value={value}
            type={type}
            style={styles.textAreaHeight}
          />
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      <FormControl.ErrorMessage>
        {errors && errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

const styles = StyleSheet.create({
  textAreaHeight: {
    height: 100,
  },
});

export default FormTextArea;
