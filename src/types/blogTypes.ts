export type BlogPost = {
  frontmatter: {
    title: string;
    date: string;
    description?: string;
  };
  fields: {
    slug: string;
  };
};

export type DataProps = {
  allMdx: {
    nodes: BlogPost[];
  };
};
