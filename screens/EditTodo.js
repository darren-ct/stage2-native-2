import { View,StyleSheet,Pressable,Text } from "react-native";
import { useState,useEffect,useContext } from "react";
import {API} from "../api"
import Input from "../components/Input"
import { AppContext } from "../App";


const EditTodo = ({navigation,route}) => {
  const {token} = useContext(AppContext);
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

          const res = await API.get(`/mytodo/${id}`,{
            headers: {'Authorization':`Bearer ${token}`}
            });
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
             await API.patch(`/mytodo/${id}`,{
                title : form.Title.value,
                desc : form.Description.value
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
         <Text style={styles.title}>Edit Todo</Text>
         <Input name="Title" value={form.Title.value} err={form.Title.errMsg} onChange={setForm}/>
         <Input name="Description" value={form.Description.value} err={form.Title.errMsg} onChange={setForm}/>
         <Pressable onPress={onSubmit} style={styles.submitBtn}><Text style={styles.submitText}>Edit Todo</Text></Pressable>
    </View>
  )
}

export default EditTodo;


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