/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Box, ScrollView, View, Link, Button, Text, Linking} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralStyle from '../Styles';

export function AuthTemplateScreen({
  navigation,
  children,
  text,
  linkText,
  link,
  linkLocation,
  showBackBtn = false,
}) {
  const insets = useSafeAreaInsets();
  return (
    <Box
      style={{paddingTop: insets.top, paddingBottom: 15}}
      flex={1}
      bg="#fff"
      alignItems="flex-start"
      justifyContent="flex-start">
      {/* <SafeAreaView> */}
      {showBackBtn && (
        <Button
          size="sm"
          variant="unstyled"
          px={2}
          m={4}
          _text={{
            color: '#000000',
          }}
          startIcon={<Ionicons name="arrow-back" />}
          onPress={() => navigation.goBack()}>
          Back
        </Button>
      )}
      <ScrollView style={{padding: 30, width: '100%'}}>
        <View mb={4}>
          <Text style={GeneralStyle.authH1Text}>Welcome Back</Text>
          <View mt={2} style={{flexDirection: 'row'}}>
            <Text bold style={GeneralStyle.authLinkText}>
              or
            </Text>
            <Link ml={2} onPress={() => Linking.openURL('https://dgar-web.web.app/register')}>
              <Text bold style={GeneralStyle.authLink}>
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
        {children}
      </ScrollView>
      {/* </SafeAreaView> */}
    </Box>
  );
}
