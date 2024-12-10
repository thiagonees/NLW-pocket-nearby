import { View, Text } from "react-native"
import React from 'react'
import  Welcome  from "@/components/welcome"
import { Steps } from "@/components/steps"

export default function Index() {
  return (
    <View style={{
      flex: 1, padding: 40, gap: 40
      // justifyContent: 'center',
      // alignItems: 'center'
    }}>

      <Welcome />
      <Steps />
    </View>
  )
}