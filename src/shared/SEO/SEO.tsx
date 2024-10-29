import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
}

const SEO = ({ title, description, keywords, canonical, robots }: Props) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {robots && <meta name="robots" content={robots} />}
    </Helmet>
  );
};

export default SEO;
