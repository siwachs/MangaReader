function getFormatedNestedDoc(userObject: Record<string, any>) {
  const newUserObject: Record<string, unknown> = {};

  for (const key in userObject) {
    const value = userObject[key];

    if (key === "_id") newUserObject.id = value.toString();
    else newUserObject[key] = value;
  }

  return newUserObject;
}

export default function formatMongooseDoc(
  docObject: Record<string, any>,
  docModelName?: "Comment",
) {
  const newObject: Record<string, unknown> = {};
  for (const key in docObject) {
    const value = docObject[key];
    if (key === "__v") continue;

    if (key === "_id") {
      newObject.id = value.toString();
    } else if (key === "user" || key === "genres") {
      newObject[key] = getFormatedNestedDoc(value);
    } else {
      newObject[key] = value;
    }
  }

  if (docModelName === "Comment" && newObject.isDeleted)
    newObject.message = undefined;
  return newObject;
}
