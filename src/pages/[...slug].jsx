import NavBar from "@/features/nav-bar/nav-bar-component";
import { createClient } from "@/utils/contentful";

export const getStaticPaths = async () => {
  const client = createClient();

  const res = await client.getEntries({
    content_type: "landingPage",
  });

  const paths = res.items
    .filter((item) => item.fields.slug && item.fields.slug !== "home")
    .map((item) => {
      const slugParts = item.fields.slug.split("/");
      const params = { slug: slugParts };

      return {
        params,
      };
    });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const client = createClient();

  const slug = params?.slug.join("/");
  const page = await client.getEntries({
    content_type: "landingPage",
    "fields.slug": slug,
  });
  console.log(page.items);
  return {
    props: {
      landingPageResponse: page.items[0],
    },
    revalidate: 1,
  };
};

export default function LandingPage({ landingPageResponse }) {
  console.log({ landingPageResponse });
  const hasNavBar = landingPageResponse?.fields?.container;

  return (
    <div>
      {hasNavBar && (
        <NavBar
          slug={landingPageResponse.fields.slug}
          links={landingPageResponse.fields.container[0].fields.links}
        />
      )}
      <h1>{landingPageResponse.fields.heading}</h1>
    </div>
  );
}
// navBar;
