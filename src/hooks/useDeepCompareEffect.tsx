import React from "react";
import _ from "lodash";

const useDeepCompareMemoize = (value) => {
  const ref = React.useRef();

  if (!_.isEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
};

export const useDeepEffect = (callback, dependencies) =>
  React.useEffect(callback, useDeepCompareMemoize(dependencies));
