import { useEffect, useRef } from "react";

const useOnUpdateEffect = (func: () => void, ...deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, [deps, func]);
};

export default useOnUpdateEffect;
