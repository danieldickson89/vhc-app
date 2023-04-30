import { Box, Text, Image, VStack } from "@chakra-ui/react";

export default function Weclome() {
  return (
    <VStack>
      <Box>
        <Text as="b" fontSize="3xl">
          Vagrant Hockey Club
        </Text>
      </Box>
      <Image src="/vhc-logo.png" alt="VHC Logo"></Image>
    </VStack>
  );
}
