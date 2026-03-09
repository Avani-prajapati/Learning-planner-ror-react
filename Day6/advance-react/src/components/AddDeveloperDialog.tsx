import { useState } from "react";
import { Button, Input, VStack, Dialog, Field } from "@chakra-ui/react";

type Props = {
  addDeveloper: (dev: any) => void;
};

const AddDeveloperDialog = ({ addDeveloper }: Props) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button colorScheme="blue">Add Developer</Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>Add Developer</Dialog.Header>

          <Dialog.Body>
            <VStack gap={4}>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Role</Field.Label>
                <Input
                  placeholder="Enter role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </Field.Root>
            </VStack>
          </Dialog.Body>

            <Dialog.CloseTrigger asChild>
          <Dialog.Footer  position="flex-end" gap={3}>
            <Button variant="outline">Cancel</Button>

            <Button
              colorScheme="blue"
              onClick={() => {
                addDeveloper({
                  name,
                  role,
                  skills: ["New Skill"],
                });

                setName("");
                setRole("");
              }}
            >
              Save
            </Button>
          </Dialog.Footer>
            </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default AddDeveloperDialog;
