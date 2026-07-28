import { SpecificationGroup } from "@/types";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

export interface SpecsTableProps {
  specifications: SpecificationGroup[];
}

export function SpecsTable({ specifications }: SpecsTableProps) {
  if (!specifications || specifications.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <span className="h-2 w-2 bg-[#D71921]" />
        <h3 className="font-mono text-lg font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
          TECHNICAL SPECIFICATIONS
        </h3>
      </div>
      <Accordion>
        {specifications.map((group, idx) => (
          <AccordionItem
            key={group.category || idx}
            id={`spec-${idx}`}
            title={group.category}
            defaultOpen={idx === 0}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex flex-col space-y-1 pb-3 border-b border-neutral-200 dark:border-[#26262A]"
                >
                  <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-bold">
                    {item.name}
                  </span>
                  <span className="font-sans text-xs font-semibold text-neutral-900 dark:text-neutral-200">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
