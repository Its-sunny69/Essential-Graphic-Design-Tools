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
import { Check, Clipboard, Loader2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { Skeleton } from "./ui/skeleton";
import { copyToClipboard } from "@/utils/clipboard";
import { geminiResponse } from "@/utils/geminiResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [copied, setCopied] = useState<boolean>(false);
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

      console.log("form", res);

      setError("");
      setPrompt(res);
    } catch (error) {
      setPrompt("");
      setError((error as Error).message);
    }

    setLoading(false);
  }

  const handleCopy = () => {
    if (prompt) {
      copyToClipboard(prompt, {
        onSuccess: () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        },
      });
    }
  };

  console.log(error);

  return (
    <div className="animate-fade-up">
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

      <div key={loading ? "loading" : "loaded"} className="animate-fade">
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
          (error || prompt) && <div className="p-4 rounded-md my-8">
            {error ? (
              <div>
                <div className="mb-8">
                  <p className="text-3xl font-bold">
                    ⚠️ Reached limit, Try again tomorrow!
                  </p>
                </div>
                <div className="bg-red-100 border-l-4 border-red-300 border text-red-600 rounded-xl p-4">
                  {error}
                </div>
              </div>
            ) : (
              prompt && (
                <div className="animate-fade">
                  <div className="flex justify-between items-center mb-8">
                    <p className="text-3xl font-bold">
                      Your Custom Prompt is Ready! 🎉
                    </p>
                    <button
                      className=" rounded p-2 m-1 hover:bg-gray-100 active:scale-95 transition-all"
                      onClick={handleCopy}
                      data-tooltip-id="clipboard-tooltip"
                      data-tooltip-content="Copy to clipboard"
                      data-tooltip-place="top"
                    >
                      {copied ? <Check /> : <Clipboard />}
                    </button>
                  </div>

                  <div className="bg-gray-100 border-l-4 border-gray-300 border rounded-xl p-4">
                    <Markdown>{prompt}</Markdown>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <div className="mt-16 mb-8">
        <p className="text-4xl font-bold mb-6">How Prompt Generator works ?</p>

        <ul className="pl-4 list-decimal text-lg">
          <li className="my-2">
            Users select a design type, industry, and style preference from
            simple dropdowns.
          </li>
          <li className="my-2">
            Optionally, users can enter a brand name to personalize the brief.
          </li>
          <li className="my-2">
            Our AI model intelligently crafts a short and professional design
            brief based on your inputs.
          </li>
          <li className="my-2">
            Briefs are written in under 70 words, optimized for clarity and
            client communication.
          </li>
          <li className="my-2">
            Generated prompts are instantly copyable for use in proposals or
            creative direction.
          </li>
        </ul>
        <p className="italic my-2">
          ⚠️ Note: In rare cases, generation may temporarily fail due to high
          demand. Simply try again after a few moments.
        </p>
        <p className="my-2 text-lg border-l-4 pl-2 py-1 bg-gray-50 rounded-lg">
          <span className="font-semibold">Ideal for: </span>Logos, flyers,
          posters, banners, social posts, packaging & more.
        </p>
      </div>

      <div className="my-8">
        <p className="text-4xl font-bold mb-6">FAQs</p>

        <Accordion type="single" className="pl-4" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How accurate are the AI-generated briefs?
            </AccordionTrigger>
            <AccordionContent>
              The briefs are crafted using advanced language models to match
              your design type, industry, and style. While concise, they're
              tailored to spark creative direction effectively.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can I regenerate or edit the brief?
            </AccordionTrigger>
            <AccordionContent>
              Yes! You can re-submit different inputs or manually tweak the
              brief after copying it for full customization.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Why does it sometimes fail to generate a brief?
            </AccordionTrigger>
            <AccordionContent>
              Occasionally, high usage may delay generation. If this happens,
              please wait a moment and try again — the system resets at 12:00 Midnight
              automatically.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I use the brief for client projects or pitches?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely. The briefs are made for real-world design use — you
              can share them with clients, include them in proposals, or use
              them internally.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is the tool completely free?</AccordionTrigger>
            <AccordionContent>
              Yes, it's free and doesn’t require login. We simply limit overuse
              to keep it accessible for everyone.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Tooltip
        id="clipboard-tooltip"
        delayShow={300}
        noArrow={true}
        style={{ padding: "4px 8px" }}
      />
    </div>
  );
}

export default GeneratorForm;
