import { Types } from "mongoose";

function getFormattedObject(object: Record<string, any>): Record<string, any> {
  const newObject: Record<string, unknown> = {};

  for (const key in object) {
    const value = object[key];

    if (key === "_id") newObject.id = value.toString();
    else newObject[key] = value;
  }

  return newObject;
}

function convertItem(item: any) {
  if (Types.ObjectId.isValid(item)) {
    return item.toString();
  } else if (item && typeof item === "object" && "_id" in item) {
    return item._id.toString();
  }

  return item;
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
    } else if (key === "user") {
      newObject[key] = getFormattedObject(value);
    } else if (key === "genres") {
      newObject[key] = value.map(convertItem);
    } else {
      newObject[key] = value;
    }
  }

  if (docModelName === "Comment" && newObject.isDeleted)
    newObject.message = undefined;
  return newObject;
}
