import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import {View, Text, TextInput, StyleSheet, ImageBackground, KeyboardAvoidingView, Image, Animated,
       TouchableOpacity, Modal, ActivityIndicator} from 'react-native'
import {ModalAppConfirma, ModalAppErro} from '../Modal/ModalApp'

function Cadastro( { navigation } ){

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [id, setId] = useState('')
  const [hidePass, setHidePass] = useState(true)
  const [isModalConfirm, setIsModalConfirm] = useState(false)
  const [isModalError, setIsModalError] = useState(false)
  const [loading, setLoading] = useState(false)
 // const url = 'http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/index.php?login'

/* function irRecuperarSenha(){

    var e;
    if(login !== null){
        e = login;
    }else{
        e = '';
    }
      navigation.navigate('RecuperarSenha',{email: e});
 } */

 const sairConf = () => {
  setIsModalConfirm(false)
}

const sairError = () => {
  setIsModalError(false)
}

function cadastrar(){

    if(email == '' || senha == ''){
        
        setIsModalError(true);

    }else{

        setLoading(true)

        fetch('https://api.ninsaude.com/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache'
            },
            body: 'grant_type=password&account='+conta+'&username='+usuario+'&password='+senha+'&accountUnit=1'
        })
        .then((resp) => resp.json())
        .then((obj) => {
            setLoading(false)
            setRefreshToken(obj.refresh_token);
            setIsModalConfirm(true);
        })
        .catch((error) => {
            let compErro = 'Não foi possível cadastrar este usuário!';
            alert('Erro: ' + error + '\n' + compErro);
        })

    }
}

function cancelar(){

    setEmail('');
    setSenha('');
}
 

  return(
            
      <KeyboardAvoidingView style={styles.container}>

          <ImageBackground source={require('./../../imagens/lgpd_protecao_dados.png')}
                  resizeMode="cover" style={styles.image}>    

                        <View style={styles.containerImagem}>
                                  <Image 
                                      style={styles.imageLogo}
                                      source={require('./../../imagens/incentivarLogo.png')}
                                  />
                        </View>

                          <Animated.View style={styles.containerForm}>

                            <View style={styles.contLabelCadastro}>
                                    <Text style={styles.textLabelCadastro}>CADASTRO</Text>
                            </View>

                          <TextInput style={styles.input} placeholder='E-mail'
                              autoCorrect={false} value={email} onChangeText={(text)=> setEmail(text) }/>


                              <View style={styles.inputAreaSenha}>

                                  <TextInput style={styles.inputSenha}
                                  secureTextEntry={hidePass} placeholder='Senha' 
                                  autoCorrect={false} value={senha} onChangeText={(text)=> setSenha(text)}/>
                                  
                                  <TouchableOpacity style={styles.iconSenha} 
                                  onPress={() => setHidePass(!hidePass) }>
                                      {
                                      hidePass ? <Ionicons name='eye' size={25} />
                                      : <Ionicons name='eye-off' size={25} />
                                      }
                                  </TouchableOpacity>
                                  
                              </View>

                              <View style={styles.groupBtn}>
                                    <TouchableOpacity style={styles.btnSubmit} onPress={() => cadastrar()}>
                                        <Text style={styles.textSubmit}> Cadastrar </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnCancelar} onPress={() => cancelar()} >
                                        <Text style={styles.textCancelar}> Cancelar </Text>
                                    </TouchableOpacity>      
                              </View>

                              <Modal transparent={true} animationType="fadeIn" visible={isModalConfirm}>
                                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                    <ModalAppConfirma fechar={() => sairConf()}
                                              texto="Cadastro efetuado com sucesso" textoBotao="OK" />
                                </View>
                              </Modal>

                            <Modal transparent={true} animationType="fadeIn" visible={isModalError} >
                              <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                  <ModalAppErro fechar={() => sairError()}
                                            texto="Preencha todos os campos!" textoBotao="OK"/>
                              </View>
                            </Modal>

                            <Modal transparent={true} animationType="fadeIn" visible={loading} style={{flex:1, backgroundColor:"blue", width:250, height: 250, alignItems:'center',justifyContent: 'center'}}>
                                <View style={{width:"100%", height:"100%", opacity:0.7, backgroundColor:'black', justifyContent: 'center', alignItems: "center"}}>
                                    <ActivityIndicator color="white" size={150} />
                                </View>
                            </Modal>

                          </Animated.View>  
                          
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
        width: 283,
      height: 134
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
  
    input:{
      backgroundColor: '#fff',
      width: '100%',
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
      width: '40%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E8C548',
      height: 56,
      borderRadius: 7,
      marginTop: 20,
      marginRight: 5
    },

    btnCancelar:{
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        height: 56,
        borderRadius: 7,
        marginTop: 20
    },
  
    textSubmit:{
      color: '#fff',
      fontSize: 18
    },

    textCancelar:{
      color: '#fff',
      fontSize: 18
    },
  
    btnRegister:{
      marginTop: 13
    },
  
    textRegister:{
      color: '#2A2C4B',
      fontSize: 15,
      marginTop: 1
    },
  
    inputSenha:{
        width: '85%',
        height: 50,
        padding: 10,
        color: '#222',
        fontSize: 17
    },
  
    inputAreaSenha:{
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 7,
        height: 56,
        alignItems: 'center',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27
    },
  
    iconSenha:{
        width: '15%',
        height:50,
        justifyContent: 'center',
        alignItems: 'center'
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
    groupBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contLabelCadastro:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6
    },
    textLabelCadastro:{
        color: '#DCDCDC',
        fontSize: 40
    }
})

export default Cadastro