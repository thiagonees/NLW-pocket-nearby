import { View, Alert, Modal, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import { api } from '@/service/api'
import Loading from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { Details, PropsDetails } from '@/components/market/details'
import { Coupon } from '@/components/market/coupon'
import { Button } from '@/components/button'
import { CameraView, useCameraPermissions } from 'expo-camera'

type DataProps = PropsDetails & {
  cover: string;
}

export default function Market() {
  const [data, setData] = useState<DataProps>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetechingCoupon, setIsFetchingCoupon] = useState(false)

  const [_, requestPermission] = useCameraPermissions()
  const params = useLocalSearchParams<{ id: string }>()

  const qrLock = useRef(false)
  console.log(params.id)


  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setData(data)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      Alert.alert("Erro", "Error fetching market", [
        {
          text: "ok", onPress: () => router.back()
        }
      ])
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()
      if (granted) {
        return Alert.alert("Camera", "Voce precisa habilitar o uso da camera")
      }
      qrLock.current = false
      setIsVisibleCameraModal(true)
    }
    catch (error) {
      console.error(error)
      Alert.alert("Error", "Error opening camera")
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsFetchingCoupon(true)
      const { data } = await api.patch(`/coupons/${id}`)

      Alert.alert("Cupom", data.coupon)
      setCoupon(data.coupon)
    }
    catch (error) {
      console.error(error)
      Alert.alert("Error", "Error fetching coupon")
    } finally {
      setIsFetchingCoupon(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)

    Alert.alert("Cupom", "Nao e possivel reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?", [
      { style: "cancel", text: "Nao" },
      { text: "Sim", onPress: () => getCoupon(id) },

    ])
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1, }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)

            }
          }}
          style={{ flex: 1 }} />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32, }}>
          <Button onPress={() => setIsVisibleCameraModal(false)} isLoading={isFetechingCoupon}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}