"use client";

import { User } from "@/lib/generated/prisma/browser";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

export function UserCombobox({
  userlist,
  value,
  onChange,
}: {
  userlist: User[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const selectedUser = userlist.find((u) => u.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedUser ? selectedUser.username : "Pilih Pengguna"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Cari Pengguna..." className="h-9" />
          <CommandList>
            <CommandEmpty>Tidak ada pengguna ditemukan</CommandEmpty>
            <CommandGroup>
              {userlist?.map((u) => (
                <CommandItem
                  key={u.id}
                  value={u.id}
                  onSelect={(currentId) => {
                    const newValue = currentId === value ? "" : currentId;
                    onChange(newValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === u.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {u.username}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
