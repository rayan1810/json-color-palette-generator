import type { NextPage } from "next";
import Head from "next/head";
import { colorShades, arrayToObject } from "../utils";
import GitHubButton from "react-github-btn";
import {
  Text,
  Box,
  Button,
  Heading,
  HStack,
  ScrollView,
  Slider,
  Input,
  FormControl,
  Center,
  VStack,
  ButtonText,
  TooltipContent,
  TooltipText,
  Link,
  Tooltip,
  InputField,
  FormControlLabel,
  FormControlLabelText,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  GluestackUIProvider,
  CircleIcon,
  Radio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  RadioGroup,
  Theme,
  Pressable,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config-v2"; // Optional if you want to use default theme
import { useState, useEffect } from "react";

const useClipboard = () => {
  const onCopy = (text: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
    }
  };
  return { onCopy };
};

const ColorInput = (props: any) => {
  return (
    <Box
      borderWidth={4}
      borderColor="$coolGray300"
      rounded={80}
      position="relative"
      w="26px"
      h="26px"
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
      p="$8"
      my="$8"
      rounded="$lg"
      maxW="1080px"
      sx={{
        "@base": {
          w: "90%",
        },
        "@md": {
          w: "100%",
        },
      }}
      alignItems="center"
      // bg="coolGray.50"
      borderColor="$coolGray300"
      borderWidth={1}
      position="relative"
    >
      <Heading
        position="absolute"
        top={-3 * 4}
        left="$10"
        px="$2"
        size="sm"
        bg="$white"
      >
        {name}
      </Heading>
      {children}
    </Box>
  );
};

const Home: NextPage = () => {
  const [configType, setConfigType] = useState("flattened");
  const [color, setColor] = useState("#06b6d4");
  const [amount, setAmount] = useState(10);
  const [shades, setShades] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 8000);
    }, 10000);
  }, []);

  const getShades = (color: string, amount: number) => {
    // const [h, s, l] = hexToHsl(color);
    setShades(colorShades(color, amount, pug));
  };
  const { onCopy } = useClipboard();
  const copyToClipboard = () => {
    let colorObj = {};
    if (configType === "flattened") {
      colorObj = arrayToObject(shades, name);
    } else {
      colorObj[name] = arrayToObject(shades);
    }
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
    }&size=${amount}&diff=${pug}&configType=${configType}`;
    onCopy(encodeURI(apiurl));
  };
  const [name, setName] = useState("New_Color");
  const [pug, setPug] = useState(60);
  useEffect(() => {
    getShades(color, amount);
    setTheme({
      ...config,
      tokens: {
        ...config.tokens,
        colors: {
          ...config.tokens.colors,
          ...arrayToObject(colorShades(color, 10, pug), "primary"),
        },
      },
    });
    // eslint-disable-next-line react/jsx-key
  }, [color, pug, amount]);

  const [theme, setTheme] = useState({
    ...config,
    tokens: {
      ...config.tokens,
      colors: {
        ...config.tokens.colors,
        ...arrayToObject(colorShades(color, 10, pug), "primary"),
      },
    },
  });
  const [colorCopied, setColorCopied] = useState(false);
  const copyColor = (color: string) => () => {
    onCopy(color);
    setColorCopied(true);
    setTimeout(() => {
      setColorCopied(false);
    }, 500);
  };
  // force rerender on theme change
  return (
    <GluestackUIProvider config={theme}>
      <Theme name="light_theme">
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
          <meta
            property="og:site_name"
            content="JSON Color Palette Generator"
          />
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
          contentContainerStyle={{
            maxWidth: "1080px",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <VStack
            alignItems="center"
            sx={{
              "@base": {
                gap: "$2",
              },
              "@md": {
                gap: "$6",
              },
            }}
          >
            <Heading
              sx={{
                "@base": {
                  fontSize: "$xl",
                },
                "@md": {
                  fontSize: "$5xl",
                },
              }}
              my="$8"
              alignItems={"center"}
            >
              JSON Color Palette Generator
              <Box
                pl="$16"
                sx={{
                  "@base": {
                    display: "none",
                  },
                  "@md": {
                    display: "inline-block",
                  },
                }}
              >
                <Tooltip
                  placement="top"
                  openDelay={500}
                  isOpen={showTooltip}
                  trigger={(triggerProps) => {
                    return (
                      <Box {...triggerProps}>
                        <GitHubButton
                          href="https://github.com/rayan1810/json-color-palette-generator"
                          data-color-scheme="light"
                          data-icon="octicon-star"
                          data-size="large"
                          aria-label="Star rayan1810/json-color-palette-generator on GitHub"
                        >
                          Star
                        </GitHubButton>
                      </Box>
                    );
                  }}
                >
                  <TooltipContent>
                    <TooltipText>
                      {"If you like this tool, please star it on GitHub ⭐️"}
                    </TooltipText>
                  </TooltipContent>
                </Tooltip>
              </Box>
              <Box
                pl="$16"
                sx={{
                  "@base": {
                    display: "inline-block",
                  },
                  "@md": {
                    display: "none",
                  },
                }}
              >
                <GitHubButton
                  href="https://github.com/rayan1810/json-color-palette-generator"
                  data-color-scheme="light"
                  data-icon="octicon-star"
                  data-size="small"
                  aria-label="Star rayan1810/json-color-palette-generator on GitHub"
                >
                  Star
                </GitHubButton>
              </Box>
            </Heading>
            <SectionBox name="Settings">
              <Box
                sx={{
                  "@base": {
                    flexDirection: "column",
                  },
                  "@md": {
                    flexDirection: "row",
                  },
                }}
                alignSelf="center"
                justifyContent={"center"}
                gap={32}
              >
                <Box>
                  <FormControl isRequired={true}>
                    <FormControlLabel>
                      <FormControlLabelText>Color Name</FormControlLabelText>
                    </FormControlLabel>
                    <Input w="$56" size="xl">
                      <InputField
                        type="text"
                        value={name}
                        onChangeText={setName}
                      />
                    </Input>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired={true}>
                    <FormControlLabel>
                      <FormControlLabelText>Palette Size</FormControlLabelText>
                    </FormControlLabel>
                    <Input w="$56" size="xl">
                      <InputField
                        type="text"
                        value={amount}
                        onChangeText={setAmount}
                      />
                    </Input>
                  </FormControl>
                </Box>
                <VStack w="$80" space={"md"}>
                  <Heading flex={1} size="sm">
                    Diffing Index
                  </Heading>
                  <Slider
                    value={pug}
                    flex={2}
                    minValue={0}
                    maxValue={100}
                    onChange={(v) => {
                      setPug(v);
                    }}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
                <HStack space={"sm"} alignItems="center">
                  <Heading size="sm">Base Color</Heading>
                  <ColorInput
                    value={color}
                    onChange={(e: any) => setColor(e.target.value)}
                  />
                </HStack>
              </Box>
            </SectionBox>
            <SectionBox name="Preview">
              <Heading mb="$4" size="sm">
                {name}
              </Heading>
              <HStack maxWidth="100%" sx={{ overflowX: "scroll" }}>
                {shades.map((color, ind) => (
                  <Tooltip
                    key={`${ind}-color-shade`}
                    placement="top"
                    trigger={(triggerProps) => {
                      return (
                        <Pressable {...triggerProps} onPress={copyColor(color)}>
                          <Center w="$16" h="$16" bg={color}>
                            {ind === 0 ? 50 : ind * 100}
                          </Center>
                        </Pressable>
                      );
                    }}
                  >
                    <TooltipContent>
                      <TooltipText>
                        {colorCopied ? "Copied!" : color}
                      </TooltipText>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </HStack>
            </SectionBox>
            <SectionBox name="Actions">
              <Box
                sx={{
                  "@base": {
                    flexDirection: "column",
                    alignItems: "flex-start",
                  },
                  "@md": {
                    flexDirection: "row",
                    alignItems: "center",
                  },
                }}
                gap="$8"
                justifyContent="center"
              >
                <Box>
                  <FormControl>
                    <Tooltip
                      placement="top left"
                      trigger={(triggerProps) => {
                        return (
                          <FormControlLabel {...triggerProps}>
                            <FormControlLabelText>
                              Config Type?
                            </FormControlLabelText>
                          </FormControlLabel>
                        );
                      }}
                    >
                      <TooltipContent px="$10">
                        <TooltipText>{`
