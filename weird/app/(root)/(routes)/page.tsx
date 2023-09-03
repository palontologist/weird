"use client";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
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
      prompt: ""
    }
  });
  
  const isLoading = form.formState.isSubmitting;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role:"user", content: values.prompt };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', { messages: newMessages }, {timeout: 100000, });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();  


    } catch (error: any) {
      
    } finally {
      router.refresh();
    }

  }
    

  return (

    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
      
        <h1 className="sm:text-3xl text-4xl font-bold text-center title-font mb-4 text-gray-900[text-wrap:balance]">
        Connect, Educate, and Empower
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          connecting people working to achieve sustainable development,
          goals through community initiatives, marketplace and
          educational resources.
          Make impact now.
        </p>
      </div>
      
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
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
             </form>   
            </Form>
          </div>
        <div className="space-y-4 mt-4">
         <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}>
                 
                 
                <p className="text-sm">
                 {message.content}
                </p>
              </div>
              
              ))}
            </div>
      
      </div>
    </div>
   </div>
  </section>

   
  );
}
export default Home;
