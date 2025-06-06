import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="sm:mx-28 mx-6">
      <h1 className="md:text-6xl sm:text-5xl text-4xl my-8 font-bold text-center">
        About
      </h1>

      <section className="my-8">
        <p className="text-lg text-justify">
          This <i>Web App</i> was created with one simple goal: to empower
          designers with fast, intelligent, and practical tools that reduce
          creative friction and accelerate the design process. Whether
          you&apos;re crafting a logo, building a brand identity, designing for
          social media, or simply exploring creative directions &mdash; these
          tools are here to support you, instantly and for free.
        </p>
        <p className="text-lg text-justify mt-4">
          We live in a time where design demands are high, deadlines are tight,
          and inspiration can feel elusive. Our platform addresses these
          challenges head-on by providing three core tools that enhance
          creativity, simplify technical tasks, and remove tedious bottlenecks
          from the workflow.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">Why It Exists</h2>
        <ul className="list-disc mt-4 pl-4 ">
          <li>
            Design briefs often take too long to write — now AI does it for you
            in seconds.
          </li>
          <li>
            Finding the perfect font shouldn&apos;t require endless browsing —
            we automate and match it based on intent.
          </li>
          <li>
            Color palettes inspired by real-world images are essential — we make
            it effortless and instant.
          </li>
          <li>
            Many designers lack technical tools — our platform gives them access
            without any cost or complexity.
          </li>
          <li>
            Our mission is to democratize design support, so even beginners can
            create like pros.
          </li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">What&apos;s Included</h2>
        <ul className="list-disc mt-4 pl-4  space-y-4">
          <li>
            <b>Design Brief Generator</b>
            <ul className="list-disc pl-6 mt-2">
              <li>
                Generates structured, professional briefs tailored to your
                design type and industry.
              </li>
              <li>
                Supports 15+ industries and multiple visual styles for a
                tailored result.
              </li>
              <li>
                Instant output with the option to copy, share, or tweak further.
              </li>
              <li>
                No need for creative block — the AI gives you a strong starting
                point.
              </li>
            </ul>
          </li>
          <li>
            <b>Keyword-Based Font Finder</b>
            <ul className="list-disc pl-6 mt-2">
              <li>
                Input a descriptive word and get 20 matching fonts from Google
                Fonts.
              </li>
              <li>
                Preview any text in each font style directly inside the app.
              </li>
              <li>All fonts are free, open source, and web-safe.</li>
              <li>Perfect for branding, headlines, and interface design.</li>
            </ul>
          </li>
          <li>
            <b>Image-Based Color Palette Extractor</b>
            <ul className="list-disc pl-6 mt-2">
              <li>
                Upload an image and extract 10 dominant colors using AI vision.
              </li>
              <li>Preview and copy HEX/RGB values with one click.</li>
              <li>Export palettes as PNG, JSON, or CSS variables.</li>
              <li>
                Ideal for designers working on moodboards, themes, or product
                packaging.
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">
          No Logins. No Paywalls.
        </h2>
        <p className="text-justify mt-4 ">
          Everything is completely free to use — no sign-up required, no
          subscriptions, and no annoying blockers. This is built for designers,
          by someone who understands the hustle of getting creative work done
          faster.
        </p>
        <p className="text-justify mt-4 ">
          We believe in removing friction from the creative process. That’s why
          every tool on this platform is accessible immediately — whether you’re
          a first-time user or a repeat visitor. You won&apos;t see pop-ups,
          login forms, or upgrade prompts here.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">Our Vision</h2>
        <p className=" mt-4 text-justify">
          The future of design is collaborative, AI-assisted, and frictionless.
          Our goal is to build a library of tools that serve as a creative
          assistant — giving you suggestions, automation, and insights without
          taking away creative control.
        </p>
        <p className=" mt-4 text-justify">
          We envision this platform expanding to include more generators,
          real-time preview editors, smart image tools, and workflow
          enhancements that serve freelancers, agencies, students, and startups
          alike.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">Who It&apos;s For</h2>
        <ul className="list-disc pl-4 mt-4 ">
          <li>
            <strong>Graphic Designers</strong> – Save time and ideate faster
            with tools made for your workflow.
          </li>
          <li>
            <strong>Brand Strategists</strong> – Generate briefs and palettes
            that reflect visual identity.
          </li>
          <li>
            <strong>Students & Learners</strong> – Get instant, professional
            outputs to practice and build confidence.
          </li>
          <li>
            <strong>Freelancers & Agencies</strong> – Use the tools for client
            proposals, presentations, and pitching.
          </li>
          <li>
            <strong>Developers & Makers</strong> – Use the color palettes and
            fonts for clean, fast UI prototypes.
          </li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">SEO Benefits</h2>
        <p className=" mt-4 text-justify">
          Design isn’t just about visuals — it impacts SEO and performance too.
          By using well-structured design briefs, optimized font choices, and
          web-friendly colors, your projects can improve accessibility, loading
          times, and overall site quality.
        </p>
        <ul className="list-disc pl-4 mt-4 ">
          <li>Google Fonts load faster and are SEO-friendly.</li>
          <li>Design consistency improves user engagement.</li>
          <li>Lightweight color palettes enhance speed and readability.</li>
          <li>Structured briefs align with project goals and clarity.</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">Future Plans</h2>
        <ul className="list-disc pl-4 mt-4 ">
          <li>
            Adding more design tools like layout generators and image stylizers.
          </li>
          <li>
            Community-requested features and integrations with Figma and
            Webflow.
          </li>
          <li>Saving and sharing tool outputs via links.</li>
          <li>Dark mode and accessibility-first enhancements.</li>
        </ul>
        <p className=" mt-4">
          We’re just getting started. As feedback grows, so will the ecosystem.
          This is not just a tool — it&apos;s a design partner.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">Contact Us</h2>
        <p className="mt-4">
          You can give Feedback or Contact Us by Our Email.
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:Briefox.official@gmail.com"
              className="text-blue-600 underline"
            >
              Briefox.official@gmail.com
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
