import React, {useEffect} from 'react'
import {View,StyleSheet,ImageBackground, KeyboardAvoidingView, Image,Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

let refresh_token = '6a3f3ef81150c4c3d9fe22293f337e5c69f8223bea358d701fa14974bc99d56b1443692efe37deb381dd4f9d5f0c2afcb05b4d6ed3d6cd7de4edde5525bdfb6d';

function PreLogin({ navigation }){

    useEffect( () => {

        const checkToken = async () => {


            if(refresh_token !== null){
                setTimeout(() =>{
                    navigation.navigate('Login', {refresh_token})
                },1000)
            }else{
                alert('Não existe token salvo no Storage no momento!');
                //navigation.navigate('Login')
            }
        }

        checkToken()
    },[])

    const salvaTokenStorage = async (t) => {
            
        // Chave do token no AsyncStorage é 'token'

        await AsyncStorage.setItem("token",JSON.stringify(t));
    }

        return(
   
            <KeyboardAvoidingView style={styles.container}>

                <ImageBackground source={require('./../../imagens/lgpd_protecao_dados.png')}
                        resizeMode="cover" style={styles.image}>
                            
                            <View style={styles.containerImagem}>

                                        <Image 
                                            style={styles.imageLogo}
                                            source={require('./../../imagens/logo_sgn_menor.png')}
                                        />
                                        <Text style={styles.text}>SISTEMAS E TECNOLOGIA</Text>
                            </View>
                                
                </ImageBackground>

            </KeyboardAvoidingView>  
        )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageLogo:{
        width: 300,
        height: 90
    },
    containerImagem:{
      flex: 1,
      justifyContent: 'center',
      width: "100%",
      height: "100%",
      marginTop: 60,
      alignItems: 'center',
    },
  
    containerForm:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      width: '90%',
      marginBottom: 0
      
    },
    backgroundImage:{
        flex: 1,
        alignSelf: 'stretch',
        width: null
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    text:{
        fontSize:17,
        marginTop:30,
        color:"#2f2f2f"
    }
  
})

export default PreLogin