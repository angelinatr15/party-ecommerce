import Head from "next/head";
import ListItem from "../../components/ListItem";
import { titleIfy, slugify } from "../../utils/helpers";
import fetchCategories from "../../utils/categoryProvider";
import CartLink from "../../components/CartLink";
import { getProducts, getProductsByCategory } from "../api/products";

const Category = (props) => {
  const { inventory, title } = props;
  return (
    <>
      <CartLink />
      <Head>
        <title>MY PARTY PLACE - {title}</title>
        <meta name="description" content={`MY PARTY PLACE  - ${title}`} />
        <meta
          property="og:title"
          content={`MY PARTY PLACE - ${title}`}
          key="title"
        />
      </Head>
      <div className="flex flex-col items-center">
        <div className="max-w-fw flex flex-col w-full">
          <div className="pt-4 sm:pt-10 pb-8">
            <h1 className="text-5xl font-light">{titleIfy(title)}</h1>
          </div>

          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {inventory.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    link={`/product/${slugify(item.name)}`}
                    title={item.name}
                    price={item.price}
                    imageSrc={item.img_url}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const inventory = await getProducts();
  const categories = await fetchCategories(inventory);
  const paths = categories.map((category) => {
    return { params: { name: slugify(category) } };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const category = params.name.replace(/-/g, " ");
  const inventory = await getProductsByCategory(category);

  return {
    props: {
      inventory,
      title: category,
    },
    revalidate: 10,
  };
}

export default Category;
