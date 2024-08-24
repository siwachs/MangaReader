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
        <label className="admin-form-label" htmlFor="description">
          Name
        </label>

        <input
          type="text"
          name="name"
          className="admin-form-input-type-text"
          required
          aria-required
        />
      </div>

      <div>
        <label className="admin-form-label" htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={8}
          className="admin-form-description"
          autoComplete="on"
          spellCheck
          aria-required
          required
        />
      </div>

      <div>
        <SubmitForm title="Add Genre" />
        {state.error && (
          <p className="admin-form-input-caption text-red-600">
            {state.errorMessage}
          </p>
        )}
      </div>
    </form>
  );
};

export default AddGenreForm;
