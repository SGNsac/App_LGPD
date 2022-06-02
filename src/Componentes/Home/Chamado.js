import React,{ useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import TelaDetalhe from '../Modal/telaDetalhe';
import { NavigationContainer,useNavigation, useNavigationContainerRef } from '@react-navigation/native';


function Chamado({data}) {
    const [modalDetalhe,setModalDetalhe] = useState(false);
    let mensagem = replaceHtml(data.mssg)

    
    let data_hora_temp = new Date(1607110465663)
    function replaceHtml(data){
        let mensagem = data.replace(/<p>/g, "")
        mensagem = mensagem.replace(/<\/p>/g, "")
        mensagem = mensagem.replace(/<div>/g, "")
        mensagem = mensagem.replace(/<\/div>/g, "")
        mensagem = mensagem.replace(/<strong>/g, "")
        mensagem = mensagem.replace(/<\/strong>/g, "")
        mensagem = mensagem.replace(/ol&aacute/g, "")
        mensagem = mensagem.replace(/<b>/g, "")
        mensagem = mensagem.replace(/<\/b>/g, "")
        mensagem = mensagem.replace(/&nbsp;/g, "")
        return mensagem
    }

    const navigation = useNavigation();

 return (

    <View style={styles.cont}>
        
        <TouchableOpacity 
            onPress={() =>
                navigation.navigate('Chamado_detalhe', {chamado: data})
              }
        >
                <View style={styles.container}>

                    <View style={styles.containerHeader}>
                        <Text style={styles.textoHeader}>De: {data.pessoa_last}</Text>

                        <View style={styles.areaTextoHeader}>
                                <Text style={styles.textoHeaderT}>Ticket: </Text>
                                <Text style={styles.textoNumeroHeader}>{data.ticket}</Text>
                        </View>
                        
                    </View>

                    <View style={styles.containerMain}> 
                        <Text style={styles.textoAssunto}>Assunto: {data.assunto}</Text>

                        <Text style={styles.texto}>Mensagem: {mensagem.length > 500 ? mensagem.substring(0,500)+'...' : mensagem}</Text>
                
                            <View style={styles.viewTextoFooter}>
                                <Text style={styles.textoFooter}>{data.data}</Text>
                            </View>
                
                    </View>
                </View>
        </TouchableOpacity>
        <Modal animationType="fadeIn" visible={modalDetalhe}>
            <TelaDetalhe funcao= {() => (telaDetalheVisible())}
            />
        </Modal>
    </View>

  );
}

const styles = StyleSheet.create({

    cont:{
        flex: 1
    },
    container:{
        height: 'auto',
        marginTop: 8,
        color: 'white',
        marginLeft: 7,
        marginRight: 7,
        borderWidth: 1,
        borderColor:'#E2E1E1',
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: 10
    },
    containerHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6
    },
    textoAssunto:{
        marginBottom: 10,
        padding: 6,
        fontSize: 16
    },
    texto:{
        padding: 3,
        fontSize: 16,
        textAlign: 'justify'
    },
    textoFooter:{
        fontSize: 13,
        padding: 6
    },
    viewTextoFooter:{
        alignItems: 'flex-end',
        position: 'relative',
        bottom: 2,
        fontSize: 20
    },
    textoNumeroHeader:{
        fontWeight: 'bold'
    },
    areaTextoHeader:{
        flexDirection: 'row'
    },
    textoHeader:{
        fontSize: 16
    },
    textoHeaderT:{
        color: '#BEBBBB'
    }
  });

export default Chamado