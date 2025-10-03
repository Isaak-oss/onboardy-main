"use client";

import { useState } from "react";
import CustomInput from "../../../components/CustomFields/CustomInput/CustomInput.tsx";
import { isValidUrl } from "../../../services/isValid.ts";
import CustomBtn from "../../../components/CustomBtn/CustomBtn.tsx";
import {useRouter} from "next/navigation";

const Access = () => {
  const router = useRouter();

  const [url, setUrl] = useState("");

  return (
    <section className="overflow-hidden flex flex-col bg-gray-300 p-10 flex-1">
      <div className="flex items-end justify-between gap-[15px]">
        <CustomInput
          label={"Url"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          containerProps={{ className: "w-[200px]" }}
        />
        <CustomBtn title={"If you finish with your authorization, click here :)"} className="w-auto" onClick={() => router.push("dashboard")}/>
      </div>
      {!url ? (
        <h2 className="text-center text-2xl/9 font-bold tracking-tight mt-5">
          Fill in the URL field after which your WEB-app/WEB-site will be displayed here
        </h2>
      ) : !isValidUrl(url) ? (
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-red-500 mt-5">
          Url not valid
        </h2>
      ) : (
        <iframe
          src={url || ""}
          width={"100%"}
          height={"100%"}
          style={{ flex: 1 }}
          sandbox="allow-scripts allow-same-origin"
          className={"w-[100%] h-[100%] relative border-black border-2 mt-5"}
        />
      )}
    </section>
  );
};

export default Access;
