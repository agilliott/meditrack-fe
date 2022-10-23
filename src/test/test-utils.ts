import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// const AllTheProviders = ({children}) => {
//   return (
//     <ThemeProvider theme="light">
//       <TranslationProvider messages={defaultStrings}>
//         {children}
//       </TranslationProvider>
//     </ThemeProvider>
//   )
// }

const customRender = (ui: React.ReactElement<any>, options = {}) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }) => children, // swap this fn with AllTheProviders when needed
      ...options,
    }),
  };
};

export * from '@testing-library/react';

// override render export

export { customRender as render };
