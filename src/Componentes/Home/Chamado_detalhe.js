import React, { useState, useEffect, useCallback, useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Platform
} from "react-native";
import { Ionicons, FontAwesome,MaterialCommunityIcons  } from "@expo/vector-icons";
import FlatListItem from "../flatList/flatListDetalhes";
import { NavigationContainer,useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import {AuthContext} from '../context/ContextApi.js';


export default function App({ route}){
    const navigation = useNavigation();
    const { chamado } = route.params;
    const[loading, setLoading] = useState(false)
    const [detalheChamado, setDetalheChamado] = useState(null)
    const [detalheMssgChamado, setDetalheMssgChamado] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [departamento, setDepartamento] = useState("");
    var depe = "";

    const {idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa} = useContext(AuthContext)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
     const onRefresh = useCallback(() => {
      setRefreshing(true);

      if(Platform.OS === 'ios')
      {

        puxaChamadoDetalheIos();

      }else{

        puxaChamadoDetalheAndroid();
      }
     
      wait(2000).then(() => setRefreshing(false));
    }, []);

    async function puxaChamadoDetalheAndroid(){

        setLoading(true)
       await fetch('http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/webservice_php_json.php?chamado_detalhe', {
            method: 'POST',
            body: JSON.stringify({
                "idchamado": chamado.cod_chamado,
                "user" : codPessoa,
                "empresa" : idEmpresa,
                "ip": "192.168.1.1"
                })
        }).then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);A
            setDepartamento(responseJson.CHHI_DEPA_COD.toLowerCase())
            depe = responseJson.CHHI_DEPA_COD.toLowerCase();
            //console.log(depe)
            //console.log(departamento)
            setDetalheChamado(responseJson);
            setDetalheMssgChamado(responseJson.messages);
            // console.log(detalheChamado.messages)
            setLoading(false)
            }).catch((error) => {
            console.warn(error);
            });
    }


   async function puxaChamadoDetalheIos(){

      //setLoading(true)
       await fetch('http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/webservice_php_json.php?chamado_detalhe', {
            method: 'POST',
            body: JSON.stringify({
                "idchamado": chamado.cod_chamado,
                "user" : codPessoa,
                "empresa" : idEmpresa,
                "ip": "192.168.1.1"
                })
        }).then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);A
            setDepartamento(responseJson.CHHI_DEPA_COD.toLowerCase())
            setDetalheChamado(responseJson);
            setDetalheMssgChamado(responseJson.messages);
            // console.log(detalheChamado.messages)
            //setLoading(false)
            }).catch((error) => {
            console.warn(error);
            });
    }

    useEffect(() => {
        
     if(Platform.OS === 'ios')
      {

        puxaChamadoDetalheIos();

      }else{

        puxaChamadoDetalheAndroid();
      }     

    }, [])


    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.textAreaHeader}>
              <Text style={styles.textoHeader}>Status:{chamado.status}</Text>
              <Text style={styles.textoHeader}>Departamento: {departamento}</Text>
              <Text style={styles.textoHeader}>Assunto: {chamado.assunto}</Text>
            </View>
            <View style={styles.contentHeader}>
              <Text style={styles.textoContent1}>Ticket :</Text>
              <Text style={styles.textoContent2}>{chamado.ticket}</Text>
              <Text style={styles.textoContent1}>Prioridade :</Text>
              <Text style={styles.textoContent2}>
              {
                chamado.prioridade == 1 ?
                    <FontAwesome name="exclamation-circle" size={16} color="green" />
                :
                chamado.prioridade == 2 ?
                    <FontAwesome name="exclamation-circle" size={16} color="#E8C548" />
                :
                    <FontAwesome name="exclamation-circle" size={16} color="red" />
              }
               
              </Text>
            </View>
          </View>
          <View style={styles.contentBody}>
            <FlatList data={detalheMssgChamado}
            style={{
                // marginBottom:35,
                // paddingBottom:10,
                marginTop:0}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.cod_chamado_mssg.toString()}
    
            renderItem={({item})=><FlatListItem item={item}/>}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
          }
            />
          </View>
          <TouchableOpacity style={styles.icon2}
            onPress={
              ()=>{
                navigation.navigate('Responder_chamado', {chamado:chamado, deta_chamado: detalheChamado})
              }
            }
          >
              <MaterialCommunityIcons name="message-reply" size={26} color="white" />
          </TouchableOpacity>

          <Modal transparent={true} animationType="fadeIn" visible={loading} style={styles.modalArea}>
            <View style={styles.containerModal}>
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
    //   marginTop: 10,
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
    //   flex:1
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
    //   fontWeight: "bold",
    },
    textoContent2: {
      textAlign: "center",
      marginTop: 2,
      color:'black',
      fontWeight: "bold",
    },
    contentBody: {
        flex:1
    },
    image: {
      width: "100%",
      height: 500,
      resizeMode: "cover",
      marginTop: 10,
    },
    icon2:{
      zIndex:10000,
      position:"absolute",
      bottom:70,
      right: 30,
      width:50,
      height:50,
      borderRadius:25,
      backgroundColor:"#01A78F",
      alignItems: "center",
      justifyContent:"center",
    },
    modalArea:{
      flex:1,
      backgroundColor:"blue",
      width:250,
      height: 250,
      alignItems:'center',
      justifyContent: 'center'
    },
    containerModal:{
      width:"100%",
      height:"100%",
      opacity:0.7,
      backgroundColor:'black',
      justifyContent: 'center',
      alignItems: "center"
    }
  });
  