/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { ArrowUpIcon, RssIcon } from '@heroicons/react/solid';
import slugify from '../util/slugify';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/blog.css';
import getBlogMeta from '../util/getBlogMeta';
import { PostStats } from '../components/blog/PostStats';
import ImageGetter from '../components/ImageGetter';
import BlogTable from '../components/blog/BlogTable';
import BlogBarChart from '../components/blog/BlogBarChart';

const components = {
  // eslint-disable-next-line react/prop-types
  Image: ({ filename, alt }) => <ImageGetter filename={filename} alt={alt} />,
  BlogTable,
  BlogBarChart,
};

export const query = graphql`
  query ($id: String!) {
    content: mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
        formattedDate: date(formatString: "MMMM DD, YYYY")
        description
        titleImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        fixedTitleImage: titleImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED)
          }
        }
        titleImageAlt
        titleImageSource {
          text
          href
        }
      }
      body
      timeToRead
    }
  }
`;

const BlogPostTemplate = ({ data }) => {
  const { content } = data;
  const { body, frontmatter, timeToRead } = content;
  const {
    title,
    date,
    formattedDate,
    description,
    titleImage,
    fixedTitleImage,
    titleImageAlt,
    titleImageSource,
  } = frontmatter;

  const meta = getBlogMeta({
    imgSrc: fixedTitleImage.childImageSharp.gatsbyImageData.images.fallback.src,
    imgAlt: titleImageAlt,
    publishISO: date,
    tags: [],
    imgWidth: fixedTitleImage.childImageSharp.gatsbyImageData.width,
    imgHeight: fixedTitleImage.childImageSharp.gatsbyImageData.height,
  });

  const titleId = slugify(title);

  return (
    <Layout noMarginTop noMarginBottom noMarginSides>
      <SEO title={title} description={description} meta={meta} blog />
      <div className="max-w-screen flex flex-grow overflow-x-auto bg-slate-100">
        <article className="m-auto flex-row-reverse bg-white px-2 pt-4 pb-6 shadow lg:flex lg:px-8 lg:pt-12">
          <div className="flex-grow border-slate-200 lg:w-[330px] lg:max-w-[330px] lg:border-l lg:pl-6">
            <div className="prose prose-slate mb-5 flex h-full flex-col px-2 md:px-4 lg:prose-lg lg:mb-0 lg:px-0">
              <div className="flex-grow text-zinc-700 ">
                <PostStats
                  date={date}
                  formattedDate={formattedDate}
                  timeToRead={timeToRead}
                  tags={[]}
                />
              </div>
              <div className="hidden space-y-5 lg:block">
                <a href="/blog/feed.xml" className="flex items-center">
                  <RssIcon className="mr-3 h-5 w-5" />
                  RSS Feed
                </a>
                <a href={`#${titleId}`} className="flex items-center">
                  <ArrowUpIcon className="mr-3 h-5 w-5" />
                  Back to top
                </a>
              </div>
            </div>
          </div>

          <div className="prose prose-slate px-2 prose-img:rounded-md md:px-4 lg:prose-xl lg:mr-6 lg:px-0">
            <header className="mb-6">
              <h1
                className="scroll-mt-32 font-yrsa text-2xl font-bold tracking-tight text-zinc-900 lg:!text-6xl"
                id={titleId}
              >
                {title}
              </h1>
            </header>
            <main className="">
              <div className="my-4 text-zinc-800 ">{description}</div>
              <GatsbyImage
                image={titleImage.childImageSharp.gatsbyImageData}
                className="max-h-96 object-cover"
                alt={titleImageAlt}
              />
              {titleImageSource.text && titleImageSource.href ? (
                <div className="text-base">
                  <a href={titleImageSource.href} className="text-zinc-500 ">
                    [Source: {titleImageSource.text}]
                  </a>
                </div>
              ) : null}
              <MDXProvider components={components}>
                <MDXRenderer>{body}</MDXRenderer>
              </MDXProvider>
            </main>
          </div>
        </article>
      </div>
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.shape({
      body: PropTypes.string.isRequired,
      timeToRead: PropTypes.number.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        titleImage: PropTypes.object.isRequired,
        fixedTitleImage: PropTypes.object.isRequired,
        titleImageSource: PropTypes.shape({
          text: PropTypes.string,
          href: PropTypes.string,
        }),
        date: PropTypes.string.isRequired,
        formattedDate: PropTypes.string.isRequired,
        titleImageAlt: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        authors: PropTypes.arrayOf(PropTypes.string),
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogPostTemplate;
