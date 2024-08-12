import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

import { images } from "../constants";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text
        style={{ fontSize: 23, marginBottom: 10 }}
        className="text-xl text-center font-psemibold text-white"
      >
        {title}
      </Text>
      <Text
        style={{ marginBottom: 29 }}
        className="font-pmedium text-sm text-gray-100"
      >
        {subtitle}
      </Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-4 "
      />
    </View>
  );
};

export default EmptyState;
