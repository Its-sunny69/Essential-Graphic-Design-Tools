"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Markdown from "react-markdown";

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
import { Clipboard, Loader2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { Skeleton } from "./ui/skeleton";
import { copyToClipboard } from "@/utils/clipboard";
import { geminiResponse } from "@/utils/geminiResponse";

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

function GeneratorForm() {
  const [prompt, setPrompt] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const basePrompt = `Please create a ${values.stylePreference} ${
      values.designType
    } for a brand operating in the ${values.industry} industry. ${
      values.brandName &&
      `The brand name is "${values.brandName}". Please 
incorporate this into the brief accordingly.`
    } Provide a concise and professional design brief suitable for a creative designer. The output should be max 70 words`;

    try {
      const res = await geminiResponse(basePrompt);
      
      setError("")
      setPrompt(res);
    } catch (error: any) {
      setPrompt("");
      setError(error.message);
    }

    setLoading(false);
  }

  const handleCopy = () => {
    if (prompt) {
      copyToClipboard(prompt);
    }
  };

  console.log(error);

  return (
    <>
      <p className="text-4xl font-bold text-center">
        Design Smarter. Start with an AI Brief
      </p>
      <div className="border p-8 my-8 rounded-md shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-flow-row grid-cols-2 gap-x-4 gap-y-6"
          >
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
                      <SelectItem value="Business Card">
                        Business Card
                      </SelectItem>
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
                      <SelectItem value="Entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="NGO / Charity">
                        NGO / Charity
                      </SelectItem>
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
                  <FormLabel>
                    Got a brand? Drop the name here (optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your brand name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-fit">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Generating
                </>
              ) : (
                "Generate Magic ✨"
              )}
            </Button>
          </form>
        </Form>
      </div>

      {loading ? (
        <div className="p-4 rounded-md my-8">
          <div className="mb-8">
            <p className="text-3xl font-bold">Crafting Your Prompt...⚡</p>
          </div>

          <div className="p-4">
            <Skeleton className="h-6" />
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-md my-8">
          {error ? (
            <>
              <div className="my-8">
                <p className="text-3xl font-bold mb-8">
                  ⚠️ Reached limit, Try again tomorrow!
                </p>
              </div>
              <div className="bg-red-100 border-l-4 border-red-300 border text-red-600 rounded-xl p-4">
                {error}
              </div>
            </>
          ) : prompt && (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-3xl font-bold">
                  Your Custom Prompt is Ready! 🎉
                </p>
                <button
                  className="border rounded p-1 m-1 hover:opacity-50"
                  onClick={handleCopy}
                  data-tooltip-id="clipboard-tooltip"
                  data-tooltip-content="Copy to clipboard"
                  data-tooltip-place="top"
                >
                  <Clipboard />
                </button>
              </div>

              <div className="bg-gray-100 border-l-4 border-gray-300 border rounded-xl p-4">
                <Markdown>{prompt}</Markdown>
              </div>
            </>
          )}
        </div>
      )}

      <Tooltip
        id="clipboard-tooltip"
        delayShow={300}
        noArrow={true}
        style={{ padding: "4px 8px" }}
      />
    </>
  );
}

export default GeneratorForm;
