import {  View,Text,StyleSheet,Pressable,Image} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { API } from "../api";
import { AppContext } from "../App";
import { useContext } from "react";


const Todo = ({item,navigation,showModal,setId}) => {
   const {token} = useContext(AppContext);

   const onCheck = async(isChecked,id) => {
         try {
            await API.patch(`/mytodo/${id}`,{
               isDone : `${isChecked}`,
            },{
              headers: {'Authorization':`Bearer ${token}`}
              });
         } catch(err) {
             console.log(err)
         }
   };

   const isitCheck = item.isDone === "false" ? false : true;

  return (
      <Pressable style={styles.todoContainer} onPress={()=>{navigation.navigate("Details",{id:item._id})}}>
         <View style={{flexDirection:"row"}}>
            <BouncyCheckbox  isChecked={isitCheck} size={25} fillColor="#6C5CE7"  unfillColor="#6C5CE7" text="" iconStyle={{ borderColor: "#FFFFFF" }} onPress={(isChecked) => {onCheck(isChecked,item._id)}} />
            <Text style={styles.todoTitle}>{item.title.slice(0,6) + ".."}</Text>
         </View>

         <View style={{flexDirection:"row"}}>
            <Pressable style={styles.editBtn} onPress={()=>{navigation.navigate("Edit Todo",{id:item._id})}}>  
                      <Text style={styles.editText}> Edit </Text>
            </Pressable>
            <Pressable style={styles.deleteBtn} onPress={()=>{setId(item._id);showModal(true)}}> 
                      <Text style={styles.deleteText}> X </Text>
            </Pressable>
         </View>
            
      </Pressable>
  )
}

export default Todo

const styles = StyleSheet.create({
    todoContainer : {
         flexDirection:"row",
         backgroundColor: "#6C5CE7",
         padding: 16,
         width:300,
         height: 64,
         alignItems: "center",
         justifyContent: "space-between",
         alignItems:"center",
         borderRadius: 8,
         marginBottom:12
    },
    todoTitle : {
         fontWeight:"bold",
         fontSize: 18,
         color:"white",
         marginRight: 72
    },
    deleteBtn : {
       backgroundColor: "red",
       borderRadius: 4,
       padding: 8,
       alignItems:"center",
       justifyContent:"center",
    },
    editBtn : {
       backgroundColor: "white",
       borderRadius: 4,
       padding: 8,
       alignItems:"center",
       justifyContent:"center",
       marginRight: 8
    },
    deleteText : {
      color:"white",
      fontSize:16,
      fontWeight:"bold"
    },
    editText : {
       color:"#6C5CE7",
       fontWeight:"bold"
    }
})