import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { TableOfContents } from "./TableOfContents";
import { Callout } from "./callout";
import { UnitPagination } from "./unit-pagination";
import { isPaginationDisabled } from "@/utils/pagination-config";
import ContextMenu from "./ContextMenu";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
};

interface MdxProps {
  code: string;
  currentUnit?: number;
  totalUnits?: number;
  slug: string;
}

export function MDXContent({ code, currentUnit, totalUnits, slug }: MdxProps) {
  const Component = useMDXComponent(code);
  const showUnitPagination = !isPaginationDisabled(slug);

  return (
    <div className="relative">
      <ContextMenu/>
      {/* Table of Contents */}
      <TableOfContents code={code} />

      {/* Main Content */}
      <div className="NotesContainer relative">
        <Component  components={components} />
      </div>
      {showUnitPagination && currentUnit && totalUnits ? (
        <UnitPagination
          currentUnit={currentUnit}
          totalUnits={totalUnits}
          slug={slug}
        />
      ) : null}
    </div>
  );
}
