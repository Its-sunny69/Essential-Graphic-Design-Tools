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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGeminiAPI } from "@/hooks/useGeminiAPI";

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
  // const [prompt, setPrompt] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [copied, setCopied] = useState<boolean>(false);
  const route = process.env.NEXT_PUBLIC_PROMPT_ROUTE!;
  const { sendPrompt, apiError, loading, result } = useGeminiAPI(route);

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
    const basePrompt = `Please create a ${values.stylePreference} ${
      values.designType
    } for a brand operating in the ${values.industry} industry. ${
      values.brandName &&
      `The brand name is "${values.brandName}". Please 
incorporate this into the brief accordingly.`
    } Provide a concise and professional design brief suitable for a creative designer. The output should be max 70 words`;

    try {
      const res = await sendPrompt(basePrompt);

      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
  }

  const handleCopy = () => {
    if (result) {
      copyToClipboard(result, {
        onSuccess: () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        },
      });
    }
  };

  return (
    <div className="animate-fade-up">
      <p className="sm:text-4xl text-2xl font-bold text-center">
        Design Smarter.
        <br className="sm:hidden inline" /> Start with an AI Brief
      </p>
      <div className="sm:w-[85%] mx-auto border p-8 my-8 rounded-xl shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-flow-row sm:grid-cols-2 gap-x-4 gap-y-6"
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
          <div className="p-4 my-8">
            <div className="mb-8">
              <p className="sm:text-3xl text-2xl font-bold">
                Crafting Your Prompt...⚡
              </p>
            </div>

            <div>
              <Skeleton className="h-6 rounded-xl" />
            </div>
          </div>
        ) : (
          (apiError || result) && (
            <div className="p-4 rounded-md my-8">
              {apiError ? (
                <div>
                  <div className="mb-8">
                    <p className="sm:text-3xl text-2xl font-bold">
                      ⚠️ Reached limit, Try again tomorrow!
                    </p>
                  </div>
                  <div className="bg-red-100 border-l-4 border-red-300 border text-red-600 rounded-xl p-4">
                    {apiError}
                  </div>
                </div>
              ) : (
                result && (
                  <div className="animate-fade">
                    <div className="flex justify-between items-center mb-8">
                      <p className="sm:text-3xl text-2xl font-bold">
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
                      <Markdown>{result}</Markdown>
                    </div>
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>

      <div className="mt-16 mb-8">
        <p className="sm:text-3xl text-2xl font-bold mb-6">
          How Prompt Generator works ?
        </p>

        <ul className="pl-4 list-decimal">
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
        <p className="my-2 border-l-4 pl-2 py-1 bg-gray-50 rounded-lg">
          <span className="font-semibold">Ideal for: </span>Logos, flyers,
          posters, banners, social posts, packaging & more.
        </p>
      </div>

      <div className="my-8">
        <header>
          <h1 className="sm:text-3xl text-2xl mb-6 font-bold">
            The Best Free AI Prompt Generator to Supercharge Your Creative
            Workflow
          </h1>
          <p className="mt-2">
            Discover the top AI prompt generator designed for creatives.
            Generate high-quality design briefs instantly and for free. No login
            required.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            Why AI Prompt Generators Are Game-Changers
          </h2>
          <p className="mt-2">
            In today’s fast-paced creative world, having a clear and structured
            design brief can make or break a project. Whether you're a
            freelancer, agency designer, or hobbyist, the ideation phase can be
            mentally taxing. This is where an{" "}
            <strong>AI prompt generator</strong> steps in to simplify and
            supercharge your creative process.
          </p>
          <p className="mt-2">
            These tools not only reduce the time spent brainstorming, but also
            improve clarity between clients and designers. You’re not starting
            from a blank page — you’re launching from an intelligent starting
            point crafted by a machine that understands industry context.
          </p>
          <p className="mt-2">
            If you've ever typed "ai prompt generator" or "free ai prompt
            generator" into Google, you're likely seeking a tool that can
            eliminate creative blocks and help you get started instantly. Our{" "}
            <strong>AI Design Brief Generator</strong> does exactly that.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            What Is an AI Prompt Generator?
          </h2>
          <p className="mt-2">
            An AI prompt generator is a smart tool that leverages artificial
            intelligence to create well-structured prompts or briefs based on
            user inputs. These prompts can be used for various tasks such as:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Graphic design projects</li>
            <li>Branding & logo design</li>
            <li>Marketing campaigns</li>
            <li>Content planning</li>
            <li>Website layout guidance</li>
            <li>Ad copy or social media creatives</li>
          </ul>
          <p className="mt-2">
            Unlike traditional generators that offer random suggestions,
            AI-driven tools analyze context and generate results that are highly
            relevant and actionable. They learn from large datasets and
            understand patterns in how good briefs are structured — giving users
            a head start.
          </p>
          <p className="mt-2">
            These generators can serve as idea accelerators, allowing teams to
            align quickly and move forward with clarity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            Meet Our AI Design Brief Generator
          </h2>
          <p className="mt-2">
            Our <strong>AI Design Brief Generator</strong> is built specifically
            for designers who need high-quality, concise, and clear design
            briefs. It uses advanced AI (powered by Google Gemini) to understand
            user inputs like design type, industry, and style preferences.
          </p>
          <p className="mt-2">
            Whether you're designing a sleek logo for a fintech startup or a
            vibrant poster for an event, the tool adapts to your needs, ensuring
            every brief feels personalized.
          </p>
          <h3 className="text-xl font-semibold mt-4">Key Features</h3>
          <ul className="list-disc list-inside mt-2">
            <li>
              No Login Required – Use it instantly, no signup or payment needed.
            </li>
            <li>
              Fast & Responsive – Generate a complete brief in less than 5
              seconds.
            </li>
            <li>
              Customizable – Input brand name, select style, and industry.
            </li>
            <li>Copy-Ready Output – Easy to copy and paste wherever needed.</li>
            <li>
              Mobile Friendly – Works seamlessly on smartphones and tablets.
            </li>
            <li>
              Minimal Interface – Clean UI focused purely on generating your
              brief.
            </li>
          </ul>
          <p className="mt-2">
            The generator removes the guesswork from brainstorming and acts as a
            virtual assistant for creatives under deadlines.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">Real-World Examples</h2>
          <p className="mt-2">
            Here are a few sample outputs generated using different input
            combinations:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>Logo for a tech company</strong>: “Design a modern,
              geometric logo for a cybersecurity startup. Use dark blue and
              silver tones.”
            </li>
            <li>
              <strong>Poster for a music festival</strong>: “Create a playful
              and bold poster for an indie music fest targeting college
              students.”
            </li>
            <li>
              <strong>Packaging for organic tea</strong>: “Design a minimalist
              package for an herbal tea brand with earthy colors and elegant
              typography.”
            </li>
          </ul>
          <p className="mt-2">
            These examples showcase the versatility of the AI engine and its
            ability to interpret context.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            Why Designers Love This Tool
          </h2>
          <p className="mt-2">
            Designers appreciate tools that reduce repetitive thinking and
            increase creativity. Our AI Brief Generator is trusted because:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>It removes the blank-page syndrome entirely</li>
            <li>It’s reliable under deadlines</li>
            <li>It offers professional tone briefs every time</li>
            <li>It’s useful for client projects and internal ideation alike</li>
          </ul>
          <p className="mt-2">
            Whether you're a student trying to meet a tight deadline or a
            freelancer juggling multiple clients, this tool ensures consistency
            and clarity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p className="mt-2">
            In a world where speed and clarity are crucial, having a reliable
            partner like an AI Prompt Generator makes a huge difference. It’s
            not about replacing creativity — it’s about accelerating it.
          </p>
          <p className="mt-2">
            If you're ready to work smarter, try our free tool and join
            thousands of designers already supercharging their workflow.
          </p>
        </section>
      </div>

      <div className="my-8">
        <p className="sm:text-3xl text-2xl font-bold mb-6">FAQs</p>

        <Accordion type="single" collapsible>
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
              please wait a moment and try again — the system resets at 12:00
              Midnight automatically.
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
