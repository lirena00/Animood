import Nav from "./nav";
import Head from "next/head";
function Wrapper({ children }) {
  return (
    <>
      <Head>
        <meta name="title" content="Animood" />
        <meta
          name="description"
          content="Animood is AI based anime recommendation website which recommends you anime based on your mood, history and overall anime list."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://animood.vercel.app" />
        <meta property="og:title" content="Animood" />
        <meta
          property="og:description"
          content="Animood is AI based anime recommendation website which recommends you anime based on your mood, history and overall anime list."
        />
        <meta property="og:image" content="/animood.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://animood.vercel.app" />
        <meta property="twitter:title" content="Animood" />
        <meta
          property="twitter:description"
          content="Animood is AI based anime recommendation website which recommends you anime based on your mood, history and overall anime list."
        />
        <meta property="twitter:image" content="/animood.jpg" />
        <meta name="theme-color" content="#23A9D5" />
      </Head>

      <Nav />
      <div className="lg:pl-[72px] pb-[72px] pt-12 bg-primary">{children}</div>
    </>
  );
}

export default Wrapper;
