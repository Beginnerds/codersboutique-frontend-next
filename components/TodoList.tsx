"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import TodoItem from "./TodoItem";
import { Input } from "./ui/input";

const TodoList = () => {
  const [todos, setTodos] = useState([2]);

  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const addNewTask = () => {};

  const onClickDeleteHandler = (id: string) => {};
  const onClickDoneHandler = (id: string) => {};

  const onClickAddNewTaskHandler = (text: string) => {};

  const onNewTaskTextChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTaskText(e.target.value);
  };

  // if (!todos || todos.length == 0) {
  //   return (
  // <div>
  //   <Card className="max-w-[560px] mx-auto">
  //     <CardHeader>
  //       <CardTitle className="font-semibold">
  //         You have no upcoming tasks
  //       </CardTitle>
  //       <CardDescription>
  //         Add a new task to keep track of it
  //       </CardDescription>
  //     </CardHeader>

  //     <CardFooter>
  //       <Button onClick={()=>{
  //         setShowNewTaskDialog(true)
  //       }} className="w-full">Add A New Task</Button>
  //     </CardFooter>
  //   </Card>
  // </div>
  //   );
  // }

  return (
    <>
      {(!todos || todos.length == 0) && (
        <div>
          <Card className="max-w-[560px] mx-auto">
            <CardHeader>
              <CardTitle className="font-semibold">
                You have no upcoming tasks
              </CardTitle>
              <CardDescription>
                Add a new task to keep track of it
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button
                onClick={() => {
                  setShowNewTaskDialog(true);
                }}
                className="w-full"
              >
                Add A New Task
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      {todos.length > 0 && (
        <div>
          <div className="rounded-lg   bg-muted text-card-foreground shadow-sm max-w-[768px] mx-auto py-4 px-8 flex items-center justify-between gap-2">
            <h2 className="text-muted-foreground">
              Add more tasks to your list
            </h2>
            <Button
              onClick={() => {
                setShowNewTaskDialog(true);
              }}
            >
              Create New Task
            </Button>
          </div>
          <div className="mt-4">
            {todos.map((item, ind) => {
              return (
                <TodoItem
                  key={ind}
                  id={ind.toString()}
                  onClickDelete={onClickDeleteHandler}
                  onClickDone={onClickDoneHandler}
                />
              );
            })}
          </div>
          {/* New Task Dialog */}
        </div>
      )}
      {showNewTaskDialog && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-muted/85 grid place-content-center items-stretch justify-stretch">
          <Card className="mx-auto w-full max-w-[768px]">
            <CardHeader>
              <CardTitle>Add A New Task</CardTitle>
              <CardDescription>Enter the name of your task</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                onChange={onNewTaskTextChangeHandler}
                value={newTaskText}
                type="text"
                placeholder="Excercise at 10 AM..."
              />
              <Button
                className="mt-6 w-full"
                disabled={newTaskText.length == 0}
              >
                Add
              </Button>
              <Button
                variant={"destructive"}
                className="mt-2 w-full"
                onClick={() => {
                  setShowNewTaskDialog(false);
                }}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default TodoList;
