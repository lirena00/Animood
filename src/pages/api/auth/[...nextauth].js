import NextAuth from "next-auth";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export const authOptions = {
  // Configure one or more authentication providers
  // adapter: MongoDBAdapter(clientPromise),
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    {
      id: "AniListProvider",
      name: "AniList",
      type: "oauth",
      token: "https://anilist.co/api/v2/oauth/token",
      authorization: {
        url: "https://anilist.co/api/v2/oauth/authorize",
        params: { scope: "", response_type: "code" },
      },
      userinfo: {
        url: "https://graphql.anilist.co", // process.env.GRAPHQL_ENDPOINT,
        async request(context) {
            const { data } = await client.query({
              query: gql`
                query {
                  Viewer {
                    id
                    name
                    avatar {
                      large
                      medium
                    }
                    bannerImage
                  }
                }
              `,
              context: {
                headers: {
                  Authorization: "Bearer " + context.tokens.access_token,
                },
              },
            });
            return {
              token: context.tokens.access_token,
              name: data.Viewer.name,
              sub: data.Viewer.id,
              image: data.Viewer.avatar,
            };
        },
        
      },

      
      clientId:process.env.ANILIST_CLIENT_ID,
      clientSecret: process.env.ANILIST_CLIENT_SECRET,
      profile(profile) {
        return {
          token: profile.token,
          id: profile.sub,
          name: profile?.name,
          image: profile.image
        };
      },
    },
  ],
  session: {
    //Sets the session to use JSON Web Token
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);