"use client";

interface AdBannerProps {
  scriptSrc: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSocialBannner({
  scriptSrc,
  className = "",
  style = {},
}: AdBannerProps) {
  return (
    <div className={className} style={style}>
      <script
        type="text/javascript"
        src={scriptSrc}
        async
        data-cfasync="false"
      ></script>
    </div>
  );
}
