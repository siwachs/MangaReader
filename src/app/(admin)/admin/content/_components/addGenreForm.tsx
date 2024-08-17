"use client";

// useActionState is Latest method for fom Managment Currently available in Next 14.3.5
import { useRef } from "react";
import { useFormState } from "react-dom";

import { addGenre } from "@/actions/contentPageForm";
import SubmitForm from "@/components/buttons/submitForm";

import {
  formInputTypeTextClasses,
  formTitleClasses,
} from "@/constants/adminCMSFormStyles";

const AddGenreForm: React.FC = () => {
  const addGenreFormRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(addGenre, {
    error: false,
    errorMessage: undefined,
  });

  if (state?.resetForm) addGenreFormRef.current?.reset();

  return (
    <form
      ref={addGenreFormRef}
      action={action}
      className="flex flex-col gap-3.5"
    >
      <h3 className={formTitleClasses}>Add a new Genre</h3>

      <div>
        <input
          type="text"
          name="genre"
          className={
            state.error
              ? `${formInputTypeTextClasses} border-red-500`
              : formInputTypeTextClasses
          }
          required
          aria-required
        />

        {state.error && (
          <p className="mt-1 select-none text-[11px] text-red-500">
            {state.errorMessage}
          </p>
        )}
      </div>

      <SubmitForm title="Add Genre" />
    </form>
  );
};

export default AddGenreForm;
