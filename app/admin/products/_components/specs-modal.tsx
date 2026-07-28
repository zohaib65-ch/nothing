"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SpecificationGroup } from "@/types";

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  specifications: SpecificationGroup[];
  onSave: (specs: SpecificationGroup[]) => void;
}

interface SpecsState {
  colours: string;
  capacity: string;
  height: string;
  width: string;
  depth: string;
  weight: string;
  processorName: string;
  processorSpeed: string;
  rearCamera: string;
  frontCamera: string;
  screenSize: string;
  screenResolution: string;
  screenRefresh: string;
  batteryCapacity: string;
  chargingSpecs: string;
  multimediaFormats: string;
  audioFeatures: string;
  designMaterials: string;
  designIpRating: string;
  otherFeaturesTech: string;
  osVersion: string;
  sustainabilityDetails: string;
  inTheBoxContents: string;
}

function parseSpecifications(specs: SpecificationGroup[]): SpecsState {
  const findItem = (category: string, itemName: string) => {
    const group = specs.find((g) => g.category?.toLowerCase() === category.toLowerCase());
    return group?.items?.find((i) => i.name?.toLowerCase() === itemName.toLowerCase())?.value || "";
  };

  const findFirstValue = (category: string) => {
    const group = specs.find((g) => g.category?.toLowerCase() === category.toLowerCase());
    return group?.items?.[0]?.value || "";
  };

  return {
    colours: findItem("Colours & capacity", "Colours") || findFirstValue("Colours & capacity"),
    capacity: findItem("Colours & capacity", "Capacity"),
    height: findItem("Dimensions", "Height") || findFirstValue("Dimensions"),
    width: findItem("Dimensions", "Width"),
    depth: findItem("Dimensions", "Depth"),
    weight: findItem("Dimensions", "Weight"),
    processorName: findItem("Processor", "Processor") || findFirstValue("Processor"),
    processorSpeed: findItem("Processor", "Speed/Cores"),
    rearCamera: findItem("Camera", "Rear Camera") || findFirstValue("Camera"),
    frontCamera: findItem("Camera", "Front Camera"),
    screenSize: findItem("Display", "Screen Size") || findFirstValue("Display"),
    screenResolution: findItem("Display", "Resolution & Type"),
    screenRefresh: findItem("Display", "Refresh Rate"),
    batteryCapacity: findItem("Battery & charging", "Battery Capacity") || findFirstValue("Battery & charging"),
    chargingSpecs: findItem("Battery & charging", "Charging Specs"),
    multimediaFormats: findItem("Multimedia", "Video/Audio Formats") || findFirstValue("Multimedia"),
    audioFeatures: findItem("Audio", "Audio Features") || findFirstValue("Audio"),
    designMaterials: findItem("Design", "Materials") || findFirstValue("Design"),
    designIpRating: findItem("Design", "IP Rating"),
    otherFeaturesTech: findItem("Other features", "Sensors & Tech") || findFirstValue("Other features"),
    osVersion: findItem("Operating system", "Operating System") || findFirstValue("Operating system"),
    sustainabilityDetails: findItem("Sustainability", "Eco Details") || findFirstValue("Sustainability"),
    inTheBoxContents: findItem("In the box", "Package Contents") || findFirstValue("In the box"),
  };
}

