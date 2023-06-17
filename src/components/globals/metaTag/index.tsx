import Head from "next/head";

const MetaTags = ({ data = null, dataConfig }) => {
  return (
    <Head>
      {/* Comment meta */}
      <link rel="canonical" href={data?.OGUrl} />
      <meta property="og:url" content={data?.OGUrl} />
      <meta name="application-name" content={dataConfig?.ApplicationName} />
      <script async src={dataConfig?.GoogleAnalytics}></script>
      {/* <meta name="google-analytics" content={dataConfig?.GoogleAnalytics} /> */}
      <meta
        name="google-site-verification"
        content={dataConfig?.GoogleSiteVerification}
      />
      <meta name="og:email" content={dataConfig?.EmailContact} />
      <meta name="og:phone_number" content={dataConfig?.Hotline} />
      <meta name="robots" content="index,follow" />
      <meta property="og:locale" content={"vi_VN"} />
      <meta property="og:site_name" content={dataConfig?.OGSiteName} />
      <meta property="og:type" content="website" />

      {/* specific meta */}
      <meta
        name="keywords"
        content={data?.MetaKeyword ?? dataConfig?.MetaKeyword}
      />
      <meta name="og:title" content={data?.OGTitle ?? dataConfig?.OGTitle} />
      <meta
        name="reply-to"
        content={data?.EmailContact ?? dataConfig?.EmailContact}
      />
      <meta
        name="description"
        content={data?.MetaDescription ?? dataConfig?.MetaDescription}
      />
      <meta
        property="og:description"
        content={data?.OGDescription ?? dataConfig?.OGDescription}
      />
    </Head>
  );
};

export default MetaTags;
