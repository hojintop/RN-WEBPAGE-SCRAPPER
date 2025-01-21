import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './src/navigations/RootNavigation';
import { RecoilRoot } from 'recoil';
import RecoilCustomPersist from './src/components/RecoilCustomPersist';

export default function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        {/* 이미 recoilEffect 에서 getItem 함수로 값을 받아옮으로 굳이 필요없지 않은가? 방식의 차이인가..*/}
        {/* <RecoilCustomPersist> */}
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        {/* </RecoilCustomPersist> */}

      </RecoilRoot>
    </SafeAreaProvider>
  );
}