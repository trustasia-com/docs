import React from "react";
import ApiDoc from "@theme/ApiDoc";
import useSpecData from '@theme/useSpecData';

import "./index.scss";

function CustomPage() {
  const specData = useSpecData("using-custom-page");
  return (
    <ApiDoc
      layoutProps={{
        title: `Custom page for`,
        description: "Example showcasing custom page",
      }}
      specProps={specData}
    />
  );
}

export default CustomPage;
