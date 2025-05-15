"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { PawPrint } from "lucide-react"
import LocationMap from "./location-map"
import { toast } from "sonner"

export function ReportDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className="absolute bottom-5 right-5 z-10 bg-black p-4 rounded-full text-white shadow-lg"
        >
          <PawPrint />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Reportar animal en vía</DrawerTitle>
            <DrawerDescription>Busca la ubicación del avistamiento</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <LocationMap />
          </div>
          <DrawerFooter className="flex gap-2">
            <Button
              onClick={() => {
                toast("Se ha generado el reporte")
                setOpen(false)
              }}
            >
              Reportar
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}