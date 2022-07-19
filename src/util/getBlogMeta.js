const siteUrl = 'https://f1report.net';

function getBlogMeta({
  imgSrc,
  imgAlt,
  publishISO,
  tags,
  imgHeight,
  imgWidth,
}) {
  const meta = [
    {
      name: `twitter:image`,
      content: `${siteUrl}${imgSrc}`,
    },
    {
      name: `twitter:image:alt`,
      content: imgAlt,
    },
    {
      name: `og:image`,
      content: `${siteUrl}${imgSrc}`,
    },
    {
      name: `og:image:width`,
      content: imgWidth,
    },
    {
      name: `og:image:height`,
      content: imgHeight,
    },
    {
      name: `og:image:alt`,
      content: imgAlt,
    },
    {
      name: `article:published_time`,
      content: publishISO,
    },
  ];

  tags.forEach((tag) => {
    meta.push({
      name: `article:tag`,
      content: tag,
    });
  });

  return meta;
}

export default getBlogMeta;
