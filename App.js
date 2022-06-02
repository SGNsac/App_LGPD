import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/Componentes/Login";
import PreLogin from "./src/Componentes/PreLogin";
import RecuperarSenha from "./src/Componentes/RecuperarSenha";
import Home from "./src/Componentes/Home";
import { AuthContext } from "./src/Componentes/context/ContextApi";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [idUser, setIdUser] = useState("")
  const [codPessoa, setCodPessoa] = useState("")
  const [idEmpresa, setIdEmpresa] = useState("")

  return (
<AuthContext.Provider value={{idUser, setIdUser, codPessoa, setCodPessoa, idEmpresa, setIdEmpresa}}>
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="PreLogin"
              component={PreLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecuperarSenha"
              component={RecuperarSenha}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
    </NavigationContainer>
</AuthContext.Provider>
  );
}
