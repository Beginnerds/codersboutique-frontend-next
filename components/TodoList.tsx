"use client";

import React, { useEffect, useState } from "react";
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

import { getSupabaseClient } from "@/config/config";
import { Skeleton } from "./ui/skeleton";

const supabase = getSupabaseClient();

const TodoList = () => {
  const [todos, setTodos] = useState<TODO[]>([]);

  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [reFetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("Tasks").select();
      setIsFetching(false);
      if (error) {
        setFetchError("Could not fetch tasks");
        setTodos([]);
        console.log(error);
      }

      if (data) {
        console.log("fetched tasks", data);
        let sortedData = data.slice();
        sortedData = sortedData.sort((item1,item2)=>{
          return item2.id - item1.id; 
        })
        setTodos(sortedData);
        setFetchError("");
      }
    };

    setIsFetching(true);
    fetchTodos();
  }, [reFetch]);

  //this will add a task to the actual supabase db
  const addNewTask = async (desc: string) => {
    // no error handling for now
    await supabase.from("Tasks").insert([
      {
        status: "PENDING",
        task: desc,
      },
    ]);

    setRefetch((prev) => !prev);
  };

  const onClickDeleteHandler = async (id: number) => {
    setIsFetching(true)
    await supabase.from("Tasks").delete().eq("id",id);
    setRefetch((prev) => !prev);
  };
  const onClickDoneHandler = async (id: number) => {
    setIsFetching(true)
    await supabase.from("Tasks").update({status:"COMPLETED"}).eq("id",id);
    setRefetch((prev) => !prev);
  };

  const onClickAddNewTaskHandler = () => {
    // no need to validate since btn will be disabled if its empty
    addNewTask(newTaskText);

    setNewTaskText("");
    setShowNewTaskDialog(false);
  };

  const onNewTaskTextChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTaskText(e.target.value);
  };

  if (fetchError) {
    return (
      <div>
        <Card className="max-w-[560px] mx-auto bg-destructive">
          <CardHeader>
            <CardTitle className="font-semibold text-center text-destructive-foreground">
              Something went
            </CardTitle>
            <CardDescription className="text-center text-destructive-foreground">
              Could not fetch tasks from database
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="">
        <Skeleton className="py-6 w-full max-w-[768px] bg-slate-300 mx-auto" />
        <Skeleton className="my-3 py-6 w-full max-w-[768px] bg-slate-300 mx-auto" />
        <Skeleton className="my-3 py-6 w-full max-w-[768px] bg-slate-300 mx-auto" />
        <Skeleton className="my-3 py-6 w-full max-w-[768px] bg-slate-300 mx-auto" />
      </div>
    );
  }

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
                <div key={item.id} className="my-3">
                  <TodoItem
                    id={item.id}
                    status={item.status}
                    desc={item.task}
                    completed={item.status?.toLowerCase() == "completed"}
                    onClickDelete={onClickDeleteHandler}
                    onClickDone={onClickDoneHandler}
                  />
                </div>
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
                onClick={onClickAddNewTaskHandler}
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

interface TODO {
  id: number;
  status: string;
  task: string;
  created_at: Date;
}

export default TodoList;
