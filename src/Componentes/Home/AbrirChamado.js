import React, { useState,useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Modal, ScrollView} from 'react-native';
import { Ionicons,AntDesign  } from '@expo/vector-icons';
import {ModalAppConfirma, ModalAppErro,ModalPickerDep,ModalPickerPrio} from '../Modal/ModalApp'
import * as ImagePicker from 'expo-image-picker';
import {AuthContext} from '../context/ContextApi.js';

function Agendamento() {

    const [departamento, setDepartamento] = useState('Escolha o departamento')
    const [idDepartamento, setIdDepartamento] = useState('')
    const [prioridade, setPrioridade] = useState('Escolha a prioridade');
    const [idPrioridade, setIdPrioridade] = useState('');
    const [assunto, setAssunto] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [isModalConfirm, setIsModalConfirm] = useState(false)
    const [isModalError, setIsModalError] = useState(false)
    const [image, setImage] = useState(null);
    const [modalDepPicker, setModalDepPicker] = useState(false);
    const [modalPickerPrio, setModalPickerPrio] = useState(false);
    const [dadosDepartamento, setDadosDepartamento] = useState([])

    const {idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa} = useContext(AuthContext)

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();

        buscaDepartamento(idEmpresa);
      }, []);
    
    function fmodalPicker(){
        if(modalDepPicker == false){
            setModalDepPicker(true);
        }else if(modalDepPicker == true){
            setModalDepPicker(false);
        }
    }
    function fmodalPickerPrio(){
        if(modalPickerPrio == false){
            setModalPickerPrio(true);
        }else if(modalPickerPrio == true){
            setModalPickerPrio(false);
        }
    }

     function  registraChamado(){

        let num_prioridade = '';

        if(prioridade == 'Baixa'){
            num_prioridade = '1';
        }else if(prioridade == 'Média'){
            num_prioridade = '2';
        }else{
            num_prioridade = '3';
        }

        /* alert(JSON.stringify({
            "departament": idDepartamento,
            "priority": num_prioridade,
            "subject": assunto,
            "user": "1",
            "empresa": "1",
            "message": mensagem
         }))*/

      if(departamento == '' || prioridade == '' || assunto == '' || mensagem == ''){
            setIsModalError(true)
        }else{
            
            //let url = 'http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/index.php?enviarChamado';

             fetch('http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/webservice_php_json.php?enviarChamado', {
                method: 'POST',
                body: JSON.stringify({
                    "priority": num_prioridade,
                    "departament": idDepartamento,
                    "subject": assunto,
                    "user": codPessoa,
                    "idempresa": idEmpresa,
                    "message": mensagem
                 })
              })
              .then((resp) => resp.text())
              .then((json) => {
                  console.log(json)

                  if(image != null){
                    sendImage(json);
                    //setIsModalConfirm(true)
                  }else{
                    //setIsModalImage(true)
                    setIsModalConfirm(true)
                  }
                  setAssunto('')
                  setMensagem('')
                  setDepartamento('Escolha o departamento')
                  setPrioridade('Escolha a prioridade')
                  setImage(null)
              })
              .catch((error) => {
                 // alert('error: ' + error)
                 console.log(error)
                  //setLoading(false)
              }) 
            
        }
        
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          console.log(result);
          setImage(result);
        }
      };

     /*const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result).uri;
        }
      };*/

     /* const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          console.log(result);
          setImage(result);
        }
      };*/

      async function sendImage(codMssg){
        let data = image;
       // setLoading(true);
        var link = 'http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/webservice_php_json.php?uploadImage';
        var metodo = 'POST';
        var Autorizacao = 'Authorization';
        let array = data.uri.split('/')
        let formdata = new FormData();
          formdata.append('image', {
          uri: data.uri,
          type: 'image/png', 
          name: ""+codMssg+"",
          tmp_name: data.uri
        });
        fetch(link, {
            method: 'POST',
            body: formdata,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        }).then((response) => response.json())
        .then((data) => {
          console.log(data)
          if(data.INSERIDO){
            //setisModalError(true)
            setIsModalConfirm(true)
          }else{
            alert("Não foi possivel inserir a imagem, tente novamente mais tarde!")
          }
          //setLoading(false)
        }).catch((error) => {
          console.warn(error);
          console.log("erro ao inserir")
         // setLoading(false)
        });
      }

   const sairConf = () => {
    setIsModalConfirm(false)
    setIsModalError(false);
  }
  
  const sairError = () => {
    setIsModalError(false)
  }
  const setData = (option1, option2) => {
    setDepartamento(option1);
    setIdDepartamento(option2);
  }
  const setData2 = (option) => {
    setPrioridade(option);
  }

    
