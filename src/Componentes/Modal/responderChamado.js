import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
export default function respChamado({ funcao }) {
  const controller = () => {
    funcao();
  };

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

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
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={controller} style={styles.icons}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.textAreaHeader}>
            <Text style={styles.textoHeader}>Status:Em andamento</Text>
            <Text style={styles.textoHeader}>Departamento: Psicologia</Text>
            <Text style={styles.textoHeader}>
              Assunto: Comportamento incomum
            </Text>
          </View>
          <View style={styles.contentHeader}>
            <Text style={styles.textoContent1}>Ticket :</Text>
            <Text style={styles.textoContent2}>10545F215B</Text>
            <Text style={styles.textoContent1}>Prioridade :</Text>
            <Text style={styles.textoContent2}>
              <FontAwesome name="circle" size={24} color="#E8C548" />
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
          <View style={styles.viewBtnAnexo}>
            <TouchableOpacity style={styles.areaBtnAnexo} onPress={pickImage}>
              <Text style={styles.textoBtnAnexo}>Adicionar</Text>
              <Ionicons
                style={styles.imgAnexo}
                name="attach"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {image && (
            <View style={styles.imgView}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.btnImg}
              >
                <Image
                  source={{ uri: image }}
                  style={styles.imgArea}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.viewBtnRegistrar}>
          <TouchableOpacity style={styles.areaBtnRegistrar}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 0,
    flex: 1,
    height: "100%",
  },
  icons: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 100000,
  },
  header: {
    backgroundColor: "#FFF",
    padding: 10,
    // marginTop: 20,
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
  },
  textoHeader: {
    fontSize: 15,
    marginRight: 2,
    marginTop: 5,
  },
  textAreaHeader: {
    flex: 2,
  },
  textoContent1: {
    textAlign: "center",
    color: "#12121299",
    marginTop: 2,
  },
  textoContent2: {
    textAlign: "center",
    marginTop: 2,
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
  btnImg:{
    width: "100%", 
    height: 300, 
    padding: 10
  },
  imgView:{
    alignItems: "center",
    justifyContent: "center"
  },
  imgArea:{
    width: "100%",
    height: "100%"
  }
});
