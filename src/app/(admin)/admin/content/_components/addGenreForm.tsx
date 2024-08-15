"use client";

// useActionState is Latest method for fom Managment Currently available in Next 14.3.5
import { useRef } from "react";
import { useFormState } from "react-dom";

import { addGenre } from "@/actions/contentPageForm";
import SubmitForm from "@/components/buttons/submitForm";

import { formInputTypeTextClasses, formTitleClasses } from "../_tw/formStyles";

const AddGenreForm: React.FC = () => {
  const addGenreFormRef = useRef<HTMLFormElement>(null);
  const [addGenreState, addGenreAction] = useFormState(addGenre, {
    error: false,
    errorMessage: undefined,
  });

  if (!addGenreState.error) addGenreFormRef.current?.reset();

  return (
    <form
      ref={addGenreFormRef}
      action={addGenreAction}
      className="mb-6 flex flex-col gap-3.5"
    >
      <h3 className={formTitleClasses}>Add a new Genre</h3>

      <div>
        <input
          type="text"
          name="genre"
          className={
            addGenreState.error
              ? `${formInputTypeTextClasses} border-red-500`
              : formInputTypeTextClasses
          }
          required
          aria-required
        />

        {addGenreState.error && (
          <p className="mt-1 select-none text-[11px] text-red-500">
            {addGenreState.errorMessage}
          </p>
        )}
      </div>

      <SubmitForm text="Add Genre" />
    </form>
  );
};

export default AddGenreForm;
