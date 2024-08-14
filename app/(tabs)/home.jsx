import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import { getAllPost, getLatestPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

import { images } from "../../constants";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPost);
  const { data: latestPost } = useAppwrite(getLatestPost);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View style={{ marginBottom: 35 }} className="my-6 px-4 space-y-6">
            <View
              style={{
                marginBottom: 10,
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
              className="flex-row"
            >
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text
                  style={{ fontSize: 25 }}
                  className="text-2xl font-psemibold text-white"
                >
                  Kolniysoft
                </Text>
              </View>
              <View className="mt-2">
                <Image
                  style={{
                    height: 35,
                    width: 34,
                    resizeMode: "contain",
                  }}
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={{ marginBottom: 20 }}>
              <SearchInput />
            </View>

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPost ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
