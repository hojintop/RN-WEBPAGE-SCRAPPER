import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinkStackNavigation from "./LinkStackNavigation";
import AddLinkScreen from "../screens/AddLinkScreen";

const Stack = createNativeStackNavigator();

export default()=>{
    return(
        <Stack.Navigator screenOptions={{
            presentation: "containedModal",
            headerShown: false,
        }}>
            <Stack.Screen name="ListStack" component={LinkStackNavigation} />
            <Stack.Screen name="AddLink" component={AddLinkScreen} />
        </Stack.Navigator>
    )
}