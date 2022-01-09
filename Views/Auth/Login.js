/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useContext } from 'react';
import {View, Button, VStack} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormInput from '../Components/Input';
import {AuthTemplateScreen} from './AuthTemplate';
import { AppContext } from '../../App';
// import useSignInUserEmail from '../../Hooks/useSignInUserEmail';

const schema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().required(),
});

export function LoginScreen({navigation}) {
  const { SigninUser, Loading } = useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    //console.log(data);
    SigninUser(data);
    // navigation.navigate('Home');
  };
  return (
    <AuthTemplateScreen
      text="loginText"
      linkText="loginLinkText"
      linkLocation="Register"
      link="loginLink"
      navigation={navigation}>
      <VStack mt={6} width="100%" space={2}>
        <FormInput
          name="email"
          label="Email"
          rules={{required: 'Field is required', type: 'email'}}
          {...{control, errors}}
        />
        <FormInput
          name="password"
          label="Password"
          type={'password'}
          rules={{required: 'Field is required', type: 'password'}}
          {...{control, errors}}
        />
        <Button
          _text={{
            color: 'white',
            fontWeight: 'bold',
          }}
          onPress={handleSubmit(onSubmit)}
          mt={3}
          isLoading={Loading}
          isDisabled={Loading}
          isLoadingText={'Logging In...'}
          colorScheme="dark">
          Login
        </Button>
        <View pb={4} />
      </VStack>
    </AuthTemplateScreen>
  );
}
