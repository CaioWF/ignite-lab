import { getAccessToken, useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Home() {
  const { user } = useUser()
  return (
    <div>
      <div>Hello World</div>

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <a href="/api/auth/login">Login</a>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const token = getAccessToken(req, res)

  console.log(token);

  return {
    props: {}
  } 
}