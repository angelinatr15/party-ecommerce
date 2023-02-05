import "../styles/globals.css";
import Layout from "../layouts/layout";
import fetchCategories from "../utils/categoryProvider";
import useSWR from "swr";

function Ecommerce({ Component, pageProps }) {
  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const { data: inventory } = useSWR("/api/products", fetcher);
  const categories = fetchCategories(inventory);
  return (
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default Ecommerce;
