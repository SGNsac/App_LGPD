import React, { useState, useEffect, useContext} from 'react';
import { View, FlatList, Modal,ActivityIndicator, StyleSheet, Image, Text} from 'react-native';
import { AuthContext } from '../context/ContextApi.js';
import Agendamento from './Agendamento.js'

function ListaAgendamentos() {

const [token, setToken] = useState()
const [cod, setCod] = useState()
const [objetos, setObjetos] = useState()
const [accessToken, setAccessToken] = useState()
const [objImg,setObjImg] = useState()
const [loading, setLoading] = useState(false)

const {idUser, setIdUser} = useContext(AuthContext)

useEffect(() => {
  //const ac = new AbortController();
    // Capturar ACCESS TOKENg
   setLoading(true)

      const requisicao = async () => {

        await fetch('https://api.ninsaude.com/v1/oauth2/token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'cache-control': 'no-cache'
          },
          body: 'grant_type=refresh_token&refresh_token=85f138ae6922c4b4101c6eec60ebf53e18f6d342eb1c5c84940a0e0d0fed65c93366e19253ada67819e1e3e15e24a0bf88254e2ce64bcda741cc63c501b51670'
        })
        .then((resp) => resp.json())
        .then((json) => {
              setAccessToken(() => json.access_token)
              let token = json.access_token

              fetch('https://api.ninsaude.com/v1/atendimento_agenda/listar/paciente/'+idUser, {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer '+token,
                    'Content-Type': 'application/json',
                    'cache-control': 'no-cache'
                }
              })
              .then((resp) => resp.json())
              .then((json) => {
                let pacientes_temp = json.result;

               setObjetos(
                      pacientes_temp.filter((element) => {
                            if(element.status == 0){
                                return true;
                            }else{

                                return false;
                            }
                      })
                )

                  setLoading(false)
                }
              )
              .catch((error) => alert('error: ' + error))
          }
        )
        .catch((error) => alert('error: ' + error))

      }

      requisicao()

  //return () => ac.abort();

},[])

useEffect(() => {

  return () => {
    setAccessToken({});
  };

},[])

if(objetos != 0){
 return (
  
    <View>
          <Modal transparent={true} animationType="fadeIn" visible={loading}  style={styles.modal}>
            <View style={styles.modalContainer}>
                <ActivityIndicator color="white" size={150} />
            </View>
          </Modal>
       
            <FlatList
                style={styles.flatList}
                data={objetos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={ ({item}) => <Agendamento data={item}/>}
            />  
    </View>

  );
 }else{
  return (
    <View style={styles.container}>
      <Image
        source={require("../../imagens/calendario.png")}
        style={styles.imagemCalen}
      />
      <Text style={styles.text}>Sem agendamentos no momento</Text>
    </View>
  );
 }
}


const styles = StyleSheet.create({
  modal:
  {
    flex:1,
    backgroundColor:"blue",
    width:250,
    height: 250,
    alignItems:'center',
    justifyContent: 'center'
  },
  modalContainer:
  {
    width:"100%",
    height:"100%",
    opacity:0.7,
    backgroundColor:'black',
    justifyContent: 'center',
    alignItems: "center"
  },
  flatList:
  {
    marginBottom: 6,
    marginTop: 35
  },
  container:
  {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    fontSize:20,
    color:"#121212"
  },
  imagemCalen:{
    width:200,
    height:200
  }
})


export default ListaAgendamentos