import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core/";
import EWC_CANVAS from "./partials/EWC_CANVAS";
import EWC_BUTTON from "./partials/EWC_BUTTON";
import EWC_OBJECTS from "./partials/EWC_OBJECTS";

export default () => {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh"
      }}
    >
      <EWC_CANVAS />
      <EWC_BUTTON />
      <EWC_OBJECTS />
    </div>
  );
};
