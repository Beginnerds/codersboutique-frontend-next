import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const TodoItem = ({ id,completed = false,onClickDelete,onClickDone }: { id:string,completed?: boolean,onClickDelete:(id:string)=>void,onClickDone:(id:string)=>void }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-[768px] mx-auto py-8 px-8 flex items-center justify-between gap-2">
        <div className="hidden h-0 w-0 pointer-events-none text-muted-foreground line-through"></div>
      <p className={`${completed && 'text-muted-foreground line-through'}`}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, soluta
        perferendis quod saepe at nam!
      </p>
      <div className="flex items-center gap-2">
        {!completed && (
          <>
            {" "}
            <Button>
              <Check className="mr-2 h-4 w-4" /> Mark as done
            </Button>
            <Button variant={"destructive"}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-foreground h-6 "
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M10 12V17"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M14 12V17"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M4 7H20"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </Button>
          </>
        )}
        {completed && <Button variant={'secondary'} disabled>Completed</Button>}
      </div>
    </div>
  );
};


export default TodoItem;
