"use client"

import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { PawPrint } from "lucide-react"
import LocationMap from "./location-map"

export function ReportDialog() {

 
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="absolute bottom-5 right-5 bg-red z-10 bg-black p-4 rounded-full text-white shadow-lg cursor-pointer">
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
          <DrawerFooter>
            <Button>Reportar</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}