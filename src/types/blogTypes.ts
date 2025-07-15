export type BlogPost = {
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    excerpt?: string;
  };
  excerpt?: string;
  fields: {
    slug: string;
    category: string;
  };
};

export type DataProps = {
  allMdx: {
    nodes: BlogPost[];
  };
};
