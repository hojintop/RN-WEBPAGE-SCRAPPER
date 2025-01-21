import { FlatList, useWindowDimensions, View } from "react-native";
import Header from "../components/Header/Header";
import HeaderTitle from "../components/Header/HeaderTitle";
import HeaderGroup from "../components/Header/HeaderGroup";
import Button from "../components/Button";
import Typography from "../components/Typography";
import Spacer from "../components/Spacer";
import { useNavigation } from "@react-navigation/native";
import Icons from "../components/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { atomLinkList } from "../states/atomLinkList";


export default () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const data = useRecoilValue(atomLinkList);

  console.log(typeof data);
  function onPressAdd() {
    navigation.navigate("AddLink");
  }

  function onPressDetail(item){
    navigation.navigate("LinkDetail", {item});
  }

  function renderItem({item}){
    return(
        <Button onPress={()=>onPressDetail(item)} paddingHorizontal={24} paddingVertical={13}>
            <Typography fontSize={20} color="black">{item.link}</Typography>
            <Spacer space={4}></Spacer>
            <Typography fontSize={20} color="black">
                {item.title !== "" ? `${item.title.slice(0,20)} | ` : ""} {new Date(item.createdAt).toLocaleString()}
            </Typography>
        </Button>

    )
  }
  
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <HeaderGroup>
          <HeaderTitle title="LINK LIST"></HeaderTitle>
        </HeaderGroup>
      </Header>

      <FlatList
        style={{flex: 1,}}
        data={data.list}
        renderItem={renderItem}
      />
      
        <View
          style={{
            position: "absolute",
            right: 30,
            bottom: 24 + insets.bottom,
          }}
        >
          <Button onPress={onPressAdd}>
            <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Icons name="add-outline" size={24} color="white"></Icons>
            </View>
          </Button>
        </View>
      
    </View>
  );
};
