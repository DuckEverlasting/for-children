import { useEffect } from "react";

const useMountEffect = funct => useEffect(funct, []);

export default useMountEffect;