"use client";

import { useEffect, useState } from "react";
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
import { ArrowLeft, ArrowRight, Check, Clipboard, Loader2 } from "lucide-react";
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
  const [copied, setCopied] = useState<boolean>(false);
  const route = process.env.NEXT_PUBLIC_PROMPT_ROUTE!;
  const { sendPrompt, apiError, loading } = useGeminiAPI(route);
  const [promptArr, setPromptArr] = useState<string[]>([]);
  const [count, setCount] = useState(promptArr.length);

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

    const text = await sendPrompt(basePrompt);

    if (text) {
      setPromptArr((prev) => [...prev, text]);
      setCount(promptArr.length);
    }
  }

  const handleCopy = (text: string) => {
    if (text) {
      copyToClipboard(text, {
        onSuccess: () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        },
      });
    }
  };

  const handlePrev = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
  };

  const handleNext = () => {
    if (count !== promptArr.length - 1) {
      setCount(count + 1);
    }
  };

  useEffect(() => {
    console.log("count", count);
    console.log(promptArr[count]);
  }, [count]);

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
          <div className="p-4 rounded-md my-8">
            {apiError && (
              <div className="mb-8">
                <div className="mb-8">
                  <p className="sm:text-3xl text-2xl font-bold">
                    ⚠️ Reached limit, Try again tomorrow!
                  </p>
                </div>
                <div className="bg-red-100 border-l-4 border-red-300 border text-red-600 rounded-xl p-4">
                  {apiError}
                </div>
              </div>
            )}
            {promptArr.length !== 0 && (
              <div className="animate-fade">
                <div className="mb-8">
                  <p className="sm:text-3xl text-2xl font-bold mb-4">
                    Your Custom Prompt is Ready! 🎉
                  </p>

                  <div className="w-full flex justify-end items-center">
                    <button
                      onClick={handlePrev}
                      className={`${
                        count === 0 ? "opacity-50" : ""
                      } active:scale-95 transition-all`}
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <p>
                      {count + 1}/{promptArr.length}
                    </p>
                    <button
                      onClick={handleNext}
                      className={`${
                        count === promptArr.length - 1 ? "opacity-50" : ""
                      } active:scale-95 transition-all`}
                    >
                      <ArrowRight size={20} />
                    </button>
                    <button
                      className=" rounded p-2 m-1 hover:bg-gray-100 active:scale-95 transition-all"
                      onClick={() => handleCopy(promptArr[count])}
                      data-tooltip-id="clipboard-tooltip"
                      data-tooltip-content="Copy to clipboard"
                      data-tooltip-place="top"
                    >
                      {copied ? <Check size={20} /> : <Clipboard size={20} />}
                    </button>
                  </div>

                  <div className="bg-gray-100 border-l-4 border-gray-300 border rounded-xl p-4">
                    <Markdown>{promptArr[count]}</Markdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="my-8">
        <p className="sm:text-3xl text-2xl font-bold mb-6">
          How AI Brief Generator works ?
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
            The Best Free AI Brief Generator to Supercharge Your Creative
            Workflow
          </h1>
          <p className="mt-2">
            Discover the top AI brief generator designed for creatives. Generate
            high-quality design briefs instantly and for free. No login
            required.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            Why AI Brief Generators Are Game-Changers
          </h2>
          <p className="mt-2">
            In today’s fast-paced creative world, having a clear and structured
            design brief can make or break a project. Whether you&apos;re a
            freelancer, agency designer, or hobbyist, the ideation phase can be
            mentally taxing. This is where an{" "}
            <strong>AI Brief Generator</strong> steps in to simplify and
            supercharge your creative process.
          </p>
          <p className="mt-2">
            These tools not only reduce the time spent brainstorming, but also
            improve clarity between clients and designers. You&apos;re not starting
            from a blank page — you&apos;re launching from an intelligent starting
            point crafted by a machine that understands industry context.
          </p>
          <p className="mt-2">
            If you&apos;ve ever typed &quot;ai brief generator&quot; or &quot;free ai brief
            generator&quot; into Google, you&apos;re likely seeking a tool that can
            eliminate creative blocks and help you get started instantly. Our{" "}
            <strong>AI Design Brief Generator</strong> does exactly that.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            What Is an AI Brief Generator?
          </h2>
          <p className="mt-2">
            An AI Brief Generator is a smart tool that leverages artificial
            intelligence to create well-structured design briefs based on user
            inputs. These briefs are used for a variety of creative and branding
            needs including:
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
            Unlike traditional templates that offer generic suggestions,
            AI-driven tools analyze context and generate results that are
            specific, relevant, and immediately useful. These tools understand
            how real-world briefs are written and adapt that knowledge for your
            use case.
          </p>
          <p className="mt-2">
            This makes AI brief generators a must-have for fast-paced teams and
            independent creatives alike.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            Meet Our AI Design Brief Generator
          </h2>
          <p className="mt-2">
            Our <strong>AI Design Brief Generator</strong> is built specifically
            for designers who need quick, precise, and insightful briefs. It
            uses advanced AI (powered by Google Gemini) to interpret inputs like
            your chosen design type, industry niche, and preferred aesthetic
            style.
          </p>
          <p className="mt-2">
            Whether you&apos;re building a brand identity or designing for social
            campaigns, this generator understands your intent and delivers
            targeted results.
          </p>
          <h3 className="text-xl font-semibold mt-4">Key Features</h3>
          <ul className="list-disc list-inside mt-2">
            <li>No Login Required – Use it immediately without any sign-up.</li>
            <li>
              Lightning Fast – Generate structured design briefs in under 5
              seconds.
            </li>
            <li>
              Highly Customizable – Tailor inputs with brand names, industries,
              and styles.
            </li>
            <li>
              Ready-to-Copy Output – Seamlessly copy and use in client pitches
              or mockups.
            </li>
            <li>
              Works on All Devices – Fully responsive and mobile-optimized.
            </li>
            <li>Minimal UI – No clutter, just focused design assistance.</li>
          </ul>
          <p className="mt-2">
            It’s like having a creative strategist in your browser — always
            ready to draft the perfect starting point.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">Real-World Examples</h2>
          <p className="mt-2">
            See how various designers have used the AI Brief Generator to
            kickstart their work:
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
            These examples show how flexible the generator is — from corporate
            branding to creative campaigns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            Why Designers Choose Our AI Brief Generator
          </h2>
          <p className="mt-2">
            Designers trust this tool for its simplicity, speed, and
            intelligence. Here&apos;s why it&apos;s a daily driver:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Eliminates blank canvas anxiety</li>
            <li>Provides consistent tone and structure</li>
            <li>Streamlines collaboration with clients</li>
            <li>Useful for both client-facing and internal creative work</li>
          </ul>
          <p className="mt-2">
            Whether you&apos;re a solo freelancer or part of a busy design team, the
            AI Brief Generator supports your workflow without distractions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p className="mt-2">
            Design is all about vision, but execution starts with direction. A
            good brief makes everything smoother. The{" "}
            <strong>AI Brief Generator</strong> gives you that clarity,
            instantly.
          </p>
          <p className="mt-2">
            If you&apos;re ready to work faster, stay inspired, and reduce friction
            between your ideas and output — give it a try. No accounts. No
            limits. Just smart assistance.
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
              your design type, industry, and style. While concise, they&apos;re
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
              Yes, it&apos;s free and doesn’t require login. We simply limit
              overuse to keep it accessible for everyone.
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
