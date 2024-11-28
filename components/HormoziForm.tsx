"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  ytUrl: z.string().min(2),
});

const HormoziForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ytUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const response = await fetch("/api/external", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error("Error while transcribing or embedding");
        throw new Error("Error while fetching the response");
      }

      toast.success("Video data stored successfully!");

      console.log(values);
    } catch (error) {
      console.log(error);
      throw new Error("Error while submitting the form");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }
  return (
    <div className="flex h-[calc(100vh-56px)] flex-col items-center  justify-center gap-6 bg-primary-100">
      <h1 className="text-3xl font-bold text-white">
        Hormozi&apos;s Knowledge Base
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-3 px-4"
        >
          <FormField
            control={form.control}
            name="ytUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-transparent text-white"
                    placeholder="Youtube Url"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-gradient text-white"
          >
            {isLoading}
            {isLoading ? (
              <>
                <Loader className="mr-1 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default HormoziForm;
