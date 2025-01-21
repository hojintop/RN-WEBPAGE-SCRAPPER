import { View } from "react-native"
import Header from "../components/Header/Header"
import HeaderTitle from "../components/Header/HeaderTitle"
import HeaderGroup from "../components/Header/HeaderGroup"
import HeaderButton from "../components/Header/HeaderButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import WebView from "react-native-webview"

export default()=>{
    const navigation = useNavigation();
    const route = useRoute();

    function onPressBack(){
        navigation.goBack();
    }
    
    return(
        <View style={{flex: 1, }}>
            <Header>
                <HeaderGroup>
                    <HeaderButton iconName="arrow-back" onPress={onPressBack}></HeaderButton>
                    <HeaderTitle title="LINK DETAIL"></HeaderTitle>
                </HeaderGroup>
            </Header>

            <WebView
                style={{flex: 1,}}
                source={{uri: route.params.item.link}}
            />


        </View>
    )
}