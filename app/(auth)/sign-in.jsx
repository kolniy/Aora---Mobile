import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import { signIn } from "@/lib/appwrite";

import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please Fill in all the field.");
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);

      // set it to global state...

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-35px"
            style={{
              // this actually works as fallback where tailwind doesn't
              width: 130,
              height: 80,
              resizeMode: "contain",
            }}
          />
          <Text
            // this actually works as fallback where tailwind doesn't
            style={{
              fontSize: 25,
              marginTop: 13,
            }}
            className="text-2xl text-white text-semibold font-psemibold"
          >
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View
            style={{
              marginTop: 20,
            }}
            className="justify-center pt-5 flex-row gap-2"
          >
            <Text
              style={{
                marginRight: 8,
              }}
              className="text-lg text-gray-100 font-pregular"
            >
              Don't have account?
            </Text>
            <Link
              style={{
                color: "#ff9c01",
              }}
              href="/sign-up"
              className="text-lg font-psemibold text-red-500"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
