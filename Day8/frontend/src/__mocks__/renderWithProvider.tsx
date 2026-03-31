import { MockLink } from "@apollo/client/testing";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import {MockedProvider} from "@apollo/client/testing/react"


export const renderWithProviders = (ui: React.ReactElement, mocks: MockLink.MockedResponse[] = []) =>
  render(
    <MockedProvider mocks={mocks}>
      <ChakraProvider value={defaultSystem}>
        {ui}
      </ChakraProvider>
    </MockedProvider>,
  );