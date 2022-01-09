/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import Text from './Text';
import {Box, View, VStack, Button} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GeneralStyle from '../Styles/index';
import SearchBar from './SeacrchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header(props) {
  const insets = useSafeAreaInsets();
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Box bg="orange.500" style={{paddingTop: insets.top, paddingBottom: 15}}>
      <VStack mx={5} my={2.5} alignItems="flex-start">
        {props.onPressAction && (
          <Button
            size="sm"
            variant="unstyled"
            px={2}
            mb={0}
            _text={{
              color: '#ffffff',
            }}
            startIcon={<Ionicons name="arrow-back" />}
            onPress={() => props.onPressAction()}>
            Back
          </Button>
        )}
        {props.title && (
          <View mt={-3}>
            <Text style={[GeneralStyle.authH1Text, style.textHeader]}>
              {props.title}
            </Text>
          </View>
        )}
        {props.searchBarAction && (
          <View mt={3}>
            <SearchBar onSearchText={props.searchBarAction} />
          </View>
        )}
        {props.children}
      </VStack>
    </Box>
  );
}

const style = StyleSheet.create({
  catConc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  textHeader: {
    marginTop: 20,
    fontSize: GeneralStyle.authH1Text.fontSize * 0.8,
    color: '#fff7ed',
  },
  header: {padding: 30},
});
