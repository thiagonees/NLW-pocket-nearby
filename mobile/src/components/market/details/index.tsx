import { View, Text } from 'react-native'
import React from 'react'
import { s } from './styles';


export type PropsDetails = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: string
  rules: {
    id: string;
    desciption: string;
  }[]
}

type Props = {
  data: PropsDetails
}

export function Details({ data }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Informaçoes:</Text>
      </View>
    </View>
  )
}