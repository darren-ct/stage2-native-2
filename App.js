import { useState,useEffect,createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { KontenbaseClient } from "@kontenbase/sdk";

import Details from "./screens/Details";
import Home from "./screens/Home";
import AddTodo from "./screens/AddTodo";
import EditTodo from "./screens/EditTodo";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Logout from "./components/Logout";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable , Text} from "react-native";


const Stack = createNativeStackNavigator();
export const AppContext = createContext(null);


export default function App() {

  const[token,setToken] = useState(null);
  const[userId,setUser] = useState(null);

  useEffect(()=>{
       getToken()
  },[])

  useEffect(()=>{
       if(token){
            // update token in async storage
            updateToken()
       }
  },[token])

  const getToken = async() => {
       try {
        const asynctoken = await AsyncStorage.getItem('token');

        if(!asynctoken){
          return;
        } else {
           setToken(asynctoken)
        };

       } catch(err) {
           console.log(err)
       }
  };

  const updateToken = async() => {
        try {
          const asynctoken = await AsyncStorage.getItem('token');

          if(asynctoken === token){
            return;
          }  else {
            await AsyncStorage.setItem("token",token);
            getToken()
          };

        } catch(err) {
           console.log(err)
        }
  };

 

  return (
    <AppContext.Provider value={{token,setToken,userId,setUser}}>

    <NavigationContainer>
         <Stack.Navigator initialRouteName={"Signup"} screenOptions={{
          headerStyle:{backgroundColor:"#6C5CE7"}, 
          headerTintColor: "white",
          headerRight: () => {return <Logout />}}}>
            
               <Stack.Screen name="Signup" component={Signup} />
               <Stack.Screen name="Login" component={Login} />
               <Stack.Screen name="Home" component={Home} />
               <Stack.Screen name="Details" component={Details} />
               <Stack.Screen name="Add Todo" component={AddTodo} />
               <Stack.Screen name="Edit Todo" component={EditTodo} />
               
         </Stack.Navigator>
    </NavigationContainer>

    </AppContext.Provider>
  );
}

