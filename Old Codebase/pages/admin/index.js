import { useState } from "react";

import Link from "next/link";

import ListWrapper from "@/components/Wrappers/ListWrapper";

import { Person, FileUpload, AddCircle } from "@mui/icons-material";

import { signOut } from "next-auth/react";

import UploadGenre from "@/components/AdminComponents/UploadGenre";
import { AdminPageProps } from "@/CONSTANT_DATA";

const Admin = () => {
  const [uploadGenre, setUploadGenre] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--bg-profile)] dark:bg-gray-900">
      <ListWrapper changeMaxwidth="max-w-[800px]">
        <Link href="/admin/upload-content">
          <div className="admin-card">
            <FileUpload fontSize="large" />
            <h3 className="mt-2 text-lg font-bold">Upload Content</h3>
          </div>
        </Link>

        {!uploadGenre ? (
          <div className="admin-card" onClick={() => setUploadGenre(true)}>
            <AddCircle fontSize="large" />
            <h3 className="mt-2 text-lg font-bold">Add new genre</h3>
          </div>
        ) : (
          <UploadGenre
            uploadGenre={uploadGenre}
            setUploadGenre={setUploadGenre}
          />
        )}

        <div className="admin-card">
          <Person fontSize="large" />
          <h3 className="mt-2 text-lg font-bold">Manage Users</h3>
        </div>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className="mx-auto block text-orange-400 lg:text-lg"
        >
          Sign Out
        </button>
      </ListWrapper>
    </main>
  );
};

export function getStaticProps() {
  return {
    props: { ...AdminPageProps },
  };
}

export default Admin;
