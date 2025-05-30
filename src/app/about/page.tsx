export default function Features() {
  return (
    <div className="w-[50%] mx-auto">
      <h1 className="text-6xl my-8 font-bold text-center">About</h1>

      <section className="my-8">
        <p className="text-lg text-justify">
          This <i>Web App</i> was created with one simple goal: to empower
          designers with fast, intelligent, and practical tools that reduce
          creative friction and accelerate the design process. Whether you're
          crafting a logo, building a brand identity, or just looking for visual
          inspiration — these tools are here to support you, instantly and for
          free.
        </p>
      </section>

      <section className="my-8">
        <h1 className="text-4xl font-bold">&#128640; Why It Exists</h1>

        <ul className="list-disc mt-4 pl-4 text-lg">
          <li>
            Design briefs often take too long to write — now AI does it for you.
          </li>
          <li>
            Finding the perfect font shouldn't require endless browsing — we
            automate it.
          </li>
          <li>
            Color palettes from inspiration images are a must — we make it one
            click.
          </li>
        </ul>
      </section>

      <section className="my-8">
        <h1 className="text-4xl font-bold">
          &#128736;&#65039; What's Included
        </h1>

        <ul className="list-disc mt-4 pl-4 text-lg">
          <li>
            <b>AI Design Brief Generator</b>
            <ul>
              <li>
                Generates structured, industry-specific briefs based on your
                input.
              </li>
            </ul>
          </li>
          <li>
            <b>Keyword-Based Font Finder</b>
            <ul>
              <li>
                Suggests beautiful, free-to-use fonts from Google Fonts based on
                any keyword.
              </li>
            </ul>
          </li>
          <li>
            <b>Image-Based Color Palette Extractor</b>
            <ul>
              <li>
                Extracts 10 dominant colors from any image with copy/export
                support.
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="my-8">
        <h1 className="text-4xl font-bold">
          &#x1F4E2; No Logins. No Paywalls.
        </h1>

        <p className="text-justify mt-4 pl-4 text-lg">
          Everything is completely free to use — no sign-up required, no
          subscriptions, and no annoying blockers. This is built for designers,
          by someone who understands the hustle of getting creative work done
          faster.
        </p>
      </section>
    </div>
  );
}
