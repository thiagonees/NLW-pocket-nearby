import { View, Text, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { api } from '@/service/api'


export default function Home() {

  useEffect(() => {
    fetchCategories()
  },[])

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")
      console.log(data)
    } catch (error) {
      console.error(error)
      Alert.alert("Categorias", "Error fetching categories")
    }
  }

  return (
    <View style={{ flex: 1 }}>

    </View>
  )
}