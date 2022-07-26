import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import slugify from '../../util/slugify';

const BlogPostList = ({ blogposts }) => (
  <div className="mx-4 mt-4 space-y-4 md:mx-8 md:mt-12">
    {blogposts.map(({ frontmatter }) => (
      <Link
        key={frontmatter.slug}
        to={`/blog/${slugify(frontmatter.slug)}`}
        className="inline-flex  items-center rounded-md ring ring-slate-100 transition-colors hover:bg-red-100 focus:outline-none focus:ring-red-500"
      >
        <div className="flex flex-wrap space-x-3 py-4 md:flex-nowrap">
          <div className="mx-auto p-2">
            <GatsbyImage
              image={frontmatter.titleImage.sharp.gatsbyImageData}
              className="max-w-[250px] rounded"
              alt={frontmatter.titleImageAlt}
            />
          </div>
          <div className="flex flex-col p-2 md:flex-grow">
            <h2 className="title-font mb-2 text-2xl font-medium text-zinc-900 ">
              {frontmatter.title}
            </h2>
            <p className="flex-grow leading-relaxed text-zinc-800 ">
              {frontmatter.description}
            </p>
            <div className="flex items-center">
              <time dateTime={frontmatter.date}>
                {frontmatter.formattedDate}
              </time>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

BlogPostList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blogposts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BlogPostList;
