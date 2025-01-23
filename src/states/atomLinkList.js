import { atom } from "recoil";
import { getItem, removeItem, setItem } from "../utils/AsyncStorageUtils";

// atom Effect 작성
// AsyncStorage 에 저장 / 조회 / 삭제 등 Effect 감지
// const asyncStorageEffect = key => async ({setSelf, onSet})=>{
    
//     const savedValue = await getItem(key);

//     if(savedValue !== null){
//         console.log("effect");
//         setSelf(JSON.parse(savedValue))
//     }

//     onSet((newVlaue, _, isReset)=>{
//         isReset ? removeItem(key) : setItem(key, JSON.stringify(newVlaue));
//     })

// }


function asyncStorageEffect(key) {
    return function({ setSelf, onSet }) {

      // 상태가 설정되기 전에 저장된 값이 있는지 확인
      async function loadFromStorage() {
        try {
          const savedValue = await getItem(key); // key에 해당하는 값을 비동기적으로 불러오기
          if (savedValue !== null) {
            // console.log("Loaded from asyncStorage:", savedValue);
            setSelf(JSON.parse(savedValue)); // 로컬 저장소에서 값이 있으면, atom에 설정
          }
        } catch (error) {
          console.error("Failed to load from asyncStorage", error);
        }
      }
  
      loadFromStorage(); // 비동기 호출
  
      // onSet 함수에서 상태 변경 시, 로컬 저장소와 동기화
      onSet(function (newValue, _, isReset) {
        if (isReset) {
          removeItem(key); // 초기화일 경우 로컬 저장소에서 삭제
        } else {
          setItem(key, JSON.stringify(newValue)); // 값이 변경되었을 때 로컬 저장소에 저장
        }
      });
    };
  }


export const atomLinkList = atom({
    key: "MAIN/LINK_LIST",
    default:{
        list:[],
    },
    effects:[asyncStorageEffect("MAIN/LINK_LIST")]
})