import { getStringAsync } from "expo-clipboard";

export function getClipboardString(){
    return getStringAsync();
}