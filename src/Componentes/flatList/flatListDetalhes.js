import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

export default function FlatListItem({ item }) {
  let mensagem = replaceHtml(item.conteudo)

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

  return (
    <View style={styles.container}>
        <View style={styles.sombra}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text>De: {item.nome}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "right" }}>{item.data}</Text>
        </View>
      </View>
      <Text style={styles.msg}>Mensagem: {mensagem}</Text>
      {/* {console.log(item.conteudo)} */}
      <Text>Anexos:</Text>
      {item.arquivo?
        <Image
        style={styles.image}
        source={{
          uri: 'http://192.168.102.248:8091/scriptcase/app/sgn_lgpd/_lib/file/img/chamado/'+item.arquivo,
        }}
      />
      :
      <></>
      }
      
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 3,

},
sombra:{
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
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
    marginBottom: 10,
  },
  msg: {
    textAlign: "justify",
    marginTop: 5,
    marginBottom: 5,
  },
});
