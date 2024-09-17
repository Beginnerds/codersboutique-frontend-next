"use client";
import TodoList from "@/components/TodoList";

export default function Home() {
  

  return <main className="min-h-screen bg-muted">
    <div className="py-10 w-full text-center bg-background"><h1 className="text-4xl  text-muted-foreground">My Tasks</h1></div>

    <div className="mt-8">
      <TodoList/>
    </div>
  </main>;
}
