import React from "react";
import ApiDoc from "@theme/ApiDoc";
import useSpecData from '@theme/useSpecData';

import "./index.scss";

function CustomPage() {
  const specData = useSpecData("using-custom-page");
  return (
    <ApiDoc
      layoutProps={{
        title: `API`,
        description: "WeKey OpenAPI",
      }}
      specProps={specData}
    />
  );
}

export default CustomPage;
