import { Box, Text } from "@chakra-ui/react";
// import { emptyChatBoxImage } from "../../context/chat/ChatConstants";

const EmptyChatBox = () => {
  return (
    <Box background="#f8f9fa" padding="30px 0" textAlign="center" height="100%">
      <Box padding="0 200px">
        <img
          marginTop="100"
          display="block"
          width="100%"
          height="100%"
          objectFit="contain"
          src={
            "https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg"
          }
        />
        <Text
          fontSize="32px"
          fontFamily="inherit"
          fontWeight="300"
          color="#41525d"
          marginTop="25px 0 10px 0"
        >
          Messenger Web
        </Text>
        <Text
          fontSize="14px"
          color="#667781"
          fontWeight="400"
          fontFamily="inherit"
        >
          Now send and receive messages without keeping your phone online.
        </Text>
        <Text
          fontSize="14px"
          color="#667781"
          fontWeight="400"
          fontFamily="inherit"
        >
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </Text>
      </Box>
    </Box>
  );
};

export default EmptyChatBox;
