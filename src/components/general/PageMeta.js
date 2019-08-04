import React from "react";
import { Helmet } from "react-helmet";

const siteName = "Tetris";

const ogProperties = ["site_name", "title", "description", "image", "url"];

function PageMeta(metaProps) {
  const meta = {
    ...metaProps,
    site_name: siteName
  };

  function titleTag() {
    if (meta.title) {
      return (
        <title>
          {meta.title} | {siteName}
        </title>
      );
    } else {
      return null;
    }
  }

  function descriptionTag() {
    if (meta.description) {
      return <meta name="description" content={meta.description} />;
    } else {
      return null;
    }
  }

  function ogTags() {
    return ogProperties.map((property, index) => {
      if (meta[property]) {
        return (
          <meta
            key={index}
            property={"og:" + property}
            content={meta[property]}
          />
        );
      } else {
        return null;
      }
    });
  }

  return (
    <Helmet>
      {titleTag()}
      {descriptionTag()}
      {ogTags()}
    </Helmet>
  );
}

export default PageMeta;
