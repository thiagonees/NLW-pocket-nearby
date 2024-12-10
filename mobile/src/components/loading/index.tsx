import { ActivityIndicator } from "react-native"
import { s } from './styles'
import { colors } from "@/styles/colors"

export default function Loading() {
  return (
    <ActivityIndicator color={colors.green.base}
      style={s.container} />
  )
}