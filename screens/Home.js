import {View,StyleSheet,Text,FlatList,Modal,TextInput, Pressable} from "react-native"
import { useState,useLayoutEffect,useEffect,useContext } from "react"
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from "../App";
import Todo from "../components/Todo"
import {API} from "../api";
// import { KontenbaseClient } from "@kontenbase/sdk";


const Home = ({navigation}) => {
  // const kontenbase = new KontenbaseClient({ apiKey: '1cd2efe7-a7ea-443c-9362-9e225e0f12e9' });
  const isFocused = useIsFocused();
  const {token,userId} = useContext(AppContext);

  // State
  const[todos,setTodos] = useState([])
  const[search,setSearch] = useState("")

  const[id,setId] = useState(null)
  const[modalVisible,setIsModalVisible] = useState(false)

 

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerLeft : () => <></>
   })
 },[navigation])

  // useEffect
  useEffect(()=>{
    getTodos();
  },[search,isFocused])

  // Function
  const getTodos = async() =>{
 
        try {

          const res = await API.get("/mytodo",{
            headers: {'Authorization':`Bearer ${token}`}
            });
          
          const data = res.data;
          const newData = data.filter(item => {
            return item.title.toLowerCase().trim().startsWith(search.toLowerCase()) === true
          });
          const filteredData = newData.filter(item => item.author_id === userId)

          setTodos(filteredData)
          
        } catch(err) {

          console.log(err)
        }
  };
  const deleteTodo = async(id) => {
    try {

      console.log(id)
      await API.delete(`/mytodo/${id}`,{
        headers: {'Authorization':`Bearer ${token}`}
        });
      getTodos();
    } catch(err) {

      console.log(err)
    }
  };

  return (
    <View style={styles.container}>
         
         <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
          setIsModalVisible(false);
        }}>
              <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle} >Are you sure you want to delete?</Text>
                  <View style={styles.modalGroup}>
                       <Pressable onPress={()=>{setIsModalVisible(false);deleteTodo(id)}} style={styles.deleteBtn}>
                           <Text style={styles.deleteText}>Yes</Text>
                       </Pressable>
                       <Pressable onPress={()=>{setIsModalVisible(false)}} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Cancel</Text>
                       </Pressable>
                  </View>
              </View>
         </Modal>

         <Text style={styles.title}>My Todo</Text>

         <View style={{flexDirection:"row",alignItems:"flex-start"}}>
                 <TextInput style={styles.input} value={search} onChangeText={(content)=>{setSearch(content)}}/>
                 <Pressable style={{backgroundColor:"#6C5CE7",paddingHorizontal:12,paddingVertical:8,borderRadius:4}} onPress={()=>{navigation.navigate("Add Todo")}}>
                     <Text style={{fontSize:24,color:"white"}}>+</Text>
                 </Pressable>
         </View>
        

         {
          todos.length === 0 ? 
             <Text style={{color:"black"}}>No todo yet..</Text>    :   <FlatList data={todos} style={{height:380}}
             keyExtractor={(item)=> item._id} 
             renderItem={(itemData)=> <Todo item={itemData.item} navigation={navigation} showModal={setIsModalVisible} setId={setId}/>}/>
         }
         
            

    </View>
  )
}

export default Home

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

     input : {
        width: 240,
        height: 48,
        borderColor:"#6C5CE7",
        borderRadius:4,
        borderWidth : 1,
        padding:16,
        marginBottom:32
     },

     modalContainer : {
         backgroundColor: "rgb(108,92,231)",
         height: "100%",
         marginTop: 80,
         padding: 32,
         alignItems:"center"
         
     },

     modalTitle : {
         fontSize: 24,
         fontWeight:"bold",
         textAlign: "center",
         marginBottom: 32
     },

     modalGroup : {
         flexDirection:"row",
         alignItems:"center"

     },

     cancelBtn : {
       backgroundColor:"white",
       paddingVertical: 8,
       paddingHorizontal: 24,
       marginLeft:8,
       borderRadius:8
     },

     cancelText : {
        fontSize: 20,
        color:"rgb(108,92,231)",
        textAlign:"center",
        fontWeight:"bold"
     },

     deleteBtn : {
        backgroundColor:"red",
        paddingVertical: 8,
        paddingHorizontal: 24,
        width: 104,
        borderRadius:8
     }, 

     deleteText : {
      fontSize: 20,
      color: "white",
      textAlign:"center",
      fontWeight:"bold"
     }


})