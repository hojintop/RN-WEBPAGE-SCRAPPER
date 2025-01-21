import { View } from "react-native"
import Header from "../components/Header/Header"
import HeaderTitle from "../components/Header/HeaderTitle"
import HeaderButton from "../components/Header/HeaderButton"
import { useNavigation } from "@react-navigation/native"
import SingleLineInput from "../components/SingleLineInput"
import { useState } from "react"
import Typography from "../components/Typography"
import Button from "../components/Button"
import Spacer from "../components/Spacer"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSetRecoilState } from "recoil"
import { atomLinkList } from "../states/atomLinkList"

export default()=>{
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const updateList = useSetRecoilState(atomLinkList);

    const [url, setUrl] = useState("");

    function onPressClose(){
        navigation.goBack();
    }

    function onPressSave(){
        if(url === '') return;

        updateList((prevState)=>{
            const list = [
                {
                    title: "",
                    image: "",
                    link: url,
                    createdAt: new Date().toISOString(),
                }
            ]

            return {
                list: list.concat(prevState.list)
            }
        })

        setUrl("");
    }

    return(
        <View style={{flex: 1,}}>
            <Header>
                <HeaderTitle title="ADD LINK"></HeaderTitle>
                <HeaderButton iconName="close" onPress={onPressClose}></HeaderButton>
            </Header>

            <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 15, }}>
                <SingleLineInput 
                    value={url}
                    onChangeText={setUrl}
                    placeholder="ex)https://example.com"
                />
            </View>

            <Button onPress={onPressSave}>
                <View style={{backgroundColor: url === "" ? "gray" : "black", paddingBottom: insets.bottom - 10,}}>
                    <View style={{height: 52,justifyContent: "center", alignItems: "center"}}>
                        <Typography color="white" fontSize={20}>저장하기</Typography>
                    </View>
                </View>
            </Button>
        </View>
    )
}