import React from "react";

import { Header, PageMeta, RedirectLayout } from "../../components/general";

function HomePage() {
  return (
    <div class="layout is-main">
      <PageMeta title="Home" />
      <Header title="Header component" />
      <RedirectLayout
        message="This is RedirectLayout component"
        linkTitle="More components"
        linkTo="/components"
      />
    </div>
  );
}

export default HomePage;
