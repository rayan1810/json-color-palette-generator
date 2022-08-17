import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { colorShades, arrayToObject } from "../utils";
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
  NativeBaseProvider,
  extendTheme,
  Stack,
  Link,
} from "native-base";
import { useState, useEffect } from "react";
const ColorInput = (props: any) => {
  return (
    <Box
      borderWidth={4}
      borderColor="coolGray.300"
      rounded="80"
      position="relative"
      size="26px"
      overflow="hidden"
    >
      <input
        type="color"
        style={{
          width: "40px",
          height: "40px",
          padding: 0,
          position: "absolute",
          top: -10,
          left: -10,
        }}
        {...props}
      />
    </Box>
  );
};

const SectionBox = ({ name, children }: any) => {
  return (
    <Box
      p="8"
      my="8"
      rounded="6"
      maxW="1080px"
      w={{ base: "90%", md: "100%" }}
      alignItems="center"
      // bg="coolGray.50"
      borderColor="coolGray.300"
      borderWidth="1"
      position="relative"
    >
      <Heading
        position="absolute"
        top="-14"
        left="10"
        px="2"
        size="sm"
        bg="white"
      >
        {name}
      </Heading>
      {children}
    </Box>
  );
};

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
  const copyApiToClipboard = () => {
    let hostname = "";
    let port = "";
    if (typeof window !== "undefined") {
      hostname = window.location.hostname;
    }
    let apiurl = `https://${hostname}/api/get-color-palette?name=${name}&color=${
      color.split("#")[1]
    }&size=${amount}&diff=${pug}`;
    onCopy(encodeURI(apiurl));
  };
  const [name, setName] = useState("New Color");
  const [pug, setPug] = useState(60);
  useEffect(() => {
    getShades(color, amount);
    // eslint-disable-next-line react/jsx-key
  }, [color, pug, amount]);

  const theme = extendTheme({
    colors: {
      primary: {
        ...arrayToObject(colorShades(color, 10, pug)),
      },
    },
  });

  return (
    <NativeBaseProvider isSSR theme={theme}>
      <Head>
        <title>JSON Color Palette Generator</title>
        <meta name="keywords" content="JSON Color Palette Generator" />
        {/* og meta links */}
        <meta property="og:title" content="JSON Color Palette Generator" />
        <meta
          property="og:description"
          content="Generate a color palette from a hex color, also set the amount of shades"
        />
        <meta
          property="og:url"
          content="https://json-color-palette-generator.vercel.app/"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="JSON Color Palette Generator" />
        <meta
          name="twitter:image:alt"
          content="Generate a color palette from a hex color, also set the amount of shades"
        />
        <meta property="og:image" content="/OGImage.png" />
        <meta
          name="twitter:image"
          content="https://json-color-palette-generator.vercel.app/OGImage.png"
        ></meta>
        <meta name="twitter:site" content="@rohitistweet" />

        <meta
          name="description"
          content="Generate a color palette from a hex color, also set the amount of shades"
        />
      </Head>
      <ScrollView
        _contentContainerStyle={{
          maxW: "1080px",
          w: "100%",
          // bg: "red.200",
          alignSelf: "center",
        }}
      >
        <VStack alignItems="center" space={{ base: "2", md: "6" }}>
          <Heading fontSize={{ base: "xl", md: "5xl" }} my="8">
            JSON Color Palette Generator
          </Heading>
          <SectionBox name="Settings">
            <Stack
              direction={{ base: "column", md: "row" }}
              alignSelf="center"
              justifyContent={"center"}
              space={8}
            >
              <Box>
                <FormControl>
                  <FormControl.Label isRequired>Color Name</FormControl.Label>
                  <Input w="56" size="xl" value={name} onChangeText={setName} />
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormControl.Label isRequired>Palette Size</FormControl.Label>
                  <Input
                    w="56"
                    size="xl"
                    value={amount}
                    onChangeText={setAmount}
                  />
                </FormControl>
              </Box>
              <VStack w="80" space="4">
                <Heading flex="1" size="sm">
                  Diffing Index
                </Heading>
                <Slider
                  flex="2"
                  value={pug}
                  minValue={0}
                  maxValue={100}
                  colorScheme="primary"
                  onChange={(v) => {
                    setPug(v);
                  }}
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
              </VStack>
              <HStack space="2" alignItems="center">
                <Heading size="sm">Base Color</Heading>
                <ColorInput
                  value={color}
                  onChange={(e: any) => setColor(e.target.value)}
                />
              </HStack>
            </Stack>
          </SectionBox>
          <SectionBox name="Preview">
            <Heading mb="4" size="sm">
              {name}
            </Heading>
            <HStack maxW="100%" overflowX="scroll">
              {shades.map((color, ind) => (
                <Center key={`${ind}-color-shade`} size="16" bg={color}>
                  {ind === 0 ? 50 : ind * 100}
                </Center>
              ))}
            </HStack>
          </SectionBox>
          <SectionBox name="Actions">
            <HStack space="4" alignItems="center">
              <Button onPress={copyToClipboard}>Copy Color Palette JSON</Button>
              <Button onPress={copyApiToClipboard}>Get API URL</Button>
            </HStack>
          </SectionBox>
        </VStack>
      </ScrollView>
      <Center py="4">
        <HStack>
          <Link
            isExternal
            isUnderlined={false}
            _hover={{
              isUnderlined: true,
            }}
            href="https://github.com/rayan1810/json-color-palette-generator"
          >
            Made with ❤️ by Rohit Singh
          </Link>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default Home;