function buildSpecifications(state: SpecsState): SpecificationGroup[] {
  const groups: SpecificationGroup[] = [];

  // Colours & capacity
  if (state.colours || state.capacity) {
    const items = [];
    if (state.colours) items.push({ name: "Colours", value: state.colours });
    if (state.capacity) items.push({ name: "Capacity", value: state.capacity });
    groups.push({ category: "Colours & capacity", items });
  }

  // Dimensions
  if (state.height || state.width || state.depth || state.weight) {
    const items = [];
    if (state.height) items.push({ name: "Height", value: state.height });
    if (state.width) items.push({ name: "Width", value: state.width });
    if (state.depth) items.push({ name: "Depth", value: state.depth });
    if (state.weight) items.push({ name: "Weight", value: state.weight });
    groups.push({ category: "Dimensions", items });
  }

  // Processor
  if (state.processorName || state.processorSpeed) {
    const items = [];
    if (state.processorName) items.push({ name: "Processor", value: state.processorName });
    if (state.processorSpeed) items.push({ name: "Speed/Cores", value: state.processorSpeed });
    groups.push({ category: "Processor", items });
  }

  // Camera
  if (state.rearCamera || state.frontCamera) {
    const items = [];
    if (state.rearCamera) items.push({ name: "Rear Camera", value: state.rearCamera });
    if (state.frontCamera) items.push({ name: "Front Camera", value: state.frontCamera });
    groups.push({ category: "Camera", items });
  }

  // Display
  if (state.screenSize || state.screenResolution || state.screenRefresh) {
    const items = [];
    if (state.screenSize) items.push({ name: "Screen Size", value: state.screenSize });
    if (state.screenResolution) items.push({ name: "Resolution & Type", value: state.screenResolution });
    if (state.screenRefresh) items.push({ name: "Refresh Rate", value: state.screenRefresh });
    groups.push({ category: "Display", items });
  }

  // Battery & charging
  if (state.batteryCapacity || state.chargingSpecs) {
    const items = [];
    if (state.batteryCapacity) items.push({ name: "Battery Capacity", value: state.batteryCapacity });
    if (state.chargingSpecs) items.push({ name: "Charging Specs", value: state.chargingSpecs });
    groups.push({ category: "Battery & charging", items });
  }

  // Multimedia
  if (state.multimediaFormats) {
    groups.push({
      category: "Multimedia",
      items: [{ name: "Video/Audio Formats", value: state.multimediaFormats }],
    });
  }

  // Audio
  if (state.audioFeatures) {
    groups.push({
      category: "Audio",
      items: [{ name: "Audio Features", value: state.audioFeatures }],
    });
  }

  // Design
  if (state.designMaterials || state.designIpRating) {
    const items = [];
    if (state.designMaterials) items.push({ name: "Materials", value: state.designMaterials });
    if (state.designIpRating) items.push({ name: "IP Rating", value: state.designIpRating });
    groups.push({ category: "Design", items });
  }

  // Other features
  if (state.otherFeaturesTech) {
    groups.push({
      category: "Other features",
      items: [{ name: "Sensors & Tech", value: state.otherFeaturesTech }],
    });
  }

  // Operating system
  if (state.osVersion) {
    groups.push({
      category: "Operating system",
      items: [{ name: "Operating System", value: state.osVersion }],
    });
  }

  // Sustainability
  if (state.sustainabilityDetails) {
    groups.push({
      category: "Sustainability",
      items: [{ name: "Eco Details", value: state.sustainabilityDetails }],
    });
  }

  // In the box
  if (state.inTheBoxContents) {
    groups.push({
      category: "In the box",
      items: [{ name: "Package Contents", value: state.inTheBoxContents }],
    });
  }

  return groups;
}

