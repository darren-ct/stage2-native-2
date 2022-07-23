import { View,StyleSheet,Pressable,Text,TextInput } from "react-native";
import { useState,useContext } from "react";
import {API} from "../api"
import Input from "../components/Input"

import { AppContext } from "../App";

const AddTodo = ({navigation}) => {
  const {token,userId} = useContext(AppContext);
  const[form,setForm] = useState({
       Title : {
            value : "",
            errMsg : ""
       },

       Description : {
            value : "",
            errMsg : ""
       }
  });

  const onSubmit = async() => {
     setForm(prev => {
          const newObj = {...prev};
    
          newObj.Title.errMsg = "";
          newObj.Description.errMsg = "";
    
          return newObj
        });

        
       if(form.Title.value === ""){
          return setForm(prev => {return {...prev,Title:{value:prev.Title.value,errMsg:"Title can't be empty"}}})
       };

       if(form.Description.value === ""){
          return setForm(prev => {return {...prev,Description:{value:prev.Description.value,errMsg:"Description can't be empty"}}})
       };

       try {
             await API.post("/mytodo",{
                title : form.Title.value,
                desc : form.Description.value,
                isDone : "false",
                author_id : userId,
             },{
               headers: {'Authorization':`Bearer ${token}`}
               });

             navigation.navigate("Home")

       } catch(err) {
             console.log(err)
       }

  }

  return (
    <View style={styles.container}>
         <Text style={styles.title}>Add New Todo</Text>
         <Input name="Title" value={form.Title.value} err={form.Title.errMsg} onChange={setForm}/>
         <Input name="Description" value={form.Description.value} err={form.Title.errMsg} onChange={setForm}/>
         <Pressable onPress={onSubmit} style={styles.submitBtn}><Text style={styles.submitText}>Add Todo</Text></Pressable>
    </View>
  )
}

export default AddTodo;


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
   }
});