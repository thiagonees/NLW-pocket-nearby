import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { api } from '@/service/api'
import { Categories, CategoriesProps } from '@/components/categories'


export default function Home() {

  const [categories, setCategories] = useState<CategoriesProps>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")
      setCategories(data)
    } catch (error) {
      console.error(error)
      Alert.alert("Categorias", "Error fetching categories")
    }
  }

  useEffect(() => {
    fetchCategories()
  },[])


  return (
    <View style={{ flex: 1 }}>
      <Categories data={categories} />
    </View>
  )
}