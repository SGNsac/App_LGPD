import { useLinkProps } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { ModalAppConfirmaAgendamento,ModalAppNaoConfirmaAgendamento,ModalAppCovid } from "../Modal/ModalApp";

function Agendamento(props) {
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalNoConfirm, setModalNoConfirm] = useState(false);

  const [modalCovid, setModalCovid] = useState(false);

  function openModalCovid() {
    if(modalCovid == false) {
    setModalCovid(true);
    }else {
      setModalCovid(false);
    }
  }
  function openModalConfirmar() {
    if(modalConfirm == false) {
      setModalConfirm(true);
    }else{
      setModalConfirm(false);
    }
  }
  function openModalNoConfirmar() {
    setModalNoConfirm(true);
  }
  function sairNoConf() {
    setModalNoConfirm(false);
  }
  let aux_vector = props.data.profissionalNome.split("|");
  let aux_nome_profissional = "";
  if (aux_vector.length == 1) {
    //aux_nome_profissional = aux_vector[2].split(":");
    aux_nome_profissional = props.data.profissionalNome;
  } else if (aux_vector.length == 2) {
    //aux_nome_profissional = aux_vector[1].split(":");
    aux_nome_profissional = aux_vector[0] + ' ' + aux_vector[1];
  } else if(aux_vector.length >= 3){
    //aux_nome_profissional = aux_vector[0];
    aux_nome_profissional = aux_vector[0] + ' ' + aux_vector[1] + ' ' + aux_vector[2];
  }
  

  let nome_profissional = aux_nome_profissional;
  let aux_vector_data = props.data.data.split("-");
  let dataFormatada =
    aux_vector_data[2] + "/" + aux_vector_data[1] + "/" + aux_vector_data[0];
  let horaFormatada = props.data.horaInicial.substring(0, 5);
  let foto_medico = ''

  if(props.data.sexo == 'M'){
    foto_medico = '../../imagens/medico.png'
  }else{
    foto_medico = '../../imagens/medica2.png'
  }

  //alert(props.foto)

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textoHeader}> {aux_vector[0]}</Text>
        <Text style={styles.textoHeader}>{aux_vector[1]}</Text>
      </View>

      <View style={styles.containerMain}>
        <View style={styles.containerMain_1}>
          <Image
            style={styles.img}
            source={require('../../imagens/medicos.png')}
          />

          <View style={styles.viewTexto}>
            {/*<Text>Token: {props.data.cod}</Text>
                                    <Text>Pedro Marcos Vinicius Cardoso</Text>
                                    <Text>Fonoaudiologia</Text>
                                    <Text>Audiologia</Text>*/}

            <Text>{nome_profissional}</Text>
            <Text> {props.data.especialidadeDescricao.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.containerMain_2}>
          {/*} <Text style={styles.textoTituloMain}>Consulta dia: 21/10/2021 ás 08:40</Text>

                 <Text style={styles.textoMain}>Clínica: Incentivar Núcleo de Desenvolvimento Infantil</Text>

                                <Text style={styles.textoMain}>Endereço: Av prof Magalhães Neto, n 1450 - sala 103 Pituba - Salvador/BA</Text>*/}

          <Text style={styles.textoTituloMain}>
            Consulta dia: {dataFormatada} ás {horaFormatada}
          </Text>
          <Text style={styles.textoMain}>
            Clínica: {props.data.accountUnidadeDescricao}
          </Text>

          <Text style={styles.textoMain}>
            Endereço: AV PROF MAGALHÃES NETO,N 1450 - SALA 103 PITUBA -
            SALVADOR/BA
          </Text>
        </View>
      </View>

      <View style={styles.containerFooter}>
        <TouchableOpacity style={styles.botaoAreaCancela} onPress={openModalNoConfirmar}>
          <Text style={styles.botaoTextoCancela}>NÃO COMPARECER</Text>
        </TouchableOpacity>
        <Modal transparent={true} animationType="fadeIn" visible={modalNoConfirm}>
          <View style={styles.modalContainer}>
            <ModalAppNaoConfirmaAgendamento
              fechar={() => sairNoConf()}
              dataFormatada={dataFormatada}
              horaFormatada={horaFormatada}
              obj = {props.data}
              clinica={props.data.accountUnidadeDescricao}
            />
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.botaoAreaConfirma}
          onPress={openModalConfirmar}
        >
          <Text style={styles.botaoTextoConfirma}>COMPARECER</Text>
        </TouchableOpacity>
        <Modal transparent={true} animationType="fadeIn" visible={modalConfirm}>
        <View style={styles.modalContainer}>
            <ModalAppConfirmaAgendamento
              funcao={() => openModalCovid()}
              dataFormatada={dataFormatada}
              horaFormatada={horaFormatada}
              textoBotao="Confirmar"
              obj = {props.data}
              fechar={() =>openModalConfirmar()}
              clinica={props.data.accountUnidadeDescricao}
            />
          </View>
        </Modal>
        <Modal transparent={true} animationType="fadeIn" visible={modalCovid}
        >
        <View style={styles.modalContainer}>
            <ModalAppCovid
              funcao = {() => openModalCovid()}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 320,
    marginTop: 8,
    color: "white",
    marginLeft: 7,
    marginRight: 7,
    borderWidth: 1,
    borderColor: "#E2E1E1",
    backgroundColor: "white",
  },
  containerHeader: {
    height: '16%',
    backgroundColor: "#A5A5A5",
    justifyContent: "center",
    overflow: 'hidden',
    padding: 4
  },
  containerMain: {
    height: "69%",
    backgroundColor: "white",
  },
  containerFooter: {
    height: "15%",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "flex-end",
  },
  textoHeader: {
    fontSize: 16,
    color: "white",
  },
  botaoTextoConfirma: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  botaoTextoCancela: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  botaoAreaCancela: {
    flex: 3,
    backgroundColor: "#E21B1B",
    padding: 10,
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
  },
  botaoAreaConfirma: {
    marginLeft: 2,
    flex: 2,
    backgroundColor: "#23CF5C",
    padding: 10,
    height: "90%",
    justifyContent: "center",
  },
  containerMain_1: {
    height: "50%",
    borderBottomColor: "#E2E1E1",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  containerMain_2: {
    height: "50%",
    justifyContent: "center",
  },
  img: {
    margin: 10,
    height: 90,
    width: 90,
  },
  viewTexto: {
    width: "70%",
    marginLeft: 4,
    textAlignVertical: "center",
    textAlign: "left",
    justifyContent: "flex-start",
  },
  textoTituloMain: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 6,
    paddingRight: 6,
  },
  textoMain: {
    paddingLeft: 6,
    paddingRight: 6,
  },
  modalContainer:{
    alignItems: "center",
    justifyContent: "center" 
  }

});

export default Agendamento;
