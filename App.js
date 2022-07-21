import Details from "./screens/Details";
import Home from "./screens/Home";
import AddProject from "./screens/AddProject";
import EditProject from "./screens/EditProject";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName='Home' screenOptions={{headerStyle:{backgroundColor:"#6C5CE7"}, headerTintColor: "white"}}>
               <Stack.Screen name="Home" component={Home} />
               <Stack.Screen name="Details" component={Details} />
               <Stack.Screen name="Add Project" component={AddProject} />
               <Stack.Screen name="Edit Project" component={EditProject} />
         </Stack.Navigator>
    </NavigationContainer>
  );
}

