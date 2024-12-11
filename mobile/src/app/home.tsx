import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { api } from '@/service/api'
import { Categories, CategoriesProps } from '@/components/categories'
import { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'

type MarketsProps = PlaceProps
export default function Home() {

  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")
  const [markets, setMarkets] = useState<MarketsProps[]>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")
      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.error(error)
      Alert.alert("Categorias", "Error fetching categories")
    }
  }

  async function fetchMarkets() {
    try {

      if (!category) {
        return
      }
      const { data } = await api.get("/markets/category/" + category)
      setMarkets(data)
    } catch (error) {
      console.error(error)
      Alert.alert("Locais", "Error fetching markets")
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category])


  return (
    <View style={{ flex: 1, backgroundColor: "#cecece" }}>
      <Categories data={categories} onSelect={setCategory} 
      selected={category} 
      />
      <Places data={markets} />
    </View>
  )
}