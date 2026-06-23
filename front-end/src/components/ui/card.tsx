import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-gradient-to-br from-purple-950/50 to-purple-900/30 text-white rounded-2xl border border-purple-800 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "relative grid grid-rows-[auto_auto] gap-2 px-4 text-center",
        className
      )}
      {...props}
    />
  );
}

function CardBackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/admindashboard")}
      className="absolute left-4 top-4 flex items-center gap-1 text-sm text-white hover:text-purple-300 transition"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-xl font-bold text-white tracking-wide", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-purple-300", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("absolute top-4 right-4", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex-grow px-4 py-2 text-purple-200", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-between px-4 pt-4 border-t border-purple-700 text-sm text-purple-400",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardBackButton,
};