function buscaDepartamento(idempresa){

    let url = 'http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/index.php?departamentoEmpresa';
  
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "idempresa": idempresa
       })
    })
    .then((resp) => resp.json())
    .then((json) => {
       
       setDadosDepartamento(json)
       console.log(json)
       
    })
    .catch((error) => {
        alert('error: ' + error)
    }) 
  
  }
  
 return (
    
    <KeyboardAvoidingView style={styles.cont} animated={true}>
        <ScrollView>
             <View style={styles.container}>

                    <View style={styles.area}>
                            <View style={styles.input}>
                                <TouchableOpacity
                                    onPress={fmodalPicker}
                                    style={styles.modalPickerButton} 
                                >
                                    <Text>{departamento}</Text>
                                    <AntDesign name="caretdown" size={10} color="black"style={styles.iconsModalPicker} />
                                </TouchableOpacity>
                                <Modal transparent={true} animationType="fadeIn"  visible={modalDepPicker} >
                                    <View style={styles.containerAlignCenter}>
                                        <ModalPickerDep 
                                            fechar={() =>fmodalPicker()}
                                            setData={setData}
                                            dados={dadosDepartamento}
                                        />
                                    </View>
                                </Modal>
                            </View>
                    </View>

                    <View style={styles.area}>
                            <View style={styles.input}>
                                <TouchableOpacity
                                    onPress={fmodalPickerPrio}
                                    style={styles.modalPickerButton} 
                                >
                                    <Text>{prioridade}</Text>
                                    <AntDesign name="caretdown" size={10} color="black"style={styles.iconsModalPicker} />
                                </TouchableOpacity>
                                <Modal transparent={true} animationType="fadeIn"  visible={modalPickerPrio} >
                                <View style={styles.containerAlignCenter}>
                                        <ModalPickerPrio 
                                            fechar={() =>fmodalPickerPrio()}
                                            setData={setData2}
                                        />
                                    </View>
                                </Modal>
                            </View>
                    </View>

                    <View style={styles.area}>
                            <Text style={styles.textoLabel}>Assunto</Text> 
                            <TextInput 
                                style={styles.input}
                                value={assunto}
                                onChangeText={(texto) => setAssunto(texto)}
                                placeholder="Ex: Paciente asmático"
                            />
                    </View>

                    <View style={styles.areaMensagem}>
                            <Text style={styles.textoLabel}>Mensagem</Text> 
                            <TextInput 
                                style={styles.inputMensagem}
                                multiline={true}
                                numberOfLines={8}
                                value={mensagem}
                                onChangeText={(texto) => setMensagem(texto)}
                            />
                    </View>

                    <View style={[styles.area, {marginTop: 6}]}>
                            <Text style={styles.textoLabel}>Anexos</Text> 

                            <View style={styles.viewBtnAnexo}>
                                <TouchableOpacity style={styles.areaBtnAnexo}
                                 onPress={pickImage}
                                >
                                    <Text style={styles.textoBtnAnexo}>Adicionar</Text>
                                    <Ionicons style={styles.imgAnexo} name="attach" size={24} color="black" />
                                </TouchableOpacity>

                            </View>
                    </View>
                    {image && 
                    <View style={styles.containerAlignCenter}>
                        <TouchableOpacity onPress={pickImage} style={styles.touchableImg}>
                            <Image source={{ uri: image.uri }} style={styles.areaImg} />
                        </TouchableOpacity>
                    </View>}   
             </View>

             <View style={styles.viewBtnRegistrar}>
                    <TouchableOpacity style={styles.areaBtnRegistrar} onPress={registraChamado}>
                        <Ionicons style={styles.imgRegistrar} name="ios-add" size={24} color="black" />
                        <Text style={styles.textoBtnRegistrar}>Registrar</Text>
                    </TouchableOpacity>
             </View>

                            <Modal transparent={true} animationType="fadeIn" visible={isModalConfirm}>
                                <View style={styles.containerAlignCenter}>
                                    <ModalAppConfirma fechar={() => sairConf()}
                                              texto="Chamado criado com sucesso!" textoBotao="OK" />
                                </View>
                              </Modal>

                            <Modal transparent={true} animationType="fadeIn" visible={isModalError} >
                              <View style={styles.containerAlignCenter}>
                                  <ModalAppErro fechar={() => sairError()}
                                            texto="Preencha todos os campos!" textoBotao="OK"/>
                              </View>
                            </Modal>
        </ScrollView>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({

    cont:{
        flex: 1
    },
    container:{
        marginTop: 35,
        color: 'white',
        marginLeft: 7,
        marginRight: 7,
        borderWidth: 1,
        borderColor:'#E2E1E1',
        backgroundColor: 'white'
    },
    area:{
        justifyContent: 'center',
        height: 100,
        padding: 8
    },
    textoLabel:{
        fontSize: 18,
        marginBottom: 4
    },
    input:{
        backgroundColor: 'blue',
        height: 60,
        padding: 7,
        backgroundColor: '#fff',
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
      shadowRadius: 6.27,
      justifyContent: 'center'
    },
    areaMensagem:{
        justifyContent: 'center',
        height: 250,
        padding: 8,
        
    }, 
    inputMensagem:{
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        borderRadius: 7,
        fontSize: 17,
        height:180,
        color: '#222',
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
    viewBtnAnexo:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    areaBtnAnexo:{
        backgroundColor: '#808080',
        flexDirection: 'row',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 7,
        marginTop: 20
    },
    textoBtnAnexo:{
        fontSize: 16,
        color: 'white'
    },
    viewBtnRegistrar:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:20
    },
    areaBtnRegistrar:{
        backgroundColor: '#23CF5C',
        width: '50%',
        height: 50,
        marginTop: 8,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBtnRegistrar:{
        fontSize: 17,
        color: 'white'
    },
    imgAnexo:{
        color:'white'
    },
    imgRegistrar:{
        color: 'white',
        fontSize: 30
    },
    modalPickerButton:{
        display: 'flex',
        flexDirection: 'row',
        height:'100%',
        alignItems: 'center'
    },
    iconsModalPicker:{
        position: 'absolute',
        right: 10,
    },
    containerAlignCenter:{ 
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableImg:{
        width:"100%",
        height:300,
        padding:20
    },
    areaImg:{
        width: "100%",
        height: "100%"
    },
  });

export default Agendamento