"use client";

// useActionState is Latest method for fom Managment Currently available in Next 14.3.5
import { useRef, useEffect } from "react";
import { useFormState } from "react-dom";

import { addGenre } from "@/actions/contentPageForm";
import SubmitForm from "@/components/buttons/submitForm";

const AddGenreForm: React.FC = () => {
  const addGenreFormRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(addGenre, {
    error: false,
    errorMessage: undefined,
  });

  useEffect(() => {
    if (state?.resetForm) {
      addGenreFormRef.current?.reset();
    }
  }, [state?.resetForm]);

  return (
    <form
      ref={addGenreFormRef}
      action={action}
      className="flex flex-col gap-3.5"
    >
      <h3 className="admin-form-title">Add a new Genre</h3>

      <div>
        <input
          type="text"
          name="genre"
          className={
            state.error
              ? "admin-form-input-type-text border-red-600"
              : "admin-form-input-type-text"
          }
          required
          aria-required
        />

        {state.error && (
          <p className="admin-form-input-caption text-red-600">
            {state.errorMessage}
          </p>
        )}
      </div>

      <SubmitForm title="Add Genre" />
    </form>
  );
};

export default AddGenreForm;
