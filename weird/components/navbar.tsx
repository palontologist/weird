"use client";

import Link from "next/link";

import { Poppins } from "next/font/google";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


const font = Poppins({ weight: "600", subsets: ["latin"] });

export const Navbar = ()  =>  {
  

  return ( 
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
       
        <Link href="/">
          <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)}>
            frontforumfocus
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
       
          <Button size="sm" variant="premium">
            Upgrade
            <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
          </Button>
        
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
       
      </div>
    </div>
  );
}