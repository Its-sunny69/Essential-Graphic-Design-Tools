"use client";

import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  designType: z.string().min(1, {
    message: "Please select a design type.",
  }),
  industry: z.string().min(1, {
    message: "Please select an industry.",
  }),
  stylePreference: z.string().min(1, {
    message: "Please select stylePreference.",
  }),
  brandName: z
    .string()
    .max(30, {
      message: "Brand must be less than 30 characters.",
    })
    .optional(),
});

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API });

async function generator(basePrompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: basePrompt,
  });

  return response.text;
}

export function GeneratorForm() {
  const [prompt, setPrompt] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designType: "",
      industry: "",
      stylePreference: "",
      brandName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const basePrompt = `Please create a ${values.stylePreference} ${values.designType} for a brand operating in the ${values.industry} industry. ${values.brandName && `The brand name is "${values.brandName}". Please 
incorporate this into the brief accordingly.`} Provide a concise and professional design brief suitable for a creative designer. The output should be max 70 words`;

    const res = await generator(basePrompt);

    console.log(basePrompt);

    console.log(res);

    setPrompt(res);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="designType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Design Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a design type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Logo">Logo</SelectItem>
                    <SelectItem value="Business Card">Business Card</SelectItem>
                    <SelectItem value="Poster">Poster</SelectItem>
                    <SelectItem value="Flyer">Flyer</SelectItem>
                    <SelectItem value="Social Media Post">
                      Social Media Post
                    </SelectItem>
                    <SelectItem value="Brochure">Brochure</SelectItem>
                    <SelectItem value="Product Packaging">
                      Product Packaging
                    </SelectItem>
                    <SelectItem value="Banner">Banner</SelectItem>
                    <SelectItem value="Book Cover">Book Cover</SelectItem>
                    <SelectItem value="T-Shirt Design">
                      T-Shirt Design
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your industry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Fitness & Wellness">
                      Fitness & Wellness
                    </SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Food & Beverage">
                      Food & Beverage
                    </SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="NGO / Charity">NGO / Charity</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Gaming">Gaming</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Automotive">Automotive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stylePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a style</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Minimalistic">Minimalistic</SelectItem>
                    <SelectItem value="Modern">Modern</SelectItem>
                    <SelectItem value="Retro / Vintage">
                      Retro / Vintage
                    </SelectItem>
                    <SelectItem value="Playful">Playful</SelectItem>
                    <SelectItem value="Elegant">Elegant</SelectItem>
                    <SelectItem value="Futuristic">Futuristic</SelectItem>
                    <SelectItem value="Bold & Loud">Bold & Loud</SelectItem>
                    <SelectItem value="Hand-drawn">Hand-drawn</SelectItem>
                    <SelectItem value="Corporate / Professional">
                      Corporate / Professional
                    </SelectItem>
                    <SelectItem value="Geometric">Geometric</SelectItem>
                    <SelectItem value="Artistic / Abstract">
                      Artistic / Abstract
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your brand name (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter you brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Generate</Button>
        </form>
      </Form>

      <p>{prompt}</p>
      {/* use react-markdown............. */}
    </>
  );
}
