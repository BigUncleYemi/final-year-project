/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {CheckIcon, FormControl, Input, Select, TextArea} from 'native-base';
import {Controller} from 'react-hook-form';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const FormInput = ({
  placeholder = '',
  defaultValue = '',
  rules = {},
  name = '',
  required = true,
  label = '',
  control = () => {},
  errors = {},
  type = 'text',
  Component = null,
  disabled = false,
  selectItem = [],
  inputType = 'input',
  isLoading = false,
  Children,
  hintText = '',
}) => {
  // const multiSelect = useRef(null);
  return (
    <FormControl
      isRequired={required}
      isInvalid={errors && `${name}` in errors}
      mt={2}>
      <FormControl.Label _text={{bold: true}}>
        {capitalizeFirstLetter(label)}
      </FormControl.Label>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) =>
          Component ? (
            <Component
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={val => onChange(val)}
              value={value}
              type={type}
            />
          ) : inputType === 'textarea' ? (
            <TextArea
              h={20}
              mt={1}
              p={3}
              value={value}
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={val => onChange(val)}
              type={type}
              disabled={disabled}
            />
          ) : inputType === 'select' ? (
            <Select
              selectedValue={value}
              minWidth={200}
              placeholder={isLoading ? 'Loading..' : placeholder}
              onValueChange={itemValue => {
                onChange(itemValue);
              }}
              _selectedItem={{
                bg: 'orange.600',
                _text: {color: 'white'},
                endIcon: <CheckIcon size={5} />,
              }}
              mt={1}>
              {selectItem?.map((item, index) =>
                item?.name ? (
                  <Select.Item
                    key={index}
                    label={item?.name}
                    value={item.value}
                  />
                ) : null,
              )}
            </Select>
          ) : (
            <Input
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={val => onChange(val)}
              value={value}
              type={type}
              keyboardType={inputType === 'number' ? 'number-pad' : 'default'}
              disabled={disabled}
            />
          )
        }
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {hintText && <FormControl.HelperText>{hintText}</FormControl.HelperText>}
      <FormControl.ErrorMessage>
        {errors && errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default FormInput;
