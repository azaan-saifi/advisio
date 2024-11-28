import Chat from "@/components/Chat";
import UploadFile from "@/components/UploadFile";
import { getUserById } from "@/lib/actions/user.action";
import { IUser } from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Home = async () => {
  const { userId } = await auth();

  if (!userId) return <UploadFile />;

  const response = await getUserById({ userId });
  const user: IUser = JSON.parse(response);

  return (
    <>
      {user?.isUploaded ? <Chat user={JSON.stringify(user)} /> : <UploadFile />}
    </>
  );
};

export default Home;
