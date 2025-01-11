import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
function MyApp({ Component, pageProps = {} }) {
  const { session, ...rest } = pageProps;

  if (!Component) {
    // Add a fallback in case Component is not passed correctly
    return <div>Error: Component not found!</div>;
  }

  return (
    <SessionProvider session={session}>
      <Component {...rest} />
    </SessionProvider>
  );
}

export default MyApp;
