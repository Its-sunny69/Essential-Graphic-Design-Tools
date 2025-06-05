// lib/ga.ts
import ReactGA from "react-ga4";

export const GA_MEASUREMENT_ID = "G-XXXXXXX"; // Replace with your ID

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const logPageView = (url: string, title?: string) => {
  ReactGA.send({ hitType: "pageview", page: url, title: title });
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({ category, action, label, value });
};