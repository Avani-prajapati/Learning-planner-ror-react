import { Flex, Heading, Spacer } from "@chakra-ui/react";
import AddDeveloperDialog from "./AddDeveloperDialog";

type Props = {
  addDeveloper: (dev: any) => void;
};

const Navbar = ({ addDeveloper }: Props) => {
  return (
    <Flex p={4} boxShadow="sm" align="center">
      <Heading size="md">Developer Directory</Heading>

      <Spacer />

      <AddDeveloperDialog addDeveloper={addDeveloper} />
    </Flex>
  );
};

export default Navbar;