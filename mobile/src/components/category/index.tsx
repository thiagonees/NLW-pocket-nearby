import { Pressable, PressableProps, Text } from 'react-native'
import React from 'react'

import { s } from "./styles"
import { categoriesIcons } from '@/utils/categories-icons';
import { colors } from '@/styles/colors';

type Props = PressableProps & {
  name: string;
  iconId: string;
  isSelected?: boolean;


}

export function Category({ name, iconId, isSelected, ...rest }: Props) {
  const Icon = categoriesIcons[iconId]

  return (
    <Pressable style={[s.container, isSelected && s.selectedContainer]} {...rest}>
      <Icon size={16} color={colors.gray[isSelected? 100 : 400]} />
      <Text style={[s.name, isSelected && s.selectedName]}>{name}</Text>
    </Pressable>
  )
}