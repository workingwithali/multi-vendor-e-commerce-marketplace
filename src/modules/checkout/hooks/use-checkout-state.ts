import { parseAsBoolean, useQueryStates } from "nuqs";

export const useCheckoutState = () => {
  const [states, setStates] = useQueryStates({
    success: parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
    cancel: parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  });

  return { states, setStates };
};