What to choose?

If you choose Flattened
{
  "primary50": "#f5f5f5",
  "primary100": "#e0e0e0",
  ...
  "primary800": "#191919",
  "primary900": "#000000"
}

If you choose Nested
{
  "primary": {
    "50": "#f5f5f5",
    "100": "#e0e0e0",
    ...
    "800": "#191919",
    "900": "#000000"
  }
}
                      `}</TooltipText>
                      </TooltipContent>
                    </Tooltip>
                  </FormControl>
                  <RadioGroup value={configType} onChange={setConfigType}>
                    <HStack space="lg">
                      <Radio value="flattened">
                        <RadioIndicator mr="$2">
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Flattened</RadioLabel>
                      </Radio>
                      <Radio value="nested">
                        <RadioIndicator mr="$2">
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Nested</RadioLabel>
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </Box>
                <Button onPress={copyToClipboard}>
                  <ButtonText>Copy Color Palette JSON</ButtonText>
                </Button>
                <Button onPress={copyApiToClipboard}>
                  <ButtonText>Get API URL</ButtonText>
                </Button>
              </Box>
            </SectionBox>
          </VStack>
        </ScrollView>
        <Center py="$4">
          <HStack>
            <Link
              isExternal
              // isUnderlined={false}
              // _hover={{
              //   isUnderlined: true,
              // }}
              href="https://github.com/rayan1810/json-color-palette-generator"
            >
              <Text>Made with ❤️ by Rohit Singh</Text>
            </Link>
          </HStack>
        </Center>
      </Theme>
    </GluestackUIProvider>
  );
};

export default Home;
