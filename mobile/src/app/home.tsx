import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { api } from '@/service/api'
import { Categories, CategoriesProps } from '@/components/categories'
import { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'
import MapView, { Callout, Marker } from 'react-native-maps'
import { colors, fontFamily } from '@/styles/theme'
// import * as Location from 'expo-location';

type MarketsProps = PlaceProps & {
  latitude: number;
  longitude: number;
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494

}
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

  // async function getCurrentLocation() {
  //   try {
  //     const { granted } = await Location.requestForegroundPermissionsAsync();

  //     if(granted) {
  //     const location = await Location.getCurrentPositionAsync();
  //     console.log(location)
  //     }
  //   }
  //   catch (error) {
  //     console.error(error)
  //     Alert.alert("Localizacao", "Error fetching current location")
  //   }
  // }

  useEffect(() => {
    // getCurrentLocation()
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

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />
        {
          markets.map((item) => (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout>
                <View>
                  <Text style={{ fontSize: 14, 
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium}}>{item.name}</Text>

                  <Text style={{ fontSize: 12, 
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular}}>{item.address}</Text>
                </View>
              </Callout>
            </Marker>
          ))
        }
      </MapView>
      <Places data={markets} />
    </View>
  )
}