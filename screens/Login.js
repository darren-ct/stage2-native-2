import { View,StyleSheet,Pressable,Text,Alert } from "react-native";
import { useState,useLayoutEffect,useContext,useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {API} from "../api"
import { AppContext } from "../App";
import Input from "../components/Input"


const Login = ({navigation}) => {
  const isFocused = useIsFocused();
  const {setToken,setUser} = useContext(AppContext);

    const[form,setForm] = useState({
        Email : {
             value : "",
             errMsg : ""
        },

        Password : {
             value : "",
             errMsg : ""
        }
   });

   const onSubmit = async() => {

    setForm(prev => {
    const newObj = {...prev};

    
    newObj.Email.errMsg = "";
    newObj.Password.errMsg = "";
    

    return newObj
  });

  // Filter
     // Email
    if(form.Email.value === ""){
      return setForm(prev => {return {...prev,Email:{value:prev.Email.value,errMsg:"Email can't be empty"}}})
   };

   if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.Email.value)) ){
      return setForm(prev => {return {...prev,Email:{value:prev.Email.value,errMsg:"Email format incorrect"}}})
   };

     //Password
   if(form.Password.value === ""){
    return setForm(prev => {return {...prev,Password:{value:prev.Password.value,errMsg:"Password can't be empty"}}})
   };

   if(form.Password.value.length < 8){
    return setForm(prev => {return {...prev,Password:{value:prev.Password.value,errMsg:"Password can't be less than 8 characters"}}})
   };

  // Submit

  try {
     

      const res = await API.post("/auth/login", {
           email : form.Email.value,
           password : form.Password.value
      });

      const data = res.data;

      const token = data.token;
      const id = data.userId;
     

      
       
       setUser(id)
       setToken(token);
       navigation.navigate("Home")
       
       } catch(err) {

        
        Alert.alert(
          "An error occured",
          "Make sure password match the registered email",
          [
            { text: "OK", onPress: () => {} }
          ]
        );

       }

  }

  useEffect(()=>{
    setForm({
      Email : {
           value : "",
           errMsg : ""
      },

      Password : {
           value : "",
           errMsg : ""
      }
 })
  },[isFocused])

  useLayoutEffect(()=>{
    navigation.setOptions({
        headerRight: () => <></>
    })
},[navigation])

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <Input name="Email" value={form.Email.value} err={form.Email.errMsg} onChange={setForm}/>
    <Input name="Password" value={form.Password.value} err={form.Password.errMsg} onChange={setForm}/>
    <Pressable onPress={onSubmit} style={styles.submitBtn}><Text style={styles.submitText}>Login</Text></Pressable>
    <Pressable style={styles.redirectBtn} onPress={()=>{navigation.navigate("Signup")}}><Text style={styles.redirectText}>Not yet have account? Click here</Text></Pressable>
</View>
  )
}

export default Login

const styles = StyleSheet.create({
    container : {
      alignItems: "center",
      justifyContent : "center"
     },
  
     title : {
      marginTop:24,
      marginBottom:24,
      fontSize: 32,
      fontWeight: "bold"
     },
  
     submitBtn : {
      backgroundColor:"#6C5CE7",
      width: 300,
      paddingVertical:8,
      borderRadius:8
   },

   submitText : {
     color: "white",
     textAlign:"center",
     fontSize:20
   },
  
   redirectBtn : {
    width:300,
    marginTop: 4
 },

 redirectText : {
    color: "#6C5CE7"
 },


  });