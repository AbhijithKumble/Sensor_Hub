/* eslint-disable react-native/no-inline-styles */
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';

import auth from '@react-native-firebase/auth';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


type SingInScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList
>;

type Props = {
    navigation: SingInScreenNavigationProp;
};

type userInfo = {
    email : string;
    password: string;
    error: string | null;
};

const SignIn: React.FC<Props> = ({navigation}) => {
    const [value, setValue] = React.useState<userInfo>({
        email: '',
        password: '',
        error: null,
    });
    
    const [loading , setLoading] = React.useState(false);

React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: "799001895781-d5j13sakr32ihoatonnn8mvq1janugso.apps.googleusercontent.com",
      offlineAccess: true
    });
  }, [])
  const GoogleSignUp = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn().then(result => { console.log(result) });
        navigation.navigate('SignIn');
      } catch (error : any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          console.log('User cancelled the login flow !');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Signin in progress');
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Google play services not available or outdated !');
          // play services not available or outdated
        } else {
          console.log(error)
        }
      }
    };

    const signIn = async () => {
        if (value.email === '' || value.password === '') {
            setValue({...value, error: 'Please fill all the fields.'});
            return;
        }

        try {
            setLoading(true);
            await auth().signInWithEmailAndPassword(value.email.replace(' ', ''), value.password);
            setLoading(false);
            navigation.navigate('HomeDrawer', {screen: 'Home'});
        } catch (error: any) {
            if(error.code == 'auth/invalid-password' 
                || error.code == 'auth/invalid-email'
                || error.code == 'auth/invalid-credential'
            ) {
                setValue({...value, error: 'invalid email/password'});
                console.log(error.code);
                setLoading(false);
                return;
            }
            setValue({...value,
                error: 'internal server error | check your internet connection '});
            console.log(error.code);
            setLoading(false);
            return;
        }
    };

    const signInWithFacebook = () => {

    };

    const signInWithMicrosoft = () => {};

    const signInWithGoogle = () => {};

    const signUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <SafeAreaView>
            <View
                style={{
                    padding: Spacing * 2,
                }}>
                <View
                    style={{
                        alignItems: 'center',
                    }}>
                    <Text
                        style={styleSheet.heading1}>
                        Login here
                    </Text>
                    <Text
                        style={styleSheet.heading2}>
                        Welcome back you've been missed!
                    </Text>
                </View>
                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}>
                    <TextInput
                        placeholderTextColor={Colors.darkText}
                        placeholder="Email"
                        value={value.email}
                        onChangeText={text => setValue({...value, email: text})}
                        style={styleSheet.textIn}
                    />
                    <TextInput
                        placeholderTextColor={Colors.darkText}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={text => setValue({...value, password: text})}
                        style={styleSheet.textIn}
                    />
                </View>

                <View>
                    <Text
                        style={{
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: FontSize.small,
                            color: Colors.primary,
                            alignSelf: 'flex-end',
                        }}>
                        Forgot your password ?
                    </Text>
                </View>
                
                {value.error != null && 
                    <View>
                        <Text style={{
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: FontSize.small,
                            color: 'red'
                        }}>
                            {value.error}
                        </Text>
                    </View>
                }

                <TouchableOpacity
                    onPress={signIn}
                    style={styleSheet.btnTouchableOp}
                >
                    <Text
                        style={styleSheet.btnText}>
                        {loading ? 'Signing in' : 'Sign in'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={signUp}
                    style={{
                        padding: Spacing,
                    }}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-SemiBold',
                            color: Colors.text,
                            textAlign: 'center',
                            fontSize: FontSize.small,
                        }}>
                        Create new account
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-SemiBold',
                            color: Colors.primary,
                            textAlign: 'center',
                            fontSize: FontSize.small,
                        }}>
                        Or continue with
                    </Text>

                    <View
                        style={{
                            marginTop: Spacing,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                            style={styleSheet.iconsTouchableOp}
                            onPress={signInWithFacebook}
                        >
                            <Image source={require('../../assets/facebook.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styleSheet.iconsTouchableOp}
                            onPress={GoogleSignUp}
                        >
                            <Image source={require('../../assets/search.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styleSheet.iconsTouchableOp}
                            onPress={signInWithMicrosoft}
                        >
                            <Image source={require('../../assets/microsoft.png')}/>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </SafeAreaView>
    );
};

const styleSheet = StyleSheet.create({
    heading1 : {
        fontSize: FontSize.xLarge,
        color: Colors.primary,
        fontFamily: 'Poppins-Bold',
        marginVertical: Spacing * 3,
    },
    heading2 : { 
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.large,
        maxWidth: '60%',
        textAlign: 'center',
    }, 
    textIn :{
        fontFamily: 'Poppins-Regular',
        fontSize: FontSize.small,
        padding: Spacing * 2,
        backgroundColor: Colors.lightPrimary,
        borderRadius: Spacing,
        marginVertical: Spacing,
    } ,
    btnTouchableOp : {
        margin:Spacing*2,
        padding: Spacing * 2,
        backgroundColor: Colors.primary,
        marginVertical: Spacing * 3,
        borderRadius: Spacing,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
    },
    btnText : {
        fontFamily: 'Poppins-Bold',
        color: Colors.onPrimary,
        textAlign: 'center',
        fontSize: FontSize.large,
    },
    iconsTouchableOp: {
        padding: Spacing,
        backgroundColor: Colors.gray,
        borderRadius: Spacing / 2,
        marginHorizontal: Spacing,
    },
});

export default SignIn;
