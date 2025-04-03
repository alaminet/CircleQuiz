"use client";
import { useState } from "react";
import { useLocalStorage } from "@/lib/helper/useLocalStorage";

const Page = () => {
  const [value, setValue] = useState("");

  const { getItem, setItem, removeItem } = useLocalStorage("value");
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        <button onClick={() => setItem(value)}>Set</button>
        <button onClick={() => console.log(getItem())}>Get</button>
        <button onClick={removeItem}>Remove</button>
      </div>
    </div>
  );
};

export default Page;
