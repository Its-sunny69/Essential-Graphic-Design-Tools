"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { trackEvent } from "@/lib/ga";

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
    const basePrompt = `Act as a professional brand strategist. Write a short design brief in simple and clear English for a ${
      values.designType
    } in the ${values.industry} industry.
    ${
      values.brandName
        ? `The brand name is "${values.brandName}". Please include this in the brief.`
        : `If the brand name is not provided, invent a suitable one that fits the ${values.industry} industry and has a ${values.stylePreference} style.`
    }

    Format the response strictly in HTML using only these tags: <b>, <p>, and <br>.
    Use <b> for section titles like Industry, Design Type, Color Palette and Font Keywords.
    Use <br> to break lines.
    Use <p> only for the final paragraph.
    Do not use lists or any other tags.

    Follow this exact structure:

    <b>Industry:</b> ${values.industry}<br>
    <b>Design Type:</b> ${values.designType}<br>
    <b>Color Palette (optional – suggest what fits best):</b> [Suggest a suitable color palette]<br><br>

    <p>[Write a short paragraph (max 70 words) in simple English. Clearly describe the design idea, look, tone, and who it is for. Make it easy to understand for non-designers.]</p>

    <b> Font Keywords : </b> [List of keywords describing appropriate fonts for this design]`;

    const text = await sendPrompt(basePrompt);

    if (text) {
      setPromptArr((prev) => {
        const updated = [...prev, text];
        setCount(updated.length - 1); // ✅ point to the new one
        return updated;
      });

      trackEvent("design-Brief", "button-click", "generate-success");
    } else {
      trackEvent("design-brief", "button-click", "limmit-exceed");
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

  return (
    <div className="animate-fade-up">
      <p className="sm:text-4xl text-2xl font-bold text-center">
        Design Smarter.
        <br className="sm:hidden inline" /> Start with an Design Brief
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
            {promptArr.length !== 0 && promptArr[count] && (
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

                  <div
                    className="bg-gray-100 border-l-4 border-gray-300 border rounded-xl p-4"
                    dangerouslySetInnerHTML={{ __html: promptArr[count] }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="my-8">
        <p className="sm:text-3xl text-2xl font-bold mb-6">
          How Design Brief Generator works ?
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
            The Best Free Design Brief Generator to Supercharge Your Creative
            Workflow
          </h1>
          <p className="mt-2">
            Discover the top design brief generator created for modern
            creatives. Generate high-quality project briefs instantly and for
            free. No login required.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            Why Design Brief Generators Are Game-Changers
          </h2>
          <p className="mt-2">
            In today&apos;s fast-paced creative world, having a clear and
            structured design brief can make or break a project. Whether
            you&apos;re a freelancer, agency designer, or hobbyist, the ideation
            phase can be mentally taxing. This is where a{" "}
            <strong>Design Brief Generator</strong>
            steps in to simplify and supercharge your creative process.
          </p>
          <p className="mt-2">
            These tools not only reduce the time spent brainstorming, but also
            improve clarity between clients and designers. You&apos;re not
            starting from a blank page — you&apos;re launching from an
            intelligent starting point crafted by a system that understands
            industry context.
          </p>
          <p className="mt-2">
            If you&apos;ve ever typed &quot;design brief generator&quot; or
            &quot;free design brief generator&quot; into Google, you&apos;re
            likely seeking a tool that can eliminate creative blocks and help
            you get started instantly. Our{" "}
            <strong>Design Brief Generator</strong>
            does exactly that.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            What Is a Design Brief Generator?
          </h2>
          <p className="mt-2">
            A Design Brief Generator is an intelligent tool that leverages
            artificial intelligence to create structured briefs based on user
            inputs. These briefs are useful for a wide range of creative and
            branding needs such as:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Graphic design projects</li>
            <li>Branding &amp; logo design</li>
            <li>Marketing campaigns</li>
            <li>Content planning</li>
            <li>Website layout guidance</li>
            <li>Ad copy or social media creatives</li>
          </ul>
          <p className="mt-2">
            Unlike generic templates, AI-powered generators assess user input
            and deliver results that are relevant, contextual, and immediately
            actionable. These tools understand what makes an effective design
            brief and generate suggestions tailored to each scenario.
          </p>
          <p className="mt-2">
            As a result, Design Brief Generators are essential tools for
            fast-moving teams and solo creatives alike.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            Meet Our Design Brief Generator
          </h2>
          <p className="mt-2">
            Our <strong>Design Brief Generator</strong> is built for creatives
            who need fast, accurate, and professional briefs. It uses
            cutting-edge AI (powered by Google Gemini) to understand your inputs
            — like project type, industry, and style preferences — and turns
            them into powerful briefing text.
          </p>
          <p className="mt-2">
            Whether you&apos;re launching a brand, designing packaging, or
            promoting an event, this generator helps you start with a
            crystal-clear direction.
          </p>
          <h3 className="text-xl font-semibold mt-4">Key Features</h3>
          <ul className="list-disc list-inside mt-2">
            <li>No Login Required – Access instantly without registration.</li>
            <li>Lightning Fast – Generate a high-quality brief in seconds.</li>
            <li>
              Highly Customizable – Input your brand name, select your industry,
              and choose your visual style.
            </li>
            <li>
              Copy-Friendly – Output is easy to copy and use in client documents
              or creative tools.
            </li>
            <li>Responsive – Optimized for mobile and desktop devices.</li>
            <li>
              Minimal Interface – Focused layout that gets the job done without
              distractions.
            </li>
          </ul>
          <p className="mt-2">
            Think of it as your digital creative assistant — always ready to
            deliver a professional brief when you need it most.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">Real-World Examples</h2>
          <p className="mt-2">
            Explore how creatives are using the Design Brief Generator across
            industries:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>Logo for a tech startup</strong>: &quot;Design a modern,
              geometric logo for a cybersecurity company using cool blue and
              silver shades.&quot;
            </li>
            <li>
              <strong>Poster for a college event</strong>: &quot;Create a
              colorful and energetic poster for a university music festival
              aimed at Gen Z audiences.&quot;
            </li>
            <li>
              <strong>Tea packaging design</strong>: &quot;Design an earthy,
              minimal label for organic green tea using natural colors and soft
              typography.&quot;
            </li>
          </ul>
          <p className="mt-2">
            These examples show how versatile the tool is — perfect for
            agencies, solopreneurs, and side projects alike.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">
            Why Designers Love the Design Brief Generator
          </h2>
          <p className="mt-2">
            Creatives love this tool because it delivers clarity without
            compromise. Here&apos;s what sets it apart:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Ends the &quot;blank page&quot; problem</li>
            <li>Provides structured, concise starting points</li>
            <li>Accelerates collaboration and approval cycles</li>
            <li>Adaptable for both personal and commercial work</li>
          </ul>
          <p className="mt-2">
            Whether you&apos;re freelancing or building in-house assets, the
            Design Brief Generator saves time and boosts results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p className="mt-2">
            Clear briefs create better outcomes. The{" "}
            <strong>Design Brief Generator</strong> delivers structure, clarity,
            and direction at the click of a button — helping you focus more on
            creativity and less on planning.
          </p>
          <p className="mt-2">
            Ready to skip the friction and unlock flow? Start using the free
            Design Brief Generator today and take control of your creative
            workflow.
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