export function SpecsModal({ isOpen, onClose, specifications, onSave }: SpecsModalProps) {
  const [state, setState] = React.useState<SpecsState>({
    colours: "",
    capacity: "",
    height: "",
    width: "",
    depth: "",
    weight: "",
    processorName: "",
    processorSpeed: "",
    rearCamera: "",
    frontCamera: "",
    screenSize: "",
    screenResolution: "",
    screenRefresh: "",
    batteryCapacity: "",
    chargingSpecs: "",
    multimediaFormats: "",
    audioFeatures: "",
    designMaterials: "",
    designIpRating: "",
    otherFeaturesTech: "",
    osVersion: "",
    sustainabilityDetails: "",
    inTheBoxContents: "",
  });

  React.useEffect(() => {
    if (isOpen) {
      setState(parseSpecifications(specifications));
    }
  }, [isOpen, specifications]);

  const handleSave = () => {
    const updated = buildSpecifications(state);
    onSave(updated);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Product Technical Specifications"
      subtitle="Input specific details for each hardware specification category"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 max-h-[60vh] overflow-y-auto pr-3 font-mono text-xs">
          {/* Colours & capacity */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              1) Colours & Capacity
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Colours"
                value={state.colours}
                onChange={(e) => setState((prev) => ({ ...prev, colours: e.target.value }))}
                placeholder="e.g. Dark Grey, Milk"
              />
              <Input
                label="Capacity (RAM / Storage)"
                value={state.capacity}
                onChange={(e) => setState((prev) => ({ ...prev, capacity: e.target.value }))}
                placeholder="e.g. 8GB+128GB, 12GB+256GB"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              2) Dimensions
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Input
                label="Height"
                value={state.height}
                onChange={(e) => setState((prev) => ({ ...prev, height: e.target.value }))}
                placeholder="e.g. 163.9 mm"
              />
              <Input
                label="Width"
                value={state.width}
                onChange={(e) => setState((prev) => ({ ...prev, width: e.target.value }))}
                placeholder="e.g. 77.5 mm"
              />
              <Input
                label="Depth"
                value={state.depth}
                onChange={(e) => setState((prev) => ({ ...prev, depth: e.target.value }))}
                placeholder="e.g. 8.5 mm"
              />
              <Input
                label="Weight"
                value={state.weight}
                onChange={(e) => setState((prev) => ({ ...prev, weight: e.target.value }))}
                placeholder="e.g. 205 g"
              />
            </div>
          </div>

          {/* Processor */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              3) Processor
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Processor Model"
                value={state.processorName}
                onChange={(e) => setState((prev) => ({ ...prev, processorName: e.target.value }))}
                placeholder="e.g. Mediatek Dimensity 7200 Pro"
              />
              <Input
                label="Cores / Speed"
                value={state.processorSpeed}
                onChange={(e) => setState((prev) => ({ ...prev, processorSpeed: e.target.value }))}
                placeholder="e.g. Octa-core 2.8 GHz"
              />
            </div>
          </div>

          {/* Camera */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              4) Camera
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Rear Camera specs"
                value={state.rearCamera}
                onChange={(e) => setState((prev) => ({ ...prev, rearCamera: e.target.value }))}
                placeholder="e.g. 50 MP Main + 50 MP Ultra-wide"
              />
              <Input
                label="Front Camera specs"
                value={state.frontCamera}
                onChange={(e) => setState((prev) => ({ ...prev, frontCamera: e.target.value }))}
                placeholder="e.g. 32 MP"
              />
            </div>
          </div>

          {/* Display */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              5) Display
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Screen Size"
                value={state.screenSize}
                onChange={(e) => setState((prev) => ({ ...prev, screenSize: e.target.value }))}
                placeholder="e.g. 6.7 in"
              />
              <Input
                label="Resolution & Type"
                value={state.screenResolution}
                onChange={(e) => setState((prev) => ({ ...prev, screenResolution: e.target.value }))}
                placeholder="e.g. 1084 x 2412 px, AMOLED"
              />
              <Input
                label="Refresh Rate"
                value={state.screenRefresh}
                onChange={(e) => setState((prev) => ({ ...prev, screenRefresh: e.target.value }))}
                placeholder="e.g. 120 Hz"
              />
            </div>
          </div>

          {/* Battery & charging */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              6) Battery & Charging
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Battery Capacity"
                value={state.batteryCapacity}
                onChange={(e) => setState((prev) => ({ ...prev, batteryCapacity: e.target.value }))}
                placeholder="e.g. 5000 mAh"
              />
              <Input
                label="Charging Speed/Specs"
                value={state.chargingSpecs}
                onChange={(e) => setState((prev) => ({ ...prev, chargingSpecs: e.target.value }))}
                placeholder="e.g. 45W Fast Charging"
              />
            </div>
          </div>

          {/* Multimedia */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              7) Multimedia
            </h4>
            <Textarea
              label="Supported Formats"
              value={state.multimediaFormats}
              onChange={(e) => setState((prev) => ({ ...prev, multimediaFormats: e.target.value }))}
              placeholder="e.g. MP4, MKV, MP3, FLAC"
            />
          </div>

          {/* Audio */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              8) Audio
            </h4>
            <Input
              label="Audio Hardware Details"
              value={state.audioFeatures}
              onChange={(e) => setState((prev) => ({ ...prev, audioFeatures: e.target.value }))}
              placeholder="e.g. Dual Stereo Speakers, 3 Mics"
            />
          </div>

          {/* Design */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              9) Design
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Materials Used"
                value={state.designMaterials}
                onChange={(e) => setState((prev) => ({ ...prev, designMaterials: e.target.value }))}
                placeholder="e.g. Transparent back, aluminum body"
              />
              <Input
                label="IP Rating / Protection"
                value={state.designIpRating}
                onChange={(e) => setState((prev) => ({ ...prev, designIpRating: e.target.value }))}
                placeholder="e.g. IP54 water & dust resistance"
              />
            </div>
          </div>

          {/* Other features */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              10) Other Features
            </h4>
            <Textarea
              label="Sensors, NFC, Tech"
              value={state.otherFeaturesTech}
              onChange={(e) => setState((prev) => ({ ...prev, otherFeaturesTech: e.target.value }))}
              placeholder="e.g. Under-screen fingerprint, NFC enabled, Gyroscope"
            />
          </div>

          {/* Operating system */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              11) Operating System
            </h4>
            <Input
              label="OS version & details"
              value={state.osVersion}
              onChange={(e) => setState((prev) => ({ ...prev, osVersion: e.target.value }))}
              placeholder="e.g. Nothing OS 2.5 (based on Android 14)"
            />
          </div>

          {/* Sustainability */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              12) Sustainability
            </h4>
            <Textarea
              label="Eco / Recycled materials details"
              value={state.sustainabilityDetails}
              onChange={(e) => setState((prev) => ({ ...prev, sustainabilityDetails: e.target.value }))}
              placeholder="e.g. 100% recycled aluminum frame, carbon footprint report"
            />
          </div>

          {/* In the box */}
          <div className="border border-neutral-100 dark:border-[#26262A] rounded p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-[#D71921] uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-[#26262A] pb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              13) In the Box
            </h4>
            <Textarea
              label="Package contents"
              value={state.inTheBoxContents}
              onChange={(e) => setState((prev) => ({ ...prev, inTheBoxContents: e.target.value }))}
              placeholder="e.g. Nothing Phone (2a), USB-C cable, SIM ejector"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-[#26262A]">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="red" size="sm" onClick={handleSave}>
            Save Specifications
          </Button>
        </div>
      </div>
    </Modal>
  );
}
