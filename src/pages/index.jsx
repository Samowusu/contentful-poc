import Image from "next/image";
import { Inter } from "next/font/google";
import { createClient } from "@/utils/contentful";
import NavBar from "@/features/nav-bar/nav-bar-component";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ homePage }) {
  console.log({ homePage });
  // console.log(homePage.fields.navigation.fields);
  return (
    <div>
      <h1>{homePage.fields.heading}</h1>
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient();

  const res = await client.getEntries({
    content_type: "landingPage",
    "fields.slug": "home",
  });
  return {
    props: {
      homePage: res.items[0],
    },
    revalidate: 1,
  };
}
