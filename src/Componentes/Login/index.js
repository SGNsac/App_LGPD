import React, {useEffect, useState, useContext} from 'react'
import { Ionicons } from '@expo/vector-icons'
import {View, Text, TextInput, StyleSheet, ImageBackground, KeyboardAvoidingView, Image, Animated,
       TouchableOpacity, Modal} from 'react-native'
import {ModalAppConfirma, ModalAppErro} from '../Modal/ModalApp'
import { AuthContext } from '../context/ContextApi'

function Login( {navigation, route}){

  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [hidePass, setHidePass] = useState(true)
  const [user, setUser] = useState()
  const [isModalConfirm, setIsModalConfirm] = useState(false)
  const [isModalError, setIsModalError] = useState(false)
  const url = 'http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/index.php?login'

  const {idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa} = useContext(AuthContext)

 function irRecuperarSenha(){
    var e;
    if(login !== null){
        e = login;
    }else{
        e = '';
    }
      navigation.navigate('RecuperarSenha',{email: e});
 } 

 const sairConf = () => {
  setIsModalConfirm(false)
}

const sairError = () => {
  setIsModalError(false)
}

 function entrar(){

    if(login == '' || senha == ''){
      setIsModalError(true)
    }else{

      fetch(url, {
        method: 'POST',
        body: JSON.stringify({"login": ""+login,"pswd" : ""+senha,"data" : new Date(),
        "ip": "192.168.1.119"})
      })
      .then((resp) => resp.json())
      .then((json) => {
          if(json.error){
            alert(json.error)
          }else{
            setCodPessoa(json.cod_pessoa);
            setIdEmpresa(json.idempresa);

            if(json.id != "" && json.id != 0){
              setIdUser(json.id);
              navigation.navigate('Home')
            }else{
              buscarPaciente(json.cpf, json.telefone);
            }

            //navigation.navigate('Home')
            //console.log(json);
          }
      })
      .catch((error) => alert('error: ' + error))
    }

 }

 async function buscarPaciente(cpf, telefone){

        await fetch('https://api.ninsaude.com/v1/oauth2/token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'cache-control': 'no-cache'
          },
          body: 'grant_type=refresh_token&refresh_token='+route.params.refresh_token
        })
        .then((resp) => resp.json())
        .then(async (json) => {
              let access_token = json.access_token;

                  await fetch('https://api.ninsaude.com/v1/cadastro_paciente/listar?cpf='+cpf+'&foneCelular='+telefone, {
                        headers: {
                            'Authorization': 'bearer '+access_token,
                            'Cache-Control': 'no-cache',
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((resp) => resp.json())
                    .then((json) => {
                      var result = json.result[0];
                      console.log(json.result)
    
                        if(result){
                            //alert(result.nome + ' parte 1')
                            //console.log(result)
                            let  nomeUsuario = result.nome;
                            let idUsuario = result.id;
                            //console.log(result.id)
                            setIdUser(idUsuario);
                            navigation.navigate('Home')
                        }else{
                            alert('Não existe esse paciente no nosso sistema!');
                        }
                    })
                    .catch((error) => alert('error: ' + error))
        })
        
 }



  return(  
   
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

          <ImageBackground source={require('./../../imagens/lgpd_protecao_dados.png')}
                  resizeMode="cover" style={styles.image}>    

                        <View style={styles.containerImagem}>
                                  <Image 
                                      style={styles.imageLogo}
                                      source={require('./../../imagens/logo_sgn_menor.png')}
                                  />
                                  <Text style={styles.text}>SISTEMAS E TECNOLOGIA</Text>

                        </View>

                          <Animated.View style={styles.containerForm}>
                            
                              <TextInput style={styles.input} placeholder='Login'
                              autoCorrect={false} value={login} onChangeText={(text)=> setLogin(text) }/>


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

                              <TouchableOpacity style={styles.btnSubmit} onPress={() => entrar()}>
                                  <Text style={styles.textSubmit}> Acessar </Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.btnRegister} onPress={irRecuperarSenha}>
                                  <Text style={styles.textRegister}> Recuperar Senha </Text>
                              </TouchableOpacity>

                              <Modal transparent={true} animationType="fadeIn" visible={isModalConfirm}>
                                <View style={styles.modalContainer}>
                                    <ModalAppConfirma fechar={() => sairConf()}
                                              texto="Login efetuado com sucesso" textoBotao="OK" />
                                </View>
                              </Modal>

                            <Modal transparent={true} animationType="fadeIn" visible={isModalError} >
                            <View style={styles.modalContainer}>
                                  <ModalAppErro fechar={() => sairError()}
                                            texto="Preencha todos os campos!" textoBotao="OK"/>
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
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8C548',
    height: 56,
    borderRadius: 7,
    marginTop: 20
    },
    textSubmit:{
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
  modalContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    fontSize:17,
    marginTop:30,
    color:"#2f2f2f",
    textAlign: 'center',
    marginBottom:-100
  }
  
})

export default Login