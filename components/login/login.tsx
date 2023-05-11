import { supabase } from "@/lib/supabaseClient";
import {
  Image,
  Input,
  VStack,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState(false);

  const toast = useToast();
  const togglePasswordShow = () => setShow(!show);
  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      toast({
        title: "Invalid Credentials",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <VStack>
      <Image src="/vhc-logo.png" alt="VHC Logo" mb="20px"></Image>
      <Input
        w="18em"
        defaultValue=""
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputGroup>
        <Input
          w="18em"
          pr="4.5rem"
          placeholder="Password"
          type={show ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement w="4.5rem">
          <Button size="sm" onClick={togglePasswordShow}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button w="18em" colorScheme="messenger" onClick={signIn}>
        Sign In
      </Button>
    </VStack>
  );
}
