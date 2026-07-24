"use client";
import { getClientLoggedInUserInfo } from "@/actions/auth.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProfileData = () => {
  const { data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getClientLoggedInUserInfo(),
  });
  console.log("this is from profile data", data);
  return <div>ProfileData</div>;
};

export default ProfileData;
