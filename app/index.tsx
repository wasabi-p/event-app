import { Redirect,router } from "expo-router";
import supabase from "./lib/supabase";
import {useEffect, useState} from "react"
import {Session} from "@supabase/supabase-js"

export default function Homepage(){
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
          if (session) {
            router.replace("/(tabs)/home");
          } else {
            console.log("no user");
          }
        });
    
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
          if (session) {
            router.replace("/(tabs)/home");
          } else {
            console.log("no user");
            router.replace("/(tabs)/account/signin");
          }
        });
      }, []);

    return <Redirect href={"/(tabs)/home"}/>
}
