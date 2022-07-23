import { useContext } from "react";
import { Pressable,Text,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API } from "../api";
import { AppContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = () => {

    const navigation = useNavigation();
    const {token,setToken,setUser} = useContext(AppContext)

    const Logout = async() => {
        try {
            await AsyncStorage.removeItem('token')
            setToken(null)
            setUser(null)
            navigation.navigate("Signup")
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <Pressable style={styles.buttonBody} onPress={Logout}>
        <Text style={styles.buttonText}>Logout</Text>
    </Pressable>
  )
}

export default Logout

const styles = StyleSheet.create(
    {
        buttonText : {
            color: "white"
        },
        buttonBody : {
            backgroundColor: "red",
            padding: 8,
            borderRadius: 4
        }
    }
)