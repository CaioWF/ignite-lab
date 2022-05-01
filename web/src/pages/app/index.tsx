import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useGetProductsQuery } from "../../graphql/generated/graphql";
import { getServerPageGetProducts, ssrGetProducts, useGetMe } from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
  const { user } = useUser();
  const { data: me } = useGetMe()
  // const { data, loading, error } = useGetProductsQuery();

  return (
    <div className="text-violet-500">
      <h1>Hi, user!</h1>
      <pre>
        {JSON.stringify(me, null, 2)}
      </pre>
      <pre>
        {/* {JSON.stringify(data.products, null, 2)} */}
      </pre>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {}
    }
  }
});

export default withApollo(ssrGetProducts.withPage()(Home))