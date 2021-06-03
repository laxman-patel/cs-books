import React from "react";
import Layout from "../components/Layout";
import Video from "../lib/Videos";
import { SimpleGrid, Heading, Center, Text } from "@chakra-ui/layout";
import VideoCard from "../components/VideoCard";

const Courses = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <Layout>
        <Heading color="gray.700" ml="1em" mt="1em" as="h1" mb="0.5em">
          Courses
        </Heading>
        <Center>
          <Text>No Courses currently available.</Text>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading color="gray.700" ml="1em" mt="1em" as="h1" mb="0.5em">
        Courses
      </Heading>

      <SimpleGrid
        minChildWidth={{ sm: "200px", lg: "400px" }}
        spacing="2em"
        m="2em"
      >
        {videos.map(({ id, title, path, publishedDate }) => (
          <VideoCard
            title={title}
            publishedDate={publishedDate}
            key={id}
            src={"/api/video/" + path.replace("videos/", "")}
          />
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const videos = await Video.find();

  return {
    props: {
      videos: videos.map(({ _id, title, path, publishedDate }) => ({
        id: String(_id),
        title,
        path,
        publishedDate: String(publishedDate),
      })),
    },
  };
};

export default Courses;
