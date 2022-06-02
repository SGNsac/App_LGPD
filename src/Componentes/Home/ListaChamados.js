import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, FlatList, TextInput, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, RefreshControl, Image, Text} from 'react-native';
import Chamado from './Chamado.js'
import { EvilIcons } from '@expo/vector-icons';
import {AuthContext} from '../context/ContextApi.js';


function ListaChamados(navigation) {

/*const info = 
    [
        {id: 1,nome: 'Matheus', idade: 10, ticket: '093F65E080'},
        {id: 2,nome: 'Marcos', idade: 15,ticket: '084A76E132'},
        {id: 3,nome: 'Leandro', idade: 25, ticket: '093F99E081'},
        {id: 4,nome: 'Rodrigo', idade: 30, ticket: '072G613E272'}
    ]*/

//const [dados, setDados] = useState(info)
const [seach, setSeach] = useState('')
const [loading, setLoading] = useState(false)
const [chamados, setChamados] = useState([])
const [base, setBase] = useState([])
const [refreshing, setRefreshing] = useState(false);
const [baseChamado, setBaseChamado] = useState(null)

const {idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa} = useContext(AuthContext)

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const onRefresh = useCallback(() => {
    setRefreshing(true);
    puxaChamados();
    wait(2000).then(() => setRefreshing(false));
}, []);

function puxaChamados(){
    setLoading(true)
        fetch('http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/webservice_php_json/webservice_php_json.php?chamados', {
            method: 'POST',
            body: JSON.stringify({
                "user" : codPessoa,
                "empresa" : idEmpresa,
                "ip": "192.168.1.1"
                })
        })
        .then((resp) => resp.json())
        .then((json) => {
            setBase(json)
            setChamados(json)
            //console.log(json)
            setLoading(false)
        } 

        )
        .catch((error) => {
            alert('error: ' + error)
            setLoading(false)
        }) 
}

useEffect(() => {
    
    puxaChamados();

}, [])

useEffect(() => {

 
            if(seach === ''){
                    setChamados(base)
            }else{
                    //alert(base)

                    setChamados(
                        base.filter(
                            (item) => {
                                if(item.ticket.toLowerCase().indexOf(seach.toLowerCase()) > -1){
                                    return true
                                }else{
                                    return false
                                }
                            }
                    ))
           }

},[seach])

if(base.length>0){
    return (
        <View style={styles.container}>

            <Modal transparent={true} animationType="fadeIn" visible={loading} style={styles.modalArea}>
                <View style={styles.modalView}>
                    <ActivityIndicator color="white" size={150} />
                </View>
            </Modal>
            <View style={styles.areaInput}>
                <TouchableOpacity style={styles.containerBtn}>
                    <EvilIcons name="search" size={30} color="black" />
                </TouchableOpacity>    
                <TextInput 
                    style={styles.input}
                    value={seach}
                    onChangeText={(texto) => setSeach(texto)}
                    placeholder="Pesquisar por Ticket"
                />
            </View>
            <FlatList
                style={styles.lista}
                data={chamados}
                keyExtractor={(item) => item.cod_chamado.toString()}
                renderItem={ ({item}) => <Chamado data={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            /> 
        </View>
    );
}

else{
    return(
        <View style={styles.container}>

           
            <FlatList
                style={styles.lista}
                data={chamados}
                keyExtractor={(item) => item.cod_chamado.toString()}
                renderItem={ ({item}) => <Chamado data={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            /> 

            {loading == false ?
            <View style={styles.containerImg}>
                
                <Image
                    source={require("../../imagens/headset2.png")}
                    style={styles.img}
                />
                <Text style={styles.text}>
                    Sem chamados no momento
                </Text>

                
            </View>
            : null}

            
        </View>
        
    );
}
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        marginTop: 37,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input:{
        width: '88%',
        height: '100%',
        padding: 8,
        fontSize: 18
    },
    lista:{
        marginBottom: 6,
        width: '100%'
    },
    areaInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '96%',
        borderRadius: 7,
        fontSize: 20,
        color: '#222',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
              width: 0,
              height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        height: 56,
        marginBottom: 6
    },
    containerBtn:{
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center'
      },
    modalArea: {
        flex:1,
        backgroundColor:"blue",
        width:250,
        height: 250,
        alignItems:'center',
        justifyContent: 'center'
    },
    modalView:{
        width:"100%",
        height:"100%",
        opacity:0.7,
        backgroundColor:'black',
        justifyContent: 'center',
        alignItems: "center"
    },
    img:{
        width:200,
        height:200
    },
    text:{
        fontSize:20,
        color:"#121212",
        marginTop:10
    },
    containerImg:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 160
    }

})

export default ListaChamados