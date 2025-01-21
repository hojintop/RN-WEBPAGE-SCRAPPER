import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil";
import { atomLinkList } from "../states/atomLinkList";
import { getItem } from "../utils/AsyncStorageUtils";

export default(props)=>{
    const [isLoaded, setIsLoaded] = useState(false);
    const setList = useSetRecoilState(atomLinkList);

    async function loadData(){
        const data = await getItem("MAIN/LINK_LIST");

        if(data !== null){
            setList(JSON.parse(data));
        }

        setIsLoaded(true);
        console.log("persist");
    }

    useEffect(()=>{
        if(isLoaded) return;

        loadData();
    },[])
    return(
        <>
        {isLoaded && props.children}
        </>
    )
}