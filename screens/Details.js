import { useEffect,useState,useContext } from 'react';
import { View,Text,StyleSheet} from 'react-native'
import { API } from '../api';

import { AppContext } from '../App';

const Details = ({route}) => {
  const {token} = useContext(AppContext);
  const id = route.params.id;
  const [detail,setDetail] = useState({
    title : "Mandi",
    desc : "Mandi dulu cuyyyyy. Pakai Sabun ya jangan air saja nanti bau",
    createdAt : "12 Agustus 2022"
  })
  
  useEffect(()=>{
        getTodo()
  },[]);

  const getTodo = async() => {
    try {
           const res = await API.get(`/mytodo/${id}`,{
            headers: {'Authorization':`Bearer ${token}`}
            });
           const data = res.data;
           setDetail(data);

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <View style={styles.container}>
         <Text style={styles.title}>{detail.title}</Text> 
         <Text style={styles.time}>{"Created at: " + detail.createdAt}</Text>
         <Text style={styles.desc}>{detail.desc}</Text> 
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  container : {
    alignItems: "center",
    justifyContent : "center",
    paddingHorizontal: 24
   },
   title : {
     marginTop: 32,
     marginBottom: 48,
     fontSize:24,
     fontWeight: "bold"
   },
   time : {
      color: "#6C5CE7",
      fontSize : 12 ,
      textAlign: "left",
      width: "100%",
      fontWeight: "bold"
   },
   desc : {
      fontSize:16,
      textAlign: "left",
      width: "100%",
    
   }

});