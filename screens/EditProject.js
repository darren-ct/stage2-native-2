import { View,StyleSheet,Pressable,Text } from "react-native";
import { useState,useEffect } from "react";
import {API} from "../api"
import Input from "../components/Input"
import { v4 as uuidv4 } from 'uuid';


const EditProject = ({navigation,route}) => {
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
  const id = route.params.id;

  useEffect(()=>{
     getInputs()
  },[])

  const getInputs = async() => {
         
        try {

          const res = await API.get(`/todo/${id}`);
          const data = res.data;
          setForm({
            Title : {
              value : data.title,
              errMsg : ""
         },
  
         Description : {
              value : data.desc,
              errMsg : ""
         }
          })
          
        } catch(err) {

          console.log(err)
        }
  };

  const onSubmit = () => {
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
          return setForm(prev => {return {...prev,Title:{value:prev.Description.value,errMsg:"Description can't be empty"}}})
       };

       try {
             await API.put(`/user/${id}`,{
                title : form.Title.value,
                desc : form.Description.value
             });

             navigation.navigate("Home")

       } catch(err) {
             console.log(err)
       }

  }



  return (
    <View style={styles.container}>
         <Text style={styles.title}>Add New Project</Text>
         <Input name="Title" value={form.Title.value} err={form.Title.errMsg} onChange={setForm}/>
         <Input name="Description" value={form.Description.value} err={form.Title.errMsg} onChange={setForm}/>
         <Pressable onPress={onSubmit} style={styles.submitBtn}><Text style={styles.submitText}>Add Todo</Text></Pressable>
    </View>
  )
}

export default EditProject;


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