import { Text, View } from "react-native"

import { s } from "./styles"
import { colors } from "@/styles/colors";

type TextProps = {
  title: string;
  description: string;
}

export function Step({title, description}: TextProps) {
  return (
    <View style={s.container}>
      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  )
}