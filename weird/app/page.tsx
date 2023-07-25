"use client";

import { BotAvatar } from "@/components/bot-avatar";
import {UserAvatar} from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { ChatCompletionRequestMessage } from "openai";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, useState } from "react"
import { useRouter } from "next/navigation";
import { Form,FormField,FormControl,FormItem } from "@/components/ui/form";
import { Input } from  "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import axios from "axios";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const Home = () => {
  const [messages, setMessages ] = useState<ChatCompletionRequestMessage[]>([]);
  const router = useRouter(); 
 
  
  const form = useForm <z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      prompt:""
    }
  });
  
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { 
        role:"user",
        content: values.prompt

      };

      
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", { messages: newMessages, });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();  


    } catch (error: any) {
      
    } finally {
      router.refresh();
    }

  }
    
  
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
                p-4fcv
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
               <Button className="col-span-32 lg:col-span-2 w-full"disabled={isLoading}>
                 Generate
               </Button>
               </form>   
             </Form>

          </div>

          <div className="space-y-4 mt-4">
            <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div key={message.content}>
                {message.content}
              </div>
              
              ))}
            </div>
      </div>
    </div>
   </div>
  </div>
  </div>
   
  );
}
export default Home;
