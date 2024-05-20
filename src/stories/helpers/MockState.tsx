import { Provider } from "react-redux";
import { RootState, setupStore } from "../../app/store";

const defaultMockState = {
  gameManager: {
    initialized: false,
  },
};

const MockStore = ({
  preloadedState,
  children,
}: {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}) => {
  const store = setupStore(preloadedState || defaultMockState);
  return <Provider store={store}>{children}</Provider>;
};

export default MockStore;
