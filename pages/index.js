import Head from "next/head";
import {
  Center,
  Footer,
  Tag,
  Showcase,
  DisplaySmall,
  DisplayMedium,
} from "../components";
import { titleIfy, slugify } from "../utils/helpers";
import { fetchInventory } from "../utils/inventoryProvider";
import CartLink from "../components/CartLink";
import { getProducts } from "./api/products";

const Home = ({ inventory = [], categories = [] }) => {
  return (
    <>
      <CartLink />
      <div className="w-full">
        <Head>
          <title>MY PARTY PLACE </title>
          <meta
            name="description"
            content="MY PARTY PLACE  Next provides a way to quickly get up and running with a fully configurable ECommerce site using Next.js."
          />
          <meta property="og:title" content="MY PARTY PLACE " key="title" />
        </Head>
        <div
          className="bg-blue-300
        p-6 pb-10 smpb-6
        flex lg:flex-row flex-col"
        >
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
            <Tag year="2023" category="MY PARTY CITY" />
            <Center
              price="10"
              title={inventory[4].name}
              link={`/product/${slugify(inventory[4].name)}`}
            />
            <Footer designer={inventory[4].brand} />
          </div>
          <div className="flex flex-1 justify-center items-center relative">
            <Showcase imageSrc={inventory[4].img_url} />
          </div>
        </div>
      </div>
      <div
        className="
        lg:my-8 lg:grid-cols-2
        grid-cols-1
        grid gap-4 my-4 
      "
      >
        {categories.slice(0, 2).map((category) => {
          return (
            <DisplayMedium
              key={category.name}
              imageSrc={category.img_url}
              subtitle={`${category.itemCount} items`}
              title={titleIfy(category.name)}
              link={`/category/${slugify(category.name)}`}
            />
          );
        })}
      </div>
      <div className="pt-10 pb-6 flex flex-col items-center">
        <h2 className="text-4xl mb-3">Trending Now</h2>
        <p className="text-gray-600 text-sm">
          Find the perfect piece or accessory to finish off your favorite room
          in the house.
        </p>
      </div>
      <div className="my-8 flex flex-col lg:flex-row justify-between">
        {inventory.slice(-4).map((item) => {
          return (
            <DisplaySmall
              key={item.id}
              imageSrc={item.img_url}
              title={item.name}
              subtitle={item.name}
              link={`/product/${slugify(item.name)}`}
            />
          );
        })}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const inventory = await fetchInventory();

  const inventories = await getProducts();
  console.log("this is my inventory", inventories);
  const inventoryCategorized = inventories.reduce((acc, next) => {
    const categories = next.categories.split(",");

    categories.forEach((c) => {
      const index = acc.findIndex((item) => item.name === c);
      if (index !== -1) {
        const item = acc[index];
        item.itemCount = item.itemCount + 1;
        acc[index] = item;
      } else {
        const item = {
          name: c,
          img_url: next.img_url,
          itemCount: 1,
        };
        acc.push(item);
      }
    });
    return acc;
  }, []);

  return {
    props: {
      inventory: inventories,
      categories: inventoryCategorized,
    },
  };
}

export default Home;
