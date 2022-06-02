import React, {useState} from 'react'
import {View,StyleSheet,ImageBackground, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, Modal} from 'react-native'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import {ModalAppConfirma, ModalAppErro} from '../Modal/ModalApp'

function PreLogin({navigation, route}){

  const [email, setEmail] = useState(route.params.email)
  const [isModalConfirm, setIsModalConfirm] = useState(false)
  const [isModalError, setIsModalError] = useState(false)

  const alteraSenha = () =>{

      if(email === ''){

        setIsModalError(true);
        
      }else{

        fetch('http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/webservice_php_json.php?recuperarSenha', {
                method: 'POST',
                body: JSON.stringify({
                    "email": email
                   
                 })
              })
              .then((resp) => resp.text())
              .then((json) => {
                  console.log(json)
                  //setIsModalConfirm(true)
              })
              .catch((error) => {
                 // alert('error: ' + error)
                 console.log(error)
                  //setLoading(false)
              }) 
        
      }
  }

  const sairConf = () => {
    setIsModalConfirm(false)
  }

  const sairError = () => {
    setIsModalError(false)
  }
    
        return(
   
            <KeyboardAvoidingView style={styles.container}>

                <ImageBackground source={require('./../../imagens/lgpd_protecao_dados.png')}
                        resizeMode="cover" style={styles.image}>
                            
                            <View style={styles.containerImagem}>
                                        <Image 
                                            style={styles.imageLogo}
                                            source={require('../../imagens/logo_sgn_menor.png')}
                                        />
                            </View>

                            <TextInput 
                                style={styles.input}
                                placeholder="Informe o e-mail cadastrado"
                                value={email}
                                onChangeText={(texto) => setEmail(texto)}
                            />

                            <TouchableOpacity style={styles.btnSubmit} onPress={alteraSenha}>
                                <Text style={styles.textSubmit}> Recuperar </Text>
                            </TouchableOpacity>
                            
                            <Modal transparent={true} animationType="fadeIn" visible={isModalConfirm}>
                              <View style={styles.modalContainer}>
                                  <ModalAppConfirma fechar={() => sairConf()}
                                            texto="E-mail com alteração de senha enviado" textoBotao="OK"/>
                              </View>
                            </Modal>

                            <Modal transparent={true} animationType="fadeIn" visible={isModalError} >
                            <View style={styles.modalContainer}>
                                  <ModalAppErro fechar={() => sairError()}
                                            texto="O campo de email não pode estar vazio!" textoBotao="OK"/>
                              </View>
                            </Modal>
                            
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
    width: 283,
    height: 134,
    marginTop: 60
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
  input:{
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff',
    width: '94%',
    marginBottom: 15,
    borderRadius: 7,
    fontSize: 17,
    color: '#222',
    height: 56,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27
  },
  btnSubmit:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8C548',
    height: 56,
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 50
  },  
  textSubmit:{
    color: '#fff',
    fontSize: 18
  },
  modalContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  }
  
})

export default PreLogin