import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import Header from "../components/Header/Header";
import HeaderTitle from "../components/Header/HeaderTitle";
import HeaderButton from "../components/Header/HeaderButton";
import { useNavigation } from "@react-navigation/native";
import SingleLineInput from "../components/SingleLineInput";
import { useEffect, useState } from "react";
import Typography from "../components/Typography";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSetRecoilState } from "recoil";
import { atomLinkList } from "../states/atomLinkList";
import { getOpenGraphData } from "../utils/OpenGraphTagUtils";
import RemoteImage from "../components/RemoteImage";
import { getClipboardString } from "../utils/ClipboardUtils";
import Icons from "../components/Icons";

export default () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const updateList = useSetRecoilState(atomLinkList);

  const [url, setUrl] = useState("");
  const [metaData, setMetaData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { width } = useWindowDimensions();

  function onPressClose() {
    navigation.goBack();
  }

  function onPressSave() {
    if (url === "") return;

    updateList((prevState) => {
      const list = [
        {
          title: metaData.title,
          image: metaData.image,
          link: url,
          createdAt: new Date().toISOString(),
        },
      ];

      return {
        list: list.concat(prevState.list),
      };
    });

    setUrl("");
  }

  async function onSubmitEditing() {
    setIsLoaded(true);
    const result = await getOpenGraphData(url);

    setMetaData(result);
    setIsLoaded(false);
  }

  async function onGetClipboardString() {
    const result = await getClipboardString();

    if (
      result.toLowerCase().startsWith("http://") ||
      result.toLowerCase().startsWith("https://")
    ) {
      setUrl(result);
      const ogResult = await getOpenGraphData(result);

      setMetaData(ogResult);
    }
  }

  useEffect(() => {
    onGetClipboardString();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <HeaderTitle title="ADD LINK"></HeaderTitle>
        <HeaderButton iconName="close" onPress={onPressClose}></HeaderButton>
      </Header>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          paddingTop: 32,
          paddingHorizontal: 15,
        }}
      >
        <View>
          <SingleLineInput
            value={url}
            onChangeText={setUrl}
            placeholder="ex)https://example.com"
            onSubmitEditing={onSubmitEditing}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              borderWidth: 1,
            }}
          >
            <Button
              onPress={() => {
                setUrl("");
                setMetaData(null);
              }}
            >
              <Icons name="close" size={20}></Icons>
            </Button>
          </View>
        </View>

        {isLoaded && (
          <>
            <Spacer space={15} />
            <View
              style={{ borderWidth: 1, borderRadius: 4, borderColor: "gray" }}
            >
              <Spacer space={(width - 30) * 0.5} />
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            </View>
          </>
        )}
        {metaData !== null && (
          <>
            <Spacer space={15} />
            <View
              style={{ borderWidth: 1, borderRadius: 4, borderColor: "gray" }}
            >
              <RemoteImage
                url={metaData.image}
                width={width - 30}
                height={(width - 30) * 0.5}
              ></RemoteImage>
              <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
                <Spacer space={10} />
                <Typography fontSize={20} color="black">
                  {metaData.title}
                </Typography>
                <Spacer space={5} />
                <Typography fontSize={18} color="gray">
                  {metaData.description}
                </Typography>
              </View>
            </View>
          </>
        )}
      </View>

      <Button onPress={onPressSave}>
        <View
          style={{
            backgroundColor: url === "" ? "gray" : "black",
            paddingBottom: insets.bottom - 10,
          }}
        >
          <View
            style={{
              height: 52,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="white" fontSize={20}>
              저장하기
            </Typography>
          </View>
        </View>
      </Button>
    </View>
  );
};
