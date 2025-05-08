"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ClickBuyDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onAddToCart: () => void;
}

export default function ClickBuyDialog({
  open,
  setOpen,
  onAddToCart,
}: ClickBuyDialogProps) {

  const handleConfirm = () => {
    onAddToCart();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Đăng nhập để mua hàng?</DialogTitle>
          <DialogDescription>
            Để tiếp tục mua hàng bạn phải đăng nhập. Bạn có muốn chuyển đến trang đăng nhập không ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
          variant="destructive" 
          className="cursor-pointer"
          onClick={handleConfirm}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}