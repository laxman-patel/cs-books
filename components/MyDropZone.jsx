import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input, Flex, Text } from "@chakra-ui/react";

const MyDropzone = ({ setVideoFile, onInvalidFile }) => {
  const [isDroped, setIsDroped] = useState(false);

  const onDrop = useCallback((file) => {
    if (file.length === 0) {
      onInvalidFile();
      return;
    }

    setIsDroped(true);
    setVideoFile(file[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "video/*",
  });

  return (
    <Flex
      bgColor={`${isDroped ? "green.100" : "white"}`}
      cursor="pointer"
      px={10}
      justifyContent="center"
      alignItems="center"
      h={"20"}
      style={{ border: `5px ${isDroped ? "solid #2ecc71" : "dashed #edf2f7"}` }}
      {...getRootProps()}
    >
      <Input isRequired {...getInputProps()} />
      {isDragActive ? (
        <Text color="gray.600">Drop the files here...</Text>
      ) : (
        <Text color="gray.600">
          {isDroped
            ? "Video selected successfully"
            : "Drag 'n' drop video here, or click to select it."}
        </Text>
      )}
    </Flex>
  );
};

export default MyDropzone;
