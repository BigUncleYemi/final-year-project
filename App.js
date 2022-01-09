import React, { createContext, useState, useContext, useEffect } from 'react';
import { RefreshControl, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import RNBootSplash from "react-native-bootsplash";
import FirebaseService from './services/FirebaseService';
import { useGetOwnerDigitalItems } from './Hooks/useGetOwnerDigitalItems';
import {
  ViroARScene,
  ViroText,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroConstants,
  ViroNode,
  ViroARSceneNavigator,
} from '@viro-community/react-viro';
import { NativeBaseProvider, Toast, VStack, ScrollView } from 'native-base';
import { LoginScreen } from './Views/Auth/Login';
import ProductCard from './Views/Components/ProductCard';
import { LogOutIcon } from './Views/Components/Svg';

export function Loading() {
  return (
    <View style={stylesL.loadingContainer}>
      <ActivityIndicator size='large' color='#b91c1c' />
    </View>
  );
}

const stylesL = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});

/**
 * This provider is created
 * to access user in whole app
 */

const SceneAR = (props) => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText(props?.name);
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[.1, .1, .1]}
        position={[0, .5, -1]}
        style={styles.TextStyle}
      />
      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

      <ViroNode position={[0, 0, -1]} dragType="FixedToPlane" onDrag={() => { }}  >
        <Viro3DObject
          source={false ? null : {
            uri: props?.uri,
          }}
          highAccuracyEvents={true}
          position={[0, .1, 0]}
          scale={[.4, .4, .4]}
          type={props?.uri?.split("/")[props?.uri?.split("/").length - 1].split('.')[props?.uri?.split("/")[props?.uri?.split("/").length - 1].split('.').length - 1].toUpperCase()}
        />
      </ViroNode>
    </ViroARScene>
  );
};

function HomeScreen(props) {
  return (
    <View style={styles.f1}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => <SceneAR {...{ ...props.route.params }} />
        }}
      // style={styles.f1}
      />
    </View>
  );
};

function HomeListScreen(props) {
  const [update, setUpdate] = useState("");
  const { user } = useContext(AppContext);
  const scrollRef = React.useRef(null);
  const { documents, loader } = useGetOwnerDigitalItems(update, user?.uid);
  const [isPullToRefreshEnabled, setIsPullToRefreshEnabled] =
    React.useState(false);
  const onRefresh = async () => {
    try {
      setIsPullToRefreshEnabled(true);
      setUpdate(Date.now());
      setIsPullToRefreshEnabled(false);
    } catch (e) {
      console.log('error', e);
    }
  };
  return (
    <ScrollView 
      bounces={true}
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isPullToRefreshEnabled}
          onRefresh={onRefresh}
        />
      }
      style={styles.f1}
    >
      <VStack p={4}>
        {documents &&
          documents.length > 0 ? (
          documents.map((item, i) => (
            <ProductCard key={i} data={item} setUpdate={setUpdate} {...{ ...props }} />
          ))
        ) : (
          <View>
            <Text>{loader ? "Loading...." : "No Digital Item yet. Please add your first Digital Item today."}</Text>
          </View>
        )
        }
      </VStack>
    </ScrollView>
  );
};

const Stack = createNativeStackNavigator();
export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
function HomeStack() {
  const { SignOutUser } = useContext(AppContext);
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={HomeListScreen}
        options={({ navigation }) => ({
          title: 'Digital Grill AR',
          headerRight: () => (
            <LogOutIcon onPress={async () => {
              await SignOutUser();
              navigation.navigate('Login');
            }} />
          ),
        })}
      />
      <Stack.Screen
        name='AR'
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'AR View',
        })}
      />
    </Stack.Navigator>
  );
}
export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        Loading,
        SignOutUser: async () => {

          await FirebaseService.signOutRequest();
          // await localStorage.clear();
          // history.push("/");
          setUser(null);
        },
        PresistUser: async (id) => {
          try {
            const user = await FirebaseService.signInGetUserDetailsRequest(id || localStorage.getItem(actionTypes.AUTH_TOKEN_ID));
            // localStorage.setItem(actionTypes.AUTH_USER, JSON.stringify(user.data()));
            setUser((prevUser) => ({ ...prevUser, user: user.data() }));
          } catch (err) {
            Toast.show({
              description: err.toString()
            })
          }
        },
        SigninUser: async (data) => {
          try {
            setLoading(true)
            const res = await FirebaseService.signInEmailRequest(data.email, data.password);
            const user = await FirebaseService.signInGetUserDetailsRequest(res.user.uid);
            // localStorage.setItem(actionTypes.AUTH_TOKEN_ID, res.user.uid);
            // localStorage.setItem(actionTypes.AUTH_TOKEN, res.user.Aa);
            // localStorage.setItem(actionTypes.AUTH_USER, JSON.stringify(user.data()));
            setUser((prevUser) => ({ ...prevUser, user: user.data() }));
            setLoading(false)
          } catch (err) {
            setLoading(false)
            Toast.show({
              description: err.toString()
            })
          }
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function Routes() {
  const { user, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NativeBaseProvider>
  );
}

var styles = StyleSheet.create({
  f1: { flex: 1 },
  TextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
