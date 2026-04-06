const PUBLIC_TO_MEMBER_STATIC_PATHS: Record<string, string> = {
  "/screens/public/feed": "/screens/member/feed",
  "/screens/public/stay": "/screens/member/stay",
  "/screens/public/rideshare": "/screens/member/rideshare",
};

export function mapPublicPathToMemberPath(publicPath: string): string {
  if (publicPath.startsWith("/screens/public/listing/")) {
    return publicPath.replace("/screens/public/listing/", "/screens/member/listing/");
  }

  return PUBLIC_TO_MEMBER_STATIC_PATHS[publicPath] ?? "/screens/member/feed";
}
