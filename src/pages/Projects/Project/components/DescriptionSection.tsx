"use client";

import Title from "../../../../components/Texts/Title.tsx";
import BlockWrap from "../../../../components/BlockWrap/BlockWrap.tsx";

const DescriptionSection = ({ description }: { description?: string }) => {
  return (
    <BlockWrap>
      <Title text={"Description"} />
      <p className="text-sm text-muted-foreground">{description || "Empty"}</p>
    </BlockWrap>
  );
};

export default DescriptionSection;
