import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { getSession } from "next-auth/client";
import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Progress,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import MyDropzone from "../components/MyDropZone";
import axios from "axios";

const Admin = ({ isAdmin }) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();

    formData.append("videoTitle", videoTitle);
    formData.append("videoFile", videoFile);

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        setUploadProgress(Math.round((event.loaded * 100) / event.total));
      },
    };

    const res = await axios.post("/api/uploadVideo", formData, config);

    setIsUploading(false);
  };

  if (!isAdmin) {
    return (
      <Layout>
        <Flex h="3xl" justifyContent="center" alignItems="center">
          <Heading color="gray.700" justifyItems="center" as="h1">
            Access Denied
          </Heading>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container mt={10}>
        <Heading color="gray.700" as="h3">
          Upload your videos here
        </Heading>
        {isFormInvalid && (
          <Alert mt={10} status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Please select a valid video format!</AlertTitle>
            <CloseButton
              onClick={() => setIsFormInvalid(false)}
              position="absolute"
              right="8px"
              top="8px"
            />{" "}
          </Alert>
        )}
        <Box mt={10}>
          <FormControl id="title">
            <FormLabel>Video title</FormLabel>
            <Input
              isRequired
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              type="text"
            />
            <FormHelperText>Be descriptive, but not verbose.</FormHelperText>
          </FormControl>
          <FormControl mt={5} id="video">
            <FormLabel>Video</FormLabel>
            <MyDropzone
              onInvalidFile={() => setIsFormInvalid(true)}
              setVideoFile={setVideoFile}
            />
          </FormControl>
          {isUploading && (
            <Progress colorScheme="orange" mt={5} value={uploadProgress} />
          )}
          <Button
            isLoading={isUploading}
            loadingText="uploading..."
            isDisabled={!videoFile || !videoTitle.trim()}
            onClick={handleUpload}
            mt={10}
            colorScheme="orange"
            rightIcon={<FiUpload />}
          >
            Upload
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const { res } = ctx;

  if (!session?.user) {
    res.setHeader("location", "/api/auth/signin");
    res.statusCode = 302;
    res.end();

    return {
      props: {},
    };
  }

  return {
    props: { isAdmin: session.user.email === "laxmanlp777@gmail.com" },
  };
};

export default Admin;
