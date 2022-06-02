import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

function ModalAppConfirma({ fechar, texto, textoBotao }) {
  const confirma = () => {
    fechar();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("./../../imagens/checked.png")}
        />

        <Text style={styles.texto}>{texto}</Text>

        <TouchableOpacity style={styles.containerBotao} onPress={confirma}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ModalAppErro({ fechar, texto, textoBotao }) {
  const error = () => {
    fechar();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          style={styles.img}
          source={require("./../../imagens/x-button.png")}
        />

        <Text style={styles.texto}>{texto}</Text>

        <TouchableOpacity style={styles.containerBotao} onPress={error}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


function ModalAppConfirmaAgendamento({
  funcao,
  dataFormatada,
  horaFormatada,
  textoBotao,
  clinica,
  fechar,
  obj,
}) {
  
  const abrir = () => {
    /* fetch('https://api.ninsaude.com/v1/atendimento_agenda/alterar/status/agendamento/'+obj.id, {
            method: 'PUT',
            headers: {
                'Authorization': 'bearer ACCESSTOKEN',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            },
            body: JSON.stringify({
                    "id": obj.id,
                    "accountUnidade": obj.accountUnidade,
                    "profissional": obj.profissional,
                    "data": obj.data, 
                    "horaInicial": obj.horaInicial,
                    "horaFinal": obj.horaFinal,
                    "horaChegada": obj.horaChegada,
                    "paciente": obj.paciente, 
                    "status": 2, 
                    "convenio": obj.convenio,
                    "convenioPlano": obj.convenioPlano,
                    "convenioCarteira": obj.convenioCarteira,
                    "convenioValidade": obj.convenioValidade,
                    "servico": obj.servico,
                    "especialidade": obj.especialidade, 
                    "encaminhador": obj.encaminhador,
                    "sala": obj.sala, 
                    "hashRecurso": hashRecurso, 
                    "alertaVaga": obj.alertaVaga,
                    "acompanhanteNome": obj.acompanhanteNome, 
                    "acompanhanteTelefone": obj.acompanhanteTelefone,
                    "enviadoConfirmacao": obj.enviadoConfirmacao
                })
        })
        .then(() => {
             alert('Agendamento confirmado!')
        })
        .catch((error) => alert('error: ' + error))*/

    funcao();
  };

  const fecharr = () => {
    fechar();
  };

  return (
    <View style={styles.containerAgen}>
      <View style={styles.modalAgen}>
        <TouchableOpacity style={styles.iconConf} onPress={fecharr}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
        <Image
          style={styles.imgAgen}
          source={require("./../../imagens/checked.png")}
        />

        <Text style={styles.textoAgen}>Confirmar presença?</Text>

        <Text style={styles.textoAgen}>
          Dia {dataFormatada} ás {horaFormatada}
        </Text>

        <Text style={styles.texto2Agen}>
          Endereço: AV PROF MAGALHÃES NETO,N 1450 - SALA 103 PITUBA -
          SALVADOR/BA
        </Text>

        <Text style={styles.texto2Agen}>Clínica: {clinica}</Text>

        <TouchableOpacity style={styles.containerBotaoAgen} onPress={abrir}>
          <Text style={styles.textoBotaoAgen}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ModalAppNaoConfirmaAgendamento({
  fechar,
  dataFormatada,
  horaFormatada,
  clinica,
}) {
  const confirma = () => {
    /*fetch('https://api.ninsaude.com/v1/atendimento_agenda/alterar/status/agendamento/'+obj.id, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'bearer ACCESSTOKEN',
                        'Content-Type': 'application/json',
                        'cache-control': 'no-cache'
                    },
                    body: JSON.stringify({
                            "id": obj.id,
                            "accountUnidade": obj.accountUnidade,
                            "profissional": obj.profissional,
                            "data": obj.data, 
                            "horaInicial": obj.horaInicial,
                            "horaFinal": obj.horaFinal,
                            "horaChegada": obj.horaChegada,
                            "paciente": obj.paciente, 
                            "status": 5, 
                            "convenio": obj.convenio,
                            "convenioPlano": obj.convenioPlano,
                            "convenioCarteira": obj.convenioCarteira,
                            "convenioValidade": obj.convenioValidade,
                            "servico": obj.servico,
                            "especialidade": obj.especialidade, 
                            "encaminhador": obj.encaminhador,
                            "sala": obj.sala, 
                            "hashRecurso": hashRecurso, 
                            "alertaVaga": obj.alertaVaga,
                            "acompanhanteNome": obj.acompanhanteNome, 
                            "acompanhanteTelefone": obj.acompanhanteTelefone,
                            "enviadoConfirmacao": obj.enviadoConfirmacao
                        })
                })
                .then(() => {
                     alert('Agendamento cancelado!')
                })
                .catch((error) => alert('error: ' + error))*/
  };

  const close = () => {
    fechar();
  };

  return (
    <View style={styles.containerAgen}>
      <View style={styles.modalAgen}>
        <Image
          style={styles.img}
          source={require("./../../imagens/x-button.png")}
        />

        <Text style={styles.textoAgen}>Cancelar presença?</Text>

        <Text style={styles.textoAgen}>
          Dia {dataFormatada} ás {horaFormatada}
        </Text>

        <Text style={styles.texto2Agen}>
          Endereço: AV PROF MAGALHÃES NETO,N 1450 - SALA 103 PITUBA -
          SALVADOR/BA
        </Text>

        <Text style={styles.texto2Agen}>Clínica: {clinica}</Text>
        <View style={styles.btnAreaNaoConf}>
          <TouchableOpacity
            style={styles.containerBotaoAgenNao}
            onPress={close}
          >
            <Text style={styles.textoBotaoAgen}>Não</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerBotaoAgenSim}
            onPress={confirma}
          >
            <Text style={styles.textoBotaoAgen}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ModalAppCovid({ funcao }) {
  const fechar = () => {
    funcao();
  };
  return (
    <View style={styles.containerAgen}>
      <View style={styles.modalCovid}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.ViewAreaCovid}>
            <TouchableOpacity style={styles.iconCovid} onPress={fechar}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <Image
              style={styles.imgCovid}
              source={require("./../../imagens/incentivarLogo.png")}
            />

            <Text style={styles.textoCovid1}>
              Nós da Incentivar estimamos oferecer uma estrutura segura e
              adequada para o atual momento. Sendo assim gostariamos de
              solicitar seu apoio para seguirmos as medidas de segurança ao
              realizarmos nosso encontro presencial
            </Text>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                É obrigatório o uso de mascara (por precaução levar uma de
                reserva)
              </Text>
            </View>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                Não será permitido mais de um acompanhante evitar aglomeração
              </Text>
            </View>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                Por gentileza evitr atrasos ou chegar com muita antecidência,
                para se evitar aglomeração na recepção
              </Text>
            </View>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                Teve alguns dos sistomas da covid ou entrou em contato com
                pessoas que tiveram nos ultimos 4 dias ligue para a equipe e
                remarque o seu horario
              </Text>
            </View>
            <View style={styles.liCovid}>
              <AntDesign
                name="caretright"
                size={14}
                style={styles.iconCovids}
                color="black"
              />
              <Text style={styles.textoCovid2}>
                Lembrando que em caso de não compararecimento ou cancelamento
                com menos de 12 horas de antecidência ao agendamento, a consulta
                será computada.
              </Text>
            </View>
            <Text style={styles.textoCovid3}>
              A equipe Incentivar agradece a sua coloboração
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const  ModalPickerDep = ({fechar,setData, dados}) =>{
    const onPressItem = (itemEmp, itemId) => {
        setData(itemEmp, itemId);
        fechar();
      };
  
    const options = dados;

    const option = options.map((item,index) => {
        return (
            <TouchableOpacity
              style={styles.modalPickerButton}
              key={index}
              onPress={() => onPressItem(item.empresas, item.codigoEmpresa)}
            >
                <Text style={styles.modalPickerText}>
                  {item.empresas}
                </Text>
            </TouchableOpacity>
        )
    })
    return (
      <View style={styles.containerPickerDep}>
        <View style={styles.modalPickerDep}>
          <ScrollView>
              {option}
          </ScrollView>
        </View>
      </View>
    );
  }
  
  const  ModalPickerPrio = ({fechar,setData}) =>{
    const onPressItem = (item) => {

        setData(item);
        fechar();
      };
  
    const options = [
        "Baixa","Média","Alta"

    ]
    const option = options.map((item,index) => {
        return (
            <TouchableOpacity
              style={styles.modalPickerButton}
              key={index}
              onPress={() => onPressItem(item)}
            >
                <Text style={styles.modalPickerText}>
                  {item}
                </Text>
            </TouchableOpacity>
        )
    })
    return (
      <View style={styles.containerPickerDep}>
        <View style={styles.modalPickerDep}>
          <ScrollView>
              {option}
          </ScrollView>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    padding: 6,
    borderRadius: 10,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 20,
  },
  texto: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
  },

  containerBotao: {
    width: "50%",
    height: 50,
    backgroundColor: "#23CF5C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
  textoBotao: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 22,
    color: "white",
  },
  //Confirmar agendamento
  containerAgen: {
    width: "100%",
    height: "100%",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalAgen: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "60%",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 10,
  },
  imgAgen: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 20,
  },
  textoAgen: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
  },
  texto1Agen: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  texto2Agen: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginLeft: 15,
    marginTop: 5,
    marginRight: 15,
  },
  containerBotaoAgen: {
    width: "50%",
    height: 50,
    backgroundColor: "#23CF5C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  textoBotaoAgen: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 22,
    color: "white",
  },
  btnAreaNaoConf:{ 
    display: "flex",
    flexDirection: "row" 
  },
  containerBotaoAgenSim: {
    width: "40%",
    backgroundColor: "#20CF5C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  containerBotaoAgenNao: {
    width: "40%",
    backgroundColor: "#E21B1B",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    marginRight: 20,
  },
  iconConf: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  //Modal imgCovid
  imgCovid: {
    margin: 20,
    width: 200,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  modalCovid: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "90%",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 10,
  },
  textoCovid1: {
    fontSize: 16,
    color: "black",
    textAlign: "justify",
    margin: 10,
  },
  textoCovid2: {
    fontSize: 14,
    marginRight:10,
    color: "black",
    textAlign: "justify",
  },
  liCovid: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  textoCovid3: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  iconCovid: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  scrollView:{ 
    paddingRight: 20
  },
  ViewAreaCovid:{
    width: "100%",
  },
  iconCovids:{ 
    marginRight: 5 
  },
  //Modal picker dep,
  containerPickerDep:{
    width: "100%",
    height: "100%",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalPickerDep:{

    height: "auto",
    width: "auto",
    width: "80%",
    maxHeight: "60%",
    backgroundColor: "white",
    padding: 6,
    borderRadius: 10,
  },
  modalPickerButton:{
      alignItems: "flex-start",
  },
  modalPickerText:{
    margin:20,
    fontSize:20,
  },
  textoPicker:{
    margin:20,
    fontSize:20,
    textAlign: "center",
    fontWeight: "bold"
  },
});

export {
  ModalAppConfirma,
  ModalAppErro,
  ModalAppConfirmaAgendamento,
  ModalAppNaoConfirmaAgendamento,
  ModalAppCovid,
  ModalPickerDep,
  ModalPickerPrio
};
