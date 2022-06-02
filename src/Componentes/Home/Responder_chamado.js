import React, { useState, useEffect, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {ModalAppConfirma} from '../Modal/ModalApp'
import { NavigationContainer,useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import {AuthContext} from '../context/ContextApi.js';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function respChamado({ route}) {
  const chamado = route.params;
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const[loading, setLoading] = useState(false)
  const[chme_cod, setChme_cod] = useState()
  const[isModalError, setisModalError] = useState(false)
  const navigation = useNavigation();

  const {idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa} = useContext(AuthContext)

  useEffect(() => {
    
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    console.log(chamado.deta_chamado)
  }, []);

  console.log("Codigo do chamado: "+chamado.deta_chamado.CHAM_COD)

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
  
  function enviarMensagem(){
    console.log( chamado)
    setLoading(true)
    fetch('http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/webservice_php_json.php?inserirMensagem', 
    {
        method: 'POST',
        body: JSON.stringify({
            "idchamado": chamado.deta_chamado.CHAM_COD,
            "user" : codPessoa,
            "conteudo":text
            })
    }).then((response) => response.json())
    .then((responseJson) => {
      
      setChme_cod(responseJson)
      console.log("CodMssg"+responseJson);
      setLoading(false)

      if(image != null){
        sendImage(responseJson);
      }else{
        setisModalError(true)
      }
      
    }).catch((error) => {
      console.warn(error);
      setLoading(false)

    });
  }


  async function sendImage(codMssg){
    let data = image;
    setLoading(true);
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
        setisModalError(true)

      }else{
        alert("Não foi possivel inserir a imagem, tente novamente mais tarde!")
      }
      setLoading(false)
    }).catch((error) => {
      console.warn(error);
      console.log("erro ao inserir")
      setLoading(false)
    });
  }

  function backScreen(){
    setisModalError(false);
    navigation.goBack();
  }


  return (
    <View style={styles.container}>
      <Modal transparent={true} animationType="fadeIn" visible={isModalError} >
        <View style={styles.modalContainer}>
            <ModalAppConfirma fechar={() => backScreen()}
                      texto="Registrado com sucesso!" textoBotao="OK"/>
        </View>
      </Modal>
      <TouchableOpacity  style={styles.icons}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* {console.log(chamado.cod)} */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
            <View style={styles.textAreaHeader}>
              <Text style={styles.textoHeader}>Status: {chamado.deta_chamado.CHHI_STATUS}</Text>
              <Text style={styles.textoHeader}>Departamento: {chamado.deta_chamado.CHHI_DEPA_COD}</Text>
              <Text style={styles.textoHeader}>Assunto: {chamado.deta_chamado.CHAM_ASSUNTO}</Text>
            </View>
            <View style={styles.contentHeader}>
              <Text style={styles.textoContent1}>Ticket :</Text>
              <Text style={styles.textoContent2}>{chamado.deta_chamado.CHAM_TICKET}</Text>
              <Text style={styles.textoContent1}>Prioridade:</Text>
              <Text style={styles.textoContent2}>
              {
                chamado.chamado.prioridade == 1 ?
                    <FontAwesome name="exclamation-circle" size={16} color="green" />
                :
                chamado.chamado.prioridade == 2 ?
                    <FontAwesome name="exclamation-circle" size={16} color="#E8C548" />
                :
                    <FontAwesome name="exclamation-circle" size={16} color="red" />
              }
              </Text>
            </View>
          </View>
        <View style={styles.content}>
          <Text style={styles.text}>Mensagem :</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            value={text}
            onChangeText={(texto) => {
              setText(texto);
            }}
            style={styles.textInput}
          />
          <Text style={styles.text}>Anexos :</Text>
          {image && (
            <View style={styles.imgArea}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.btnImg}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={styles.imgContainer}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.viewBtnAnexo}>
              {image!= null? 
                    <TouchableOpacity style={styles.areaBtnAnexo} onPress={()=> setImage(null)}>
                        <Text style={styles.textoBtnAnexo}>Limpar</Text>
                        <Ionicons
                        style={styles.imgAnexo}
                        name="trash"
                        size={24}
                        color="black"
                        />
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={styles.areaBtnAnexo} onPress={pickImage}>
                        <Text style={styles.textoBtnAnexo}>Adicionar</Text>
                        <Ionicons
                        style={styles.imgAnexo}
                        name="attach"
                        size={24}
                        color="black"
                        />
                    </TouchableOpacity>
            }
            
          </View>
          
        </View>

        <View style={styles.viewBtnRegistrar}>
          <TouchableOpacity onPress={()=> enviarMensagem()} style={styles.areaBtnRegistrar}>
            <Ionicons
              style={styles.imgRegistrar}
              name="ios-add"
              size={24}
              color="black"
            />
            <Text style={styles.textoBtnRegistrar}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal transparent={true} animationType="fadeIn" visible={loading} style={styles.modalLoading}>
        <View style={styles.modalLoadingArea}>
            <ActivityIndicator color="white" size={150} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    flex: 1,
    height: "100%",
  },
  icons: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  header: {
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom:1,
    paddingTop:1,
    //marginTop: 10,
    shadowColor: "#121210",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    display: "flex",
    flexDirection: "row",
    //flex:1
    },
    textoHeader: {
      fontSize: 12.8,
      marginRight: 2,
      marginTop: 5,
  },
  textAreaHeader: {
      flex: 2,
  },
  textoContent1: {
    textAlign: "center",
    marginTop: 2,
    color:'black',
    fontSize:10,
    //fontWeight: "bold",
  },
  textoContent2: {
    textAlign: "center",
    marginTop: 2,
    color:'black',
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#FFF",
    padding: 10,
    marginTop: 20,
    shadowColor: "#121210",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  textInput: {
    textAlignVertical: "top",
    borderWidth: 0.3,
    borderColor: "#c1c1c1",
    maxHeight: 200,
    height: 200,
    padding: 10,
  },
  text: {
    fontSize: 15,
    margin: 10,
  },
  viewBtnRegistrar: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    marginTop: 30,
  },
  areaBtnRegistrar: {
    backgroundColor: "#23CF5C",
    width: "50%",
    height: 50,
    marginTop: 8,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textoBtnRegistrar: {
    fontSize: 17,
    color: "white",
  },
  imgRegistrar: {
    color: "white",
    fontSize: 30,
  },
  viewBtnAnexo: {
    justifyContent: "center",
    alignItems: "center",
  },
  areaBtnAnexo: {
    backgroundColor: "#808080",
    flexDirection: "row",
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 7,
    marginTop: 20,
  },
  textoBtnAnexo: {
    fontSize: 16,
    color: "white",
  },
  imgAnexo: {
    color: "white",
  },
  modalContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgArea:{
    alignItems: "center",
    justifyContent: "center" 
  },
  btnImg:{
    width: "100%",
    height: 300,
    padding: 10
  },
  imgContainer:{
    width: "100%",
    height: "100%"
  },
  modalLoading:{
    flex:1,
    backgroundColor:"blue",
    width:250,
    height: 250,
    alignItems:'center',
    justifyContent: 'center'
  },
  modalLoadingArea:{
    width:"100%",
    height:"100%",
    opacity:0.7,
    backgroundColor:'black',
    justifyContent: 'center',
    alignItems: "center"
  }
});
