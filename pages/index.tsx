import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { hslToHex, hexToHsl, colorShades, arrayToObject } from "../utils";
import {
  Box,
  Button,
  Heading,
  HStack,
  ScrollView,
  Slider,
  Input,
  useClipboard,
  FormControl,
  Center,
  VStack,
} from "native-base";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [color, setColor] = useState("#06b6d4");
  const [amount, setAmount] = useState(10);
  const [shades, setShades] = useState([]);
  const getShades = (color: string, amount: number) => {
    // const [h, s, l] = hexToHsl(color);
    setShades(colorShades(color, amount, pug));
  };
  const { onCopy } = useClipboard();
  const copyToClipboard = () => {
    let colorObj = {};
    colorObj[name] = arrayToObject(shades);
    onCopy(JSON.stringify(colorObj, null, 2));
  };
  const [name, setName] = useState("New Color");
  const [hue, setHue] = useState(0);
  const [pug, setPug] = useState(60);
  const [saturation, setSaturation] = useState(0);
  const [l, setL] = useState(0);
  useEffect(() => {
    getShades(color, amount);
  }, [color, pug, amount]);
  return (
    <ScrollView>
      <VStack alignItems="center" space="16">
        <Heading mt="8">JSON Color Palette Generator</Heading>
        <HStack justifyContent={"center"} space={8}>
          <Box>
            <FormControl>
              <FormControl.Label isRequired>Name</FormControl.Label>
              <Input w="56" size="xl" value={name} onChangeText={setName} />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormControl.Label isRequired>Size</FormControl.Label>
              <Input w="56" size="xl" value={amount} onChangeText={setAmount} />
            </FormControl>
          </Box>
        </HStack>
        <HStack w="56" space="8">
          <Heading size="sm">Pug</Heading>
          <Slider
            value={pug}
            minValue={0}
            maxValue={100}
            colorScheme="cyan"
            onChange={(v) => {
              setPug(v);
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </HStack>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <HStack space="0">
          {shades.map((color, ind) => (
            <Center size="16" bg={color}>
              {ind === 0 ? 50 : ind * 100}
            </Center>
          ))}
        </HStack>
        <Button onPress={copyToClipboard}>Copy to Clipboard</Button>
      </VStack>
    </ScrollView>
  );
};

export default Home;
