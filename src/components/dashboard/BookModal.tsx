import {
  Button,
  Dialog,
  VStack,
  Field,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookSchema } from "@/schema/bookSchema";
import { useEffect } from "react";

export type Book = {
  id?: number;
  name: string;
  description: string;
};

type BookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  book?: Book; // if present, modal is in edit mode
  onSubmitAction: (data: Book, id?: number) => Promise<void>;
};

type FormValues = {
  name: string;
  description: string;
};

const BookModal = ({
  isOpen,
  onClose,
  book,
  onSubmitAction,
}: BookModalProps) => {
  const isEditMode = !!book;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(bookSchema),
    mode: "onTouched",
    defaultValues: book || { name: "", description: "" },
  });

  // Reset form when opening modal or when editing a different book
  useEffect(() => {
    reset(book || { name: "", description: "" });
  }, [book, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      // Call the dashboard's onSubmitAction directly
      await onSubmitAction(data, book?.id);

      // Reset and close modal
      reset();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner paddingInline={2}>
        <Dialog.Content style={{ top: "100px" }} padding={5} gap={5}>
          <Dialog.Header>
            <Dialog.Title>
              {isEditMode ? "Edit Book" : "Add New Book"}
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <VStack gap={4} align="stretch">
              {/* Book Name */}
              <Field.Root invalid={!!errors.name}>
                <Field.Label>Book Name</Field.Label>
                <Input
                  placeholder="Enter book name"
                  padding={1}
                  {...register("name")}
                />
                {errors.name && (
                  <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                )}
              </Field.Root>

              {/* Description */}
              <Field.Root invalid={!!errors.description}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  placeholder="Enter book description"
                  padding={1}
                  minHeight={{ base: "4lh", md: "6lh" }}
                  {...register("description")}
                />
                {errors.description && (
                  <Field.ErrorText>
                    {errors.description.message}
                  </Field.ErrorText>
                )}
              </Field.Root>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="outline" paddingInline={2} onClick={onClose}>
              Cancel
            </Button>
            <Button
              paddingInline={2}
              onClick={handleSubmit(onSubmit)}
              loading={isSubmitting}
              colorScheme="blue"
            >
              {isEditMode ? "Save Changes" : "Create Book"}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default BookModal;
