// "use client";
// import React, { useState, useEffect } from "react";

// function AdDetection({ children }: { children: React.ReactNode }) {
//   const [isChecked, setIsChecked] = useState(false);
//   const [isBlockedBrowser, setIsBlockedBrowser] = useState(false);
//   const [isAdBlockerDetected, setIsAdBlockerDetected] = useState(false);

//   useEffect(() => {
//     async function detectBrowserAndAdBlocker() {
//       //Browser detection
//       const isOpera =
//         (!!(window as any).opr && !!(window as any).opr.addons) ||
//         !!(window as any).opera ||
//         navigator.userAgent.indexOf(" OPR/") >= 0;

//       let isBrave = false;
//       if (
//         (navigator as any).brave &&
//         typeof (navigator as any).brave.isBrave === "function"
//       ) {
//         isBrave = await (navigator as any).brave.isBrave();
//       }

//       if (isOpera || isBrave) {
//         setIsBlockedBrowser(true);
//       }

//       // AdBlocker detection
//       const script = document.createElement("script");
//       script.src =
//         "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
//       script.onerror = () => {
//         setIsAdBlockerDetected(true);
//         setIsChecked(true);
//       };
//       script.onload = () => {
//         setIsAdBlockerDetected(false);
//         setIsChecked(true);
//       };
//       document.body.appendChild(script);
//     }

//     detectBrowserAndAdBlocker();
//   }, []);

//   if (!isChecked) return null;

//   if (isBlockedBrowser)
//     return (
//       <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-red-600">
//             Unsupported Browser
//           </h1>
//           <p>This website is not accessible on Brave or Opera browsers.</p>
//           <p className="font-semibold">Recommended Browser: Google Chrome.</p>
//         </div>
//       </div>
//     );

//   if (isAdBlockerDetected)
//     return (
//       <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-red-600">AdBlock Detected</h1>
//           <p>Please disable your AdBlocker to access this site.</p>
//         </div>
//       </div>
//     );

//   return <>{children}</>;
// }

// export default AdDetection;
