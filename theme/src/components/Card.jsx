import React, { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import ContentAdder from "./ContentAdder";
import axios from "axios";

const Card = () => {
  const [content, setContent] = useState([]);
  const [updateContent, setUpdateContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1); // Initialize the page to 1

  // Fetching content from the server
  const fetchContent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/content?page=${page}`
      );
      setContent(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // useEffect to fetch tasks when the component mounts and when page changes
  useEffect(() => {
    fetchContent();
  }, [page]);

  // Page navigation functions
  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Handling content update
  const handleUpdate = async (id) => {
    if (!updateContent.trim()) {
      console.error("Update content cannot be empty");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/content/${id}`, {
        content: updateContent,
      });
      console.log(`Updated content with id: ${id}`);
      fetchContent(); // Refresh content list after update
      setEditingId(null);
      setUpdateContent("");
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  // Handling content delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/content/${id}`);
      console.log(`Deleted content with id: ${id}`);
      fetchContent(); // Refresh content list after deletion
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <div>
      <ContentAdder onAddContent={fetchContent} />
      <div className="mt-8">
        {content.length === 0 ? (
          <p className="sm:mb-8 sm:flex sm:justify-center my-5 sm:my-5 lg:my-10 flex justify-center align-middle flex-col">
            No Shayaris
          </p>
        ) : (
          content.map((data) => (
            <div
              className="mb-2 sm:flex sm:justify-center my-1 flex justify-center align-middle flex-col"
              key={data._id}
            >
              {editingId === data._id ? (
                <div className="relative px-6 py-3 text-sm leading-6 text-gray-500">
                  <input
                    type="text"
                    value={updateContent}
                    onChange={(e) => setUpdateContent(e.target.value)}
                    className="px-3 py-2 border rounded"
                    placeholder="Update content"
                  />
                  <button
                    onClick={() => handleUpdate(data._id)}
                    className="ml-2 px-4 py-2 text-white bg-blue-500 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setUpdateContent("");
                    }}
                    className="ml-2 px-4 py-2 text-white bg-red-500 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative rounded-full px-6 py-3 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20 text-center">
                    {data.content}
                  </div>
                  <div className="flex ml-6 bottom-3 relative gap-3 text-gray-700">
                    <PencilSquareIcon
                      onClick={() => {
                        setEditingId(data._id);
                        setUpdateContent(data.content);
                      }}
                      className="h-5 cursor-pointer"
                    />
                    <TrashIcon
                      onClick={() => handleDelete(data._id)}
                      className="h-5 cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} className="ml-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
