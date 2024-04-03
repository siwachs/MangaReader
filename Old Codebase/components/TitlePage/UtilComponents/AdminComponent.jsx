import { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import DialogComponent from "@/lib/Frontend-utils/DialogComponent";
import {
  deleteAllChapters,
  deleteContentFromFileServer,
} from "@/lib/deletionUtils";

const AdminComponent = ({ content_id, contentTitle }) => {
  const [openDeleteAll, setIsDeleteAllOpen] = useState(false);
  const [openDeleteContent, setOpenDeleteContent] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dialogAcceptButtonTrigger = async () => {
    setIsDeleteAllOpen(false);
    if (loading) return;
    setLoading(true);
    try {
      await deleteAllChapters(content_id, contentTitle);
    } catch (error) {
    } finally {
      setLoading(false);
      router.replace(router.asPath);
    }
  };

  const deleteContentTrigger = async () => {
    try {
      setOpenDeleteContent(false);
      if (loading) return;
      setLoading(true);
      await deleteContentFromFileServer(content_id, contentTitle);
    } catch (error) {
    } finally {
      setLoading(false);
      router.replace("/");
    }
  };

  return (
    <div className="flex items-center gap-x-4 text-sm sm:text-base">
      <Link href={`/admin/upload-content?content_id=${content_id}`}>
        <span className="text-blue-500">Edit Content</span>
      </Link>

      <Link href={`/admin/upload-chapter?content_id=${content_id}`}>
        <span className="text-blue-500">Upload Chapters</span>
      </Link>

      <button onClick={() => setIsDeleteAllOpen(true)} className="text-red-500">
        Delete All
      </button>
      <DialogComponent
        open={openDeleteAll}
        setIsOpen={setIsDeleteAllOpen}
        dialogTitle="Delete All Chapters"
        dialogText="Did you want to delete all chapters?"
        cancelButtonText="Cancel"
        dialogButtonText="Yes"
        acceptButtonMethod={dialogAcceptButtonTrigger}
      />

      <button
        className="text-red-500"
        onClick={() => setOpenDeleteContent(true)}
      >
        Delete
      </button>
      <DialogComponent
        open={openDeleteContent}
        setIsOpen={setOpenDeleteContent}
        dialogTitle="Delete This Content"
        dialogText="Did you want to delete this content?"
        cancelButtonText="Cancel"
        dialogButtonText="Yes"
        acceptButtonMethod={deleteContentTrigger}
      />
    </div>
  );
};

export default AdminComponent;
