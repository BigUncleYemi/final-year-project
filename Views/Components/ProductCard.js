import React from 'react';
import { Box, Text, HStack, Stack, Pressable } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FileComponent } from './Svg';

const width = Dimensions.get('screen').width;

export default function ProductCard(props) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('AR', {
          uri: props?.data?.image,
          name: props?.data?.name,
        })
      }
    >
      <Box
        shadow="2"
        bg="white"
        rounded="sm"
        mx={4}
        my={3}
        py={2.5}
        px={3}
      >
        <HStack space={3} alignItems="center">
          <FileComponent />
          <Stack style={style.textConc} space={1} p={[4, 4, 8]}>
            <Text bold style={style.productName} noOfLines={2}>
              {props?.data?.name}
            </Text>
          </Stack>
        </HStack>
      </Box>

    </Pressable>
  );
}

const style = StyleSheet.create({
  textConc: {
    width: width * 0.85 - 100,
  },
  img: {
    width: width - (width * 0.95 - 95),
  },
  productName: {
    fontSize: 15,
  },
  productDesc: {
    color: '#8F8F8F',
    fontSize: 13,
  },
});
