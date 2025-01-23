import { FlatList, SectionList, useWindowDimensions, View } from "react-native";
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
import { useEffect, useState } from "react";


export default () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const data = useRecoilValue(atomLinkList);

  // sections 상태를 useState로 관리
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // getSections 함수를 호출하여 sections 업데이트
    const getSections = (data) => {
      const sectionData = data.list.map(item => ({
        date: new Date(item.createdAt).toLocaleDateString(),
        data: [item],  // SectionList는 'data'가 배열이어야 하므로 배열로 감싸줍니다.
      }));
      setSections(sectionData);
    };

    // data가 변경될 때마다 sections를 업데이트
    getSections(data);
  }, [data.list]);

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
            <Typography fontSize={20} color="gray">
                {item.title !== "" ? `${item.title.slice(0,20)} | ` : ""} {new Date(item.createdAt).toLocaleString()}
            </Typography>
        </Button>

    )
  }
  
  function renderSectionHeader({section}){
    return(

        <View style={{backgroundColor: "lightgray"}}>
            <Typography fontSize={15}>{section.date}</Typography>
        </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <HeaderGroup>
          <HeaderTitle title="LINK LIST"></HeaderTitle>
        </HeaderGroup>
      </Header>

      <SectionList 
        style={{flex: 1, }}
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />

      

      {/* <FlatList
        style={{flex: 1,}}
        data={data.list}
        renderItem={renderItem}
      /> */}
      
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
