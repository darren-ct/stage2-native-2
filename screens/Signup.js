import { View,StyleSheet,Pressable,Text,Alert } from "react-native";
import { useState,useEffect,useLayoutEffect,useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import {API} from "../api"
import { AppContext } from "../App";
import Input from "../components/Input"



const Signup = ({navigation}) => {
   const {setToken,token,setUser} = useContext(AppContext);
   const isFocused = useIsFocused();

    const[form,setForm] = useState({
        Firstname : {
             value : "",
             errMsg : ""
        },

        Lastname : {
            value : "",
            errMsg: ""
        },
 
        Email : {
             value : "",
             errMsg : ""
        },

        Password : {
             value : "",
             errMsg : ""
        },

        Reenter : {
            value : "",
            errMsg: ""
        }
   });

   useLayoutEffect(()=>{
     if(token){
      navigation.navigate("Home")
     }
   },[isFocused,token])

   useLayoutEffect(()=>{
      navigation.setOptions({
         headerRight: () => <></>
     })
   },[navigation])

   useEffect(()=>{
      setForm({
         Firstname : {
              value : "",
              errMsg : ""
         },
 
         Lastname : {
             value : "",
             errMsg: ""
         },
  
         Email : {
              value : "",
              errMsg : ""
         },
 
         Password : {
              value : "",
              errMsg : ""
         },
 
         Reenter : {
             value : "",
             errMsg: ""
         }
    })
   },[isFocused])

   const onSubmit = async() => {
    setForm(prev => {
      const newObj = {...prev};

      newObj.Firstname.errMsg = "";
      newObj.Lastname.errMsg = "";
      newObj.Email.errMsg = "";
      newObj.Password.errMsg = "";
      newObj.Reenter.errMsg = "";

      return newObj
    });

   //  Filter
      // username
   if(form.Firstname.value === ""){
      return setForm(prev => {return {...prev,Firstname:{value:prev.Firstname.value,errMsg:"First name can't be empty"}}})
   };

   if(form.Firstname.value.length < 4){
      return setForm(prev => {return {...prev,Firstname:{value:prev.Firstname.value,errMsg:"First name can't be less than 4 characters"}}})
   };

   if(form.Lastname.value === ""){
      return setForm(prev => {return {...prev,Lastname:{value:prev.Lastname.value,errMsg:"Last name can't be empty"}}})
   };

   if(form.Lastname.value.length < 4){
      return setForm(prev => {return {...prev,Lastname:{value:prev.Lastname.value,errMsg:"Last name can't be less than 4 characters"}}})
   };


     // email
   if(form.Email.value === ""){
      return setForm(prev => {return {...prev,Email:{value:prev.Email.value,errMsg:"Email can't be empty"}}})
   };

   if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.Email.value)) ){
      return setForm(prev => {return {...prev,Email:{value:prev.Email.value,errMsg:"Email format incorrect"}}})
   };

     // password
   if(form.Password.value === ""){
    return setForm(prev => {return {...prev,Password:{value:prev.Password.value,errMsg:"Password can't be empty"}}})
   };

   if(form.Password.value.length < 8){
      return setForm(prev => {return {...prev,Password:{value:prev.Password.value,errMsg:"Password can't be less than 8 characters"}}})
   };

   if(form.Reenter.value === ""){
    return setForm(prev => {return {...prev,Reenter:{value:prev.Reenter.value,errMsg:"Reenter input can't be empty"}}})
   };

   if(form.Reenter.value.length < 8){
      return setForm(prev => {return {...prev,Reenter:{value:prev.Reenter.value,errMsg:"Reenter can't be less than 8 characters"}}})
     };

   if(form.Reenter.value !== form.Password.value){
    return setForm(prev => {return {...prev,Reenter:{value:prev.Reenter.value,errMsg:"Reenter must be the same with password"},Password:{value:prev.Password.value,errMsg:"Password must be the same with reenter"}}});
   }

   // Submit
   try {
      const res = await API.post("/auth/register", {
          firstName: form.Firstname.value,
          lastName: form.Lastname.value,
          email: form.Email.value,
          password: form.Password.value
      })

      const data = res.data;
      

      const token = data.token;
      const id = data.userId;
      
       setToken(token);
       setUser(id)

       navigation.navigate("Home")

   } catch(err) {
      Alert.alert(
         "An error occured",
         "Email might be already registered",
         [
           { text: "OK", onPress: () => {} }
         ]
       );
   }



   }

  return (
<View style={styles.container}>
    <Text style={styles.title}>Register</Text>
    <Input name="Firstname" value={form.Firstname.value} err={form.Firstname.errMsg} onChange={setForm}/>
    <Input name="Lastname" value={form.Lastname.value} err={form.Lastname.errMsg} onChange={setForm}/>
    <Input name="Email" value={form.Email.value} err={form.Email.errMsg} onChange={setForm}/>
    <Input name="Password" value={form.Password.value} err={form.Password.errMsg} onChange={setForm}/>
    <Input name="Reenter" value={form.Reenter.value} err={form.Reenter.errMsg} onChange={setForm}/>
    <Pressable onPress={onSubmit} style={styles.submitBtn}><Text style={styles.submitText}>Register Account</Text></Pressable>
    <Pressable style={styles.redirectBtn} onPress={()=>{navigation.navigate("Login")}}><Text style={styles.redirectText} >Already have an account? Login here</Text></Pressable>
</View>
  )
}

export default Signup

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