import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Dropform from "./drop-form";

const DropDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1000px] sm:max-h-[900px]">
        <DialogDescription>
          <Dropform onDone={() => setOpen(false)} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DropDialog;
