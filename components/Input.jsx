import { TextInput, View,Text,StyleSheet } from "react-native"

const Input = ({name,value,err,onChange}) => {
  const handleChange = (content) => {
         onChange(
            prev => {
              return {
                ...prev,
                [name] : {
                  value : content,
                  errMsg : prev[name].errMsg
                }
              }
            }
         )
  };

  return (
     <View style={styles.inputControl}>
        <Text style={styles.inputLabel}>{name}</Text>
        <TextInput style={styles.input} value={value} name={name} onChangeText={handleChange}/>
        <Text style={styles.inputError}>{err}</Text>
     </View>
  )
}

export default Input

const styles = StyleSheet.create({
     inputControl : {
        width: 300,
        marginBottom: 24
     },

     inputLabel : {
       fontSize: 16,
       fontWeight: "bold"
     },

     input : {
       width: "100%",
       backgroundColor: "rgba(179,172,237,.35)",
       padding: 8,
       borderRadius: 4
     },

     inputError : {
        color: "red"
     }
})