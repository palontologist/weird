"use client";

import { Form,FormField,FormControl,FormItem } from "@/components/ui/form";
import { Input } from  "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import axios from "axios";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { getChatResponse } from "./api/api";
import { useForm } from "react-hook-form";


async function getData (){
  const url = await fetch (
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept:"application/json",
        authorization:process.env.MOVIEDB_API as string,

      },
    }
  );

  


  return url.json();
}

export default function Home() {
  const form = useForm <z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      prompt:""
    }
  });
  
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values:z.infer<typeof formSchema>) => {
    console.log(values);
  };
  
  return (
   <div className='bg-white py-6 sn:py-8 lg:py-12 '>
    <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
      <div className='mb-10 md:mb-16'>
        <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>
             Make Impact Now
        </h2>

        <div className="px-4 lg:px-8">
          <div>
             <Form {...form}> 
               <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="
                rounded-lg
                border
                w-full
                p-4
                px-3
                md:px-6
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
                "
                >
                   <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="What SDGs can I impact from my passions, skills and education?" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
               />
               <Button className="col-span-32 lg:col-span-2">
                 Generate
               </Button>
               </form>   
             </Form>
          </div>
            


        </div>
        

      </div>
    </div>
   </div>

   
  )
}