import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div className="sm:mx-28 mx-6">
      <h1 className="md:text-6xl sm:text-5xl text-4xl my-8 font-bold text-center">
        Privacy Policy
      </h1>

      <section className="my-8">
        <p className="text-gray-600">Effective Date: June 2025</p>
        <p className="text-lg text-justify">
          Welcome to <strong>Briefox.com</strong> — a suite of AI-powered design
          tools to help creatives move faster. This Privacy Policy explains how
          we collect, use, and safeguard your information when you use our web
          application.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">
          1. Information We Collect
        </h2>
        <ul className="list-disc mt-4 pl-4">
          <li>
            <strong>Public IP Address:</strong> Used solely for rate-limiting
            and abuse-prevention purposes. Automatically purged after 24 hours.
          </li>
          <li>
            <strong>Form Inputs & Image Uploads:</strong> Input from users
            (e.g., keywords, prompts, images) is processed temporarily and never
            stored permanently.
          </li>
          <li>
            <strong>Device Information:</strong> Basic data such as screen size
            or browser type may be collected for responsive UI.
          </li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">
          2. How We Use Your Data
        </h2>
        <p className="mt-4">We use your data to:</p>
        <ul className="list-disc pl-4">
          <li>Generate design briefs and font recommendations using AI</li>
          <li>Enforce request limits (to prevent spam and overuse)</li>
          <li>Improve user experience and app performance</li>
        </ul>
        <p className="mt-2">
          We do <strong>not</strong> sell or share your data with third-party
          marketers.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">
          3. Cookies & Tracking
        </h2>
        <p className=" mb-2">
          We use essential cookies for app functionality only. We do not track
          your activity or use invasive cookies.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">
          4. Advertising Disclosure
        </h2>
        <p className="">
          We display ads through trusted ad networks like{" "}
          <strong>Google AdSense</strong> and <strong>Adsterra</strong>. These
          networks may use cookies or tracking scripts to display relevant ads.
        </p>
        <p className="mt-2 ">
          You can manage your ad preferences and learn how Google uses your data
          in their{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            className="text-blue-600 underline"
          >
            advertising policy
          </a>
          .
        </p>
        <p className="mt-2 ">
          Third-party vendors may collect anonymized usage data.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">5. Data Retention</h2>
        <p className="">
          All Public IP logs are deleted within 24 hours. Uploaded images and
          text prompts are not stored after processing. We retain no user
          accounts or personally identifiable data.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">
          6. Third-Party Services
        </h2>
        <p className="mt-4">We use:</p>
        <ul className="list-disc pl-4">
          <li>
            <strong>Google Fonts API</strong> – To load font previews
          </li>
          <li>
            <strong>Google Gemini AI</strong> – For generating prompts
          </li>
          <li>
            <strong>AdSense / Adsterra</strong> – For monetization through ads
          </li>
        </ul>
        <p className="mt-2 ">
          These services may process limited technical information (e.g. Public
          IP, device type) as per their policies.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">
          7. Children’s Privacy
        </h2>
        <p className="">
          Our platform is not intended for children under 13. We do not
          knowingly collect data from minors.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">8. Your Rights</h2>
        <p className="">
          You have the right to request removal of any stored Public IP data,
          object to advertising personalization, and request details about the
          data collected. Contact us at:{" "}
          <a
            href="mailto:Briefox.official@gmail.com"
            className="text-blue-600 underline"
          >
            Briefox.official@gmail.com
          </a>
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">
          9. Changes to This Policy
        </h2>
        <p className="">
          We may update this privacy policy as needed. Any changes will be
          reflected on this page with a revised effective date.
        </p>
      </section>

      <section className="my-8">
        <h2 className="sm:text-3xl text-2xl font-bold">10. Contact</h2>
        <p className="mt-4">
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <ul className="list-disc pl-4">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:Briefox.official@gmail.com"
              className="text-blue-600 underline"
            >
              Briefox.official@gmail.com
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a
              href="https://www.briefox.com"
              className="text-blue-600 underline"
              target="_blank"
            >
              www.briefox.com
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
