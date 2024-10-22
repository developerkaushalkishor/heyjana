import { Description, Field, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import axios from "axios";

const ContentAdder = ({ onAddContent }) => {
  const [newContent, setNewContent] = useState("");

  const handleAddContent = async () => {
    if (newContent) {
      await axios.post("http://localhost:3000/content", {
        content: newContent,
      });
      setNewContent(""); // to clear the input field
      onAddContent(); // to trigger the parent component's function
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Label className="text-2xl font-medium text-black">
          Add Your Shayari/ Quote Here:
        </Label>
        <Description className=" text-x text-gray-600">
          You can use emojis ❤️🌹✨ and text here.
        </Description>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddContent();
          }}
        >
          <div className="flex justify-center align-middle text-center w-full mt-3 gap-3 my-4">
            <Input
              type="text"
              value={newContent}
              placeholder="Add your Shayari/Quote"
              onChange={(e) => setNewContent(e.target.value)}
              className={clsx(
                "block w-full rounded-lg border border-gray-400 bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
              )}
            />

            <Button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              ADD
            </Button>
          </div>
        </form>
      </Field>
    </div>
  );
};
export default ContentAdder;
