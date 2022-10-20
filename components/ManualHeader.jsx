import {useMoralis} from "react-moralis"
import {useEffect} from "react"

export default   function ManualHeader(){

    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis() //hooks
        //some button that connects us and changes connected to be true

    // to connect to wallet to only when connect button is pressed
    useEffect(()=>{
        if(isWeb3Enabled) return
        if(typeof window !== "undefined"){
          if(window.localStorage.getItem("connected")){
            enableWeb3()
          }
        }
    }, [isWeb3Enabled])
    //second argument is dependency array
    //automatically run and load
    //then i'll run  checking the value
    //no dependecy array : run anytime something re-renders
    //CAREFUL with this , because then you get circular renders
    //blank dependency array , run once onload

    //to disconnect or change the account
    useEffect(()=>{
       Moralis.onAccountChanged((account)=>{
        console.log(`Account changed to ${account}`)
        if(account == null){
            window.localStorage.removeItem("connected")
            deactivateWeb3()
            console.log("No accounts found")
        }
       })
    },[])

    return(
        <div>
            {account ?
             (<div>Connected to {account.slice(0,6)}...{account.slice(account.length - 4)}</div>)
              : ( <button onClick={async ()=>{
                    await enableWeb3()
                    if( typeof window !== "undefined"){
                      window.localStorage.setItem("connected", "injeted")
                    }
                }}
                disabled={isWeb3EnableLoading} //disabling button when metamask is popped after "connect" is pressed and 
                >
                Connect
                </button> )}
            
        </div>
    )
}