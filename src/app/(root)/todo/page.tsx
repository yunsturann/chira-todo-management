// ** React
import React from "react";

// ** Nextjs Imports
import { redirect } from "next/navigation";
import { Metadata } from "next";

// ** Actions
import { getUserById } from "@/lib/actions/user.actions";
import { getAllBoardsByUserId } from "@/lib/actions/board.actions";

// ** Types
import { IBoard, IUser } from "@/types/model.types";

// ** Third Party Imports
import { auth } from "@clerk/nextjs";

// ** Custom Components
import Container from "@/components/shared/container";
import BoardsTable from "@/components/todo/boards-table";

export const metadata: Metadata = {
  title: "Boards",
};

const TodoPage = async () => {
  const { userId } = auth();

  const user: IUser = await getUserById(userId!);

  if (!user) {
    redirect("/");
  }

  const boards = (await getAllBoardsByUserId(user._id)) as IBoard[];

  if (boards.length === 0) {
    redirect("/onboarding");
  }

  return (
    <Container paddingVertical>
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl lg:text-4xl font-semibold">
          {user.username.charAt(0).toUpperCase() +
            user.username.slice(1) +
            "'s "}
          Boards
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here are your boards. Click on a board to view its tasks
        </p>
      </header>

      <BoardsTable boards={boards} userId={user._id} />
    </Container>
  );
};

export default TodoPage;
