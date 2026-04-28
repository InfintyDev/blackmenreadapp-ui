import {
    Text,

    StyleSheet,
    View,
    Button,
    Image,
    Pressable
} from 'react-native';


// or any files within the Snack

import styles from '../Objects/Styles';

import ChagePageButton from '../Objects/ChangePageButton';



//import GoogleSignin from 'react-native-google-signin';

export default function LogInSelectorPage() {




    const signInStudent = ChagePageButton("Student", "LogInStudent");
    const signInParent = ChagePageButton("Parent", "LogInParent");
    const signInTutor = ChagePageButton("Tutor", "LogInTutor");


    const MakeImage = (imageStyle, imageSource, width = 0, height = 0) => {


        return (
            <Image
                style={{ ...styles.scaledImage, width: width, height: height }}
                source={imageSource}

            />
        );
    };

    return (

        <View style={{ ...styles.container, backgroundColor: '#ffffffff' }}>
            <View style={styles.centerer}>

                {MakeImage(
                    styles.scaledImage,
                    require('../../assets/BlackMenReadLogo.jpg'),
                    300,
                    300
                )}
            </View>


            <View style={{ ...styles.centerer, flex: .8 }}>
                <View style={{ ...styles.paddedCard, margin: 2, padding: 5 }}>
                    {ChagePageButton('Sign Up', 'SignUpPage')}
                </View>

                <View>
                    <Text style={{ ...styles.largeText, fontSize: 30 }}>
                        Log In
                    </Text>
                </View>
                <View style={{ ...styles.containerColoumNoFlex, flexDirection: 'column', margin: 8 }}>
                    <View style={{ ...styles.paddedCard, margin: 2, padding: 5 }}>
                        {signInStudent}
                    </View>
                    <View style={{ ...styles.paddedCard, margin: 2, padding: 5 }}>
                        {signInParent}
                    </View>
                    <View style={{ ...styles.paddedCard, margin: 2, padding: 5 }}>
                        {signInTutor}
                    </View>




                </View>


            </View>


        </View >


    );
}
