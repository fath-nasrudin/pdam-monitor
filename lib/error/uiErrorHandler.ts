import { toast } from "sonner";

export function handleUIError(err: unknown) {
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error("Unknown error happened");
  }
}
